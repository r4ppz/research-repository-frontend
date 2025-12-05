import { ReactNode, useState, useEffect } from "react";
import { User } from "@/types";
import { AuthContext, AuthContextValue } from "./AuthContext";
import { setAccessToken } from "./tokenStore";
import { logout as logoutUser } from "../api/auth";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  const login = (accessToken: string, newUser: User) => {
    setAccessToken(accessToken);
    setUser(newUser);
  };

  const logout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      setAccessToken(null);
      setUser(null);
    }
  };

  const value: AuthContextValue = {
    user,
    login,
    logout,
    isLoading,
    setLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
