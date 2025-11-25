import { createContext } from "react";
import { User } from "@/types";

export interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  login: (accessToken: string, user: User) => void;
  logout: () => Promise<void>;
  setLoading: (loading: boolean) => void;
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);
