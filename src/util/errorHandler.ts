import { ApiError, ErrorCode } from "@/types/api";
import { extractApiError } from "./getError";

/**
 * Error handler result that tells the caller what action to take
 */
export interface ErrorHandlerResult {
  /**
   * The action to take based on the error
   */
  action:
    | "redirect_to_login" // Clear tokens and redirect to login
    | "show_access_denied" // Show 403 access denied page
    | "show_404" // Show 404 not found page
    | "show_archived_badge" // Show archived badge (not an error)
    | "show_validation_errors" // Show inline field errors
    | "show_toast_warning" // Show warning toast
    | "show_toast_info" // Show info toast
    | "show_toast_error" // Show error toast
    | "show_global_error" // Show global error UI with trace ID
    | "show_retry_ui" // Show retry UI with countdown
    | "show_upload_error" // Show upload error
    | "show_page_alert" // Show page-level alert
    | "none"; // No specific action needed

  /**
   * The error code from API
   */
  code?: ErrorCode;

  /**
   * User-friendly message to display
   */
  message: string;

  /**
   * Validation errors for form fields (VALIDATION_ERROR only)
   */
  validationErrors?: Array<{ field: string; message: string }>;

  /**
   * Trace ID for support (INTERNAL_ERROR, FILE_STORAGE_ERROR)
   */
  traceId?: string;

  /**
   * Retry information (RATE_LIMIT_EXCEEDED, SERVICE_UNAVAILABLE)
   */
  retryAfter?: number;

  /**
   * Whether the error is retryable
   */
  retryable?: boolean;
}

/**
 * Handles errors according to the API contract's frontend rendering rules
 */
export function handleError(err: unknown): ErrorHandlerResult {
  const apiError = extractApiError(err);

  if (!apiError) {
    // Not an API error - generic error handling
    const message = err instanceof Error ? err.message : "An unexpected error occurred";
    return {
      action: "show_toast_error",
      message,
    };
  }

  return handleApiError(apiError);
}

/**
 * Handles API errors according to their error code
 */
function handleApiError(error: ApiError): ErrorHandlerResult {
  const { code, message, details, traceId } = error;

  switch (code) {
    // Authentication Errors - redirect to login
    case "UNAUTHENTICATED":
    case "REFRESH_TOKEN_REVOKED":
      return {
        action: "redirect_to_login",
        code,
        message,
      };

    // Authorization Errors
    case "ACCESS_DENIED":
      return {
        action: "show_access_denied",
        code,
        message,
      };

    case "DOMAIN_NOT_ALLOWED":
      // Blocking error during login flow
      return {
        action: "show_page_alert",
        code,
        message,
      };

    // Resource Not Found
    case "RESOURCE_NOT_FOUND":
      return {
        action: "show_404",
        code,
        message,
      };

    case "RESOURCE_NOT_AVAILABLE":
      // Archived papers - show badge, not an error
      return {
        action: "show_archived_badge",
        code,
        message,
      };

    // Validation Errors
    case "VALIDATION_ERROR":
      return {
        action: "show_validation_errors",
        code,
        message,
        validationErrors: Array.isArray(details)
          ? details.map((d) => ({
              field: d.field,
              message: d.message,
            }))
          : [],
      };

    case "INVALID_REQUEST":
      return {
        action: "show_page_alert",
        code,
        message,
      };

    // Business Rule Violations
    case "DUPLICATE_REQUEST":
      return {
        action: "show_toast_warning",
        code,
        message,
      };

    case "REQUEST_ALREADY_FINAL":
      return {
        action: "show_toast_info",
        code,
        message,
      };

    // Upload Errors
    case "FILE_TOO_LARGE":
    case "UNSUPPORTED_MEDIA_TYPE":
      return {
        action: "show_upload_error",
        code,
        message,
      };

    // Rate Limiting
    case "RATE_LIMIT_EXCEEDED": {
      let retryAfter = 60;
      if (
        details &&
        typeof details === "object" &&
        !Array.isArray(details) &&
        "retryAfter" in details
      ) {
        retryAfter = Number(details.retryAfter);
      }
      return {
        action: "show_retry_ui",
        code,
        message: `Too many requests. Try again in ${String(retryAfter)} seconds.`,
        retryAfter,
        retryable: true,
      };
    }

    // System Errors
    case "INTERNAL_ERROR":
    case "FILE_STORAGE_ERROR":
      return {
        action: "show_global_error",
        code,
        message,
        traceId,
        retryable: false,
      };

    case "SERVICE_UNAVAILABLE": {
      let retryAfter = 30;
      if (
        details &&
        typeof details === "object" &&
        !Array.isArray(details) &&
        "retryAfter" in details
      ) {
        retryAfter = Number(details.retryAfter);
      }
      return {
        action: "show_retry_ui",
        code,
        message: "Service temporarily unavailable",
        retryAfter,
        retryable: true,
      };
    }

    // Auth token errors
    case "INVALID_TOKEN":
      return {
        action: "show_page_alert",
        code,
        message,
      };

    default:
      // Unrecognized error code - treat as generic error
      return {
        action: "show_toast_error",
        message,
        traceId,
      };
  }
}

/**
 * Check if error should trigger logout/redirect to login
 */
export function shouldRedirectToLogin(err: unknown): boolean {
  const apiError = extractApiError(err);
  if (!apiError) return false;

  return apiError.code === "UNAUTHENTICATED" || apiError.code === "REFRESH_TOKEN_REVOKED";
}

/**
 * Check if error is an authentication/authorization error
 */
export function isAuthError(err: unknown): boolean {
  const apiError = extractApiError(err);
  if (!apiError) return false;

  return (
    apiError.code === "UNAUTHENTICATED" ||
    apiError.code === "REFRESH_TOKEN_REVOKED" ||
    apiError.code === "ACCESS_DENIED" ||
    apiError.code === "DOMAIN_NOT_ALLOWED" ||
    apiError.code === "INVALID_TOKEN"
  );
}

/**
 * Check if error is a validation error
 */
export function isValidationError(err: unknown): boolean {
  const apiError = extractApiError(err);
  if (!apiError) return false;

  return apiError.code === "VALIDATION_ERROR";
}

/**
 * Extract validation errors from error
 */
export function getValidationErrors(
  err: unknown,
): Array<{ field: string; message: string }> | null {
  const apiError = extractApiError(err);
  if (!apiError || apiError.code !== "VALIDATION_ERROR") return null;

  if (Array.isArray(apiError.details)) {
    return apiError.details.map((d) => ({
      field: d.field,
      message: d.message,
    }));
  }

  return null;
}
