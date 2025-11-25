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

export interface ApiError {
  error: string;
  code: string;
  details?: Array<{ field: string; message: string }>;
  traceId?: string;
}
