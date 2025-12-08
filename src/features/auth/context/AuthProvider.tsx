import { ReactNode, useState, useEffect } from "react";
import { AuthResponse, User } from "@/types";
import { AuthContext, AuthContextValue } from "./AuthContext";
import { removeAccessToken, setAccessToken } from "./tokenStore";
import { loginApi, logoutApi } from "../api/auth";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  const login = async (authCode: string) => {
    setLoading(true);
    const data: AuthResponse = await loginApi(authCode);
    setAccessToken(data.accessToken);
    setUser(data.user);
    setLoading(false);
  };

  const logout = async () => {
    try {
      await logoutApi();
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      removeAccessToken();
      setUser(null);
    }
  };

  const value: AuthContextValue = {
    user,
    setUser,
    login,
    logout,
    isLoading,
    setLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
