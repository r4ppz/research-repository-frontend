import axios, { AxiosError } from "axios";

import { ApiError, ErrorCode, hasApiErrorStructure, isApiError, TypedApiError } from "@/types/api";

/**
 * Extracts and normalizes API error from various error types
 * Conforms to the canonical error response structure from API contract
 */
export function extractApiError(error: unknown): TypedApiError | ApiError {
  if (isApiError(error)) {
    return error as TypedApiError;
  }

  // Handle Axios errors
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;

    if (axiosError.response?.data && hasApiErrorStructure(axiosError.response.data)) {
      const data = axiosError.response.data;
      return new ApiError(data.code as ErrorCode, data.message, data.details, data.traceId);
    }

    return new ApiError("INTERNAL_ERROR", axiosError.message || "An unexpected error occurred");
  }

  if (error instanceof Error) {
    return new ApiError("INTERNAL_ERROR", error.message || "An unexpected error occurred");
  }

  return new ApiError("INTERNAL_ERROR", "An unexpected error occurred");
}

/**
 * Type guard to check if error is an authentication error
 */
export function isAuthError(error: TypedApiError | ApiError): boolean {
  return error.code === "UNAUTHENTICATED" || error.code === "REFRESH_TOKEN_REVOKED";
}

/**
 * Type guard to check if error is an authorization error
 */
export function isAuthorizationError(error: TypedApiError): boolean {
  return error.code === "ACCESS_DENIED" || error.code === "DOMAIN_NOT_ALLOWED";
}

/**
 * Type guard to check if error is a validation error
 */
export function isValidationError(error: TypedApiError): boolean {
  return error.code === "VALIDATION_ERROR";
}

/**
 * Type guard to check if error is a resource not found error
 */
export function isNotFoundError(error: TypedApiError): boolean {
  return error.code === "RESOURCE_NOT_FOUND" || error.code === "RESOURCE_NOT_AVAILABLE";
}

/**
 * Get user-friendly error message for display
 */
export function getUserErrorMessage(error: TypedApiError | ApiError): string {
  return error.message;
}
