import { createContext } from "react";
import { ApiError, TypedApiError, User } from "@/types";

export interface AuthContextValue {
  user: User | null;
  setUser: (user: User | null) => void;
  login: (authCode: string) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  authError: TypedApiError | ApiError | null;
  setAuthError: (authError: TypedApiError | ApiError | null) => void;
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);
