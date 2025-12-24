import { type User } from "./user";

export interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number; // current page (0-based)
  size: number; // page size
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}

export interface ApiErrorDetail {
  field: string;
  message: string;
}

export interface ApiError {
  code: string; // Will be narrowed to specific codes
  message: string;
  details?: ApiErrorDetail[] | Record<string, unknown>; // Array for VALIDATION_ERROR, object for others like RATE_LIMIT_EXCEEDED
  traceId?: string;
}

// Error Code Registry
export type ErrorCode =
  | "VALIDATION_ERROR"
  | "INVALID_REQUEST"
  | "UNAUTHENTICATED"
  | "REFRESH_TOKEN_REVOKED"
  | "ACCESS_DENIED"
  | "DOMAIN_NOT_ALLOWED"
  | "RESOURCE_NOT_FOUND"
  | "RESOURCE_NOT_AVAILABLE"
  | "DUPLICATE_REQUEST"
  | "REQUEST_ALREADY_FINAL"
  | "FILE_TOO_LARGE"
  | "UNSUPPORTED_MEDIA_TYPE"
  | "RATE_LIMIT_EXCEEDED"
  | "INTERNAL_ERROR"
  | "FILE_STORAGE_ERROR"
  | "SERVICE_UNAVAILABLE"
  | "INVALID_TOKEN";

// Narrowed error type with discriminated union
export interface TypedApiError extends ApiError {
  code: ErrorCode;
}

// Type guard to check if error conforms to API contract
export function isApiError(error: unknown): error is ApiError {
  if (typeof error !== "object" || error === null) return false;

  const err = error as Record<string, unknown>;
  return (
    typeof err.code === "string" &&
    typeof err.message === "string" &&
    (err.details === undefined || Array.isArray(err.details) || typeof err.details === "object") &&
    (err.traceId === undefined || typeof err.traceId === "string")
  );
}
