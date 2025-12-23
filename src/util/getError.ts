import axios from "axios";
import { ApiError } from "@/types/api";

/**
 * Error codes from the API contract
 */
export const ERROR_CODES = {
  // Authentication errors
  INVALID_TOKEN: "INVALID_TOKEN",
  DOMAIN_NOT_ALLOWED: "DOMAIN_NOT_ALLOWED",
  UNAUTHENTICATED: "UNAUTHENTICATED",
  REFRESH_TOKEN_REVOKED: "REFRESH_TOKEN_REVOKED",
  
  // Authorization errors
  ACCESS_DENIED: "ACCESS_DENIED",
  
  // Resource errors
  RESOURCE_NOT_FOUND: "RESOURCE_NOT_FOUND",
  RESOURCE_NOT_AVAILABLE: "RESOURCE_NOT_AVAILABLE",
  
  // Validation errors
  VALIDATION_ERROR: "VALIDATION_ERROR",
  INVALID_REQUEST: "INVALID_REQUEST",
  
  // Business rule violations
  DUPLICATE_REQUEST: "DUPLICATE_REQUEST",
  REQUEST_ALREADY_FINAL: "REQUEST_ALREADY_FINAL",
  
  // File errors
  FILE_TOO_LARGE: "FILE_TOO_LARGE",
  UNSUPPORTED_MEDIA_TYPE: "UNSUPPORTED_MEDIA_TYPE",
  FILE_STORAGE_ERROR: "FILE_STORAGE_ERROR",
  
  // System errors
  INTERNAL_ERROR: "INTERNAL_ERROR",
  SERVICE_UNAVAILABLE: "SERVICE_UNAVAILABLE",
  RATE_LIMIT_EXCEEDED: "RATE_LIMIT_EXCEEDED",
} as const;

export type ErrorCode = (typeof ERROR_CODES)[keyof typeof ERROR_CODES];

/**
 * Parse API error from axios error response
 */
export function parseApiError(err: unknown): ApiError | null {
  if (axios.isAxiosError(err) && err.response?.data) {
    const data = err.response.data;
    if (typeof data === "object" && data !== null && "code" in data && "message" in data) {
      return data as ApiError;
    }
  }
  return null;
}

/**
 * Get error message from various error types
 */
export function getErrorMessage(err: unknown): string {
  const apiError = parseApiError(err);
  if (apiError) {
    return apiError.message;
  }
  
  if (err instanceof Error) {
    return err.message;
  }
  
  if (typeof err === "string") {
    return err;
  }
  
  try {
    return JSON.stringify(err);
  } catch {
    return String(err);
  }
}

/**
 * Get error code from API error
 */
export function getErrorCode(err: unknown): string | null {
  const apiError = parseApiError(err);
  return apiError?.code ?? null;
}

/**
 * Check if error is a specific error code
 */
export function isErrorCode(err: unknown, code: ErrorCode): boolean {
  return getErrorCode(err) === code;
}

/**
 * Check if error is an authentication error
 */
export function isAuthError(err: unknown): boolean {
  const code = getErrorCode(err);
  return code === ERROR_CODES.UNAUTHENTICATED || code === ERROR_CODES.REFRESH_TOKEN_REVOKED;
}

/**
 * Normalize error to Error object with proper message
 */
export function normalizeError(err: unknown): Error {
  const message = getErrorMessage(err);
  const error = new Error(message);
  
  // Preserve API error information if available
  const apiError = parseApiError(err);
  if (apiError) {
    (error as Error & { apiError?: ApiError }).apiError = apiError;
  }
  
  return error;
}
