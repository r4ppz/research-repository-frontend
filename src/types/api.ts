import type { User } from "./user";

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

export class ApiError extends Error {
  code: string; // Will be narrowed to specific codes
  details?: ApiErrorDetail[] | Record<string, unknown>;
  traceId?: string;

  constructor(
    code: string,
    message: string,
    details?: ApiErrorDetail[] | Record<string, unknown>,
    traceId?: string,
  ) {
    super(message);
    this.name = "ApiError";
    this.code = code;
    this.details = details;
    this.traceId = traceId;
  }
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
  | "INVALID_TOKEN"
  | "BACKEND_UNAVAILABLE";

// Narrowed error type with discriminated union
export interface TypedApiError extends ApiError {
  code: ErrorCode;
}

// Type guard to check if error is an ApiError instance
export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError;
}

// Type guard to check if an object has API error structure (for parsing responses)
export function hasApiErrorStructure(obj: unknown): obj is {
  code: string;
  message: string;
  details?: ApiErrorDetail[] | Record<string, unknown>;
  traceId?: string;
} {
  if (typeof obj !== "object" || obj === null) {
    return false;
  }

  const err = obj as Record<string, unknown>;
  return (
    typeof err.code === "string" &&
    typeof err.message === "string" &&
    (err.details === undefined || Array.isArray(err.details) || typeof err.details === "object") &&
    (err.traceId === undefined || typeof err.traceId === "string")
  );
}
