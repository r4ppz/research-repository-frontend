import { useCallback, useState } from "react";
import { handleError, type ErrorHandlerResult } from "@/util/errorHandler";

/**
 * Hook for handling errors in components according to API contract
 * Provides state management and error handling utilities
 */
export function useErrorHandler() {
  const [error, setError] = useState<ErrorHandlerResult | null>(null);

  /**
   * Handle an error and get the result with recommended action
   */
  const handleApiError = useCallback((err: unknown): ErrorHandlerResult => {
    const result = handleError(err);
    setError(result);
    return result;
  }, []);

  /**
   * Clear the current error
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  /**
   * Check if there's an active error
   */
  const hasError = error !== null;

  return {
    error,
    handleApiError,
    clearError,
    hasError,
  };
}

/**
 * Simple hook to wrap async operations with error handling
 * @example
 * const { execute, loading, error } = useAsyncError(async () => {
 *   await someApiCall();
 * });
 */
export function useAsyncError<T>(asyncFn: () => Promise<T>): {
  execute: () => Promise<T | undefined>;
  loading: boolean;
  error: ErrorHandlerResult | null;
  clearError: () => void;
} {
  const [loading, setLoading] = useState(false);
  const { error, handleApiError, clearError } = useErrorHandler();

  const execute = useCallback(async (): Promise<T | undefined> => {
    try {
      setLoading(true);
      const result = await asyncFn();
      clearError();
      return result;
    } catch (err) {
      handleApiError(err);
      return undefined;
    } finally {
      setLoading(false);
    }
  }, [asyncFn, handleApiError, clearError]);

  return { execute, loading, error, clearError };
}
