/**
 * @deprecated This function is deprecated. Consider using normalizeError for consistent error handling.
 */
export const getError = (err: unknown): string => {
  return getErrorMessage(err);
};

export function getErrorMessage(err: unknown): string {
  if (err instanceof Error) return err.message;
  if (typeof err === "string") return err;
  try {
    return JSON.stringify(err);
  } catch {
    return String(err);
  }
}

export function normalizeError(err: unknown): Error {
  return new Error(getErrorMessage(err));
}
