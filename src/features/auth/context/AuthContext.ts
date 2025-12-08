import { createContext } from "react";
import { User } from "@/types";

export interface AuthContextValue {
  user: User | null;
  setUser: (user: User | null) => void;
  login: (authCode: string) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);
