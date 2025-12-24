import axios, { AxiosError } from "axios";
import { ApiError, isApiError } from "@/types/api";

/**
 * Extracts and normalizes API error from various error types
 * Conforms to the canonical error response structure from API contract
 */
export function extractApiError(error: unknown): ApiError {
  // If it's already a properly structured API error
  if (isApiError(error)) {
    return error;
  }

  // Handle Axios errors
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ApiError>;

    // If response data conforms to API error structure
    if (axiosError.response?.data && isApiError(axiosError.response.data)) {
      return axiosError.response.data;
    }

    // Fallback for Axios errors without proper error structure
    return {
      code: "INTERNAL_ERROR",
      message: axiosError.message || "An unexpected error occurred",
      traceId: undefined,
    };
  }

  // Handle standard Error objects
  if (error instanceof Error) {
    return {
      code: "INTERNAL_ERROR",
      message: error.message || "An unexpected error occurred",
      traceId: undefined,
    };
  }

  // Handle unknown error types
  return {
    code: "INTERNAL_ERROR",
    message: "An unexpected error occurred",
    traceId: undefined,
  };
}

/**
 * Type guard to check if error is an authentication error
 */
export function isAuthError(error: ApiError): boolean {
  return error.code === "UNAUTHENTICATED" || error.code === "REFRESH_TOKEN_REVOKED";
}

/**
 * Type guard to check if error is an authorization error
 */
export function isAuthorizationError(error: ApiError): boolean {
  return error.code === "ACCESS_DENIED" || error.code === "DOMAIN_NOT_ALLOWED";
}

/**
 * Type guard to check if error is a validation error
 */
export function isValidationError(error: ApiError): boolean {
  return error.code === "VALIDATION_ERROR";
}

/**
 * Type guard to check if error is a resource not found error
 */
export function isNotFoundError(error: ApiError): boolean {
  return error.code === "RESOURCE_NOT_FOUND" || error.code === "RESOURCE_NOT_AVAILABLE";
}

/**
 * Get user-friendly error message for display
 */
export function getUserErrorMessage(error: ApiError): string {
  // Use the message from the API error (always user-safe per contract)
  return error.message;
}
