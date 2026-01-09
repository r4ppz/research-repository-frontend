import axios, { type AxiosError } from "axios";

import {
  ApiError,
  type ErrorCode,
  hasApiErrorStructure,
  isApiError,
  type TypedApiError,
} from "@/types/api";

/**
 * Extracts and normalizes API error from various error types
 * Conforms to the canonical error response structure from API contract
 */
export function extractApiError(error: unknown): TypedApiError | ApiError {
  // Direct match
  if (isApiError(error)) {
    return error as TypedApiError;
  }

  // Non-Axios Errors
  if (!axios.isAxiosError(error)) {
    const message = error instanceof Error ? error.message : "An unexpected error occurred";
    return new ApiError("INTERNAL_ERROR", message || "An unexpected error occurred");
  }

  // Handle Axios Errors (Flattened)
  const axiosError = error as AxiosError;

  // Check for Network/Offline issues
  if (!axiosError.response && isNetworkError(axiosError)) {
    return new ApiError("BACKEND_UNAVAILABLE", "Backend might not be running :0");
  }

  // Check for valid API response body
  const responseData = axiosError.response?.data;
  if (hasApiErrorStructure(responseData)) {
    return new ApiError(
      responseData.code as ErrorCode,
      responseData.message,
      responseData.details,
      responseData.traceId,
    );
  }

  // Fallback for generic Axios errors
  return new ApiError("INTERNAL_ERROR", axiosError.message || "An unexpected error occurred");
}

// Private helper function
function isNetworkError(error: AxiosError): boolean {
  const networkErrorCodes = new Set(["ECONNREFUSED", "ENOTFOUND", "ECONNABORTED", "ETIMEDOUT"]);
  const networkErrorMessages = ["Network Error", "Failed to fetch", "Load failed"];

  const code = error.code;
  const msg = error.message || "";

  return (
    (!!code && networkErrorCodes.has(code)) || networkErrorMessages.some((m) => msg.includes(m))
  );
}

export function isAuthError(error: TypedApiError | ApiError): boolean {
  return error.code === "UNAUTHENTICATED" || error.code === "REFRESH_TOKEN_REVOKED";
}

export function isAuthorizationError(error: TypedApiError | ApiError): boolean {
  return error.code === "ACCESS_DENIED" || error.code === "DOMAIN_NOT_ALLOWED";
}

export function isValidationError(error: TypedApiError): boolean {
  return error.code === "VALIDATION_ERROR";
}

export function isNotFoundError(error: TypedApiError): boolean {
  return error.code === "RESOURCE_NOT_FOUND" || error.code === "RESOURCE_NOT_AVAILABLE";
}

export function getUserErrorMessage(error: TypedApiError | ApiError): string {
  return error.message;
}

export function isBackendNotRunning(error: TypedApiError | ApiError): boolean {
  return error.code === "BACKEND_UNAVAILABLE";
}
