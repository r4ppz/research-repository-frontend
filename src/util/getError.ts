import axios, { AxiosError } from "axios";
import { ApiError, isApiError } from "@/types/api";

/**
 * Extracts API error from axios error response according to API contract
 */
export function extractApiError(err: unknown): ApiError | null {
  if (!axios.isAxiosError(err)) {
    return null;
  }

  const axiosError = err as AxiosError;
  const responseData = axiosError.response?.data;

  if (responseData && isApiError(responseData)) {
    return responseData;
  }

  return null;
}

/**
 * Gets a user-friendly error message from any error
 */
export function getErrorMessage(err: unknown): string {
  // Try to extract API error first
  const apiError = extractApiError(err);
  if (apiError) {
    return apiError.message;
  }

  // Fallback to generic error handling
  if (err instanceof Error) return err.message;
  if (typeof err === "string") return err;
  try {
    return JSON.stringify(err);
  } catch {
    return String(err);
  }
}

/**
 * Normalizes any error into a standard Error object
 * Preserves API error information if available
 */
export function normalizeError(err: unknown): Error {
  const apiError = extractApiError(err);

  if (apiError) {
    // Create error with API error code and message
    const error = new Error(apiError.message);
    error.name = apiError.code;
    // Attach the full API error for detailed handling
    (error as Error & { apiError?: ApiError }).apiError = apiError;
    return error;
  }

  return new Error(getErrorMessage(err));
}

/**
 * Type guard to check if error has API error attached
 */
export function hasApiError(error: Error): error is Error & { apiError: ApiError } {
  return "apiError" in error && isApiError((error as { apiError?: unknown }).apiError);
}
