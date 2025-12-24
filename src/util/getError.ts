import { isApiError } from "@/types/api";
import { extractApiError, getUserErrorMessage } from "./errorHandler";

/**
 * @deprecated Use extractApiError instead for API errors
 * Legacy function for backwards compatibility
 */
export function getErrorMessage(err: unknown): string {
  // Try to extract API error first
  if (isApiError(err)) {
    return getUserErrorMessage(err);
  }

  if (err instanceof Error) return err.message;
  if (typeof err === "string") return err;
  try {
    return JSON.stringify(err);
  } catch {
    return String(err);
  }
}

/**
 * @deprecated Use extractApiError instead
 * Legacy function for backwards compatibility
 */
export function normalizeError(err: unknown): Error {
  const apiError = extractApiError(err);
  const error = new Error(apiError.message);
  // Attach the full API error for downstream handling
  (error as Error & { apiError?: typeof apiError }).apiError = apiError;
  return error;
}
