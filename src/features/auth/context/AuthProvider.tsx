import { ReactNode, useState, useEffect } from "react";
import { AuthResponse, User } from "@/types";
import { getErrorMessage } from "@/util/getError";
import { AuthContext, AuthContextValue } from "./AuthContext";
import { removeAccessToken, setAccessToken } from "./tokenStore";
import { loginApi, logoutApi } from "../api/auth";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [authError, setAuthError] = useState<string | null>(null);

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
      const errorMessage = getErrorMessage(error);
      console.error("Logout failed");
      console.error("Error message", errorMessage);
    } finally {
      removeAccessToken();
      setUser(null);
    }
  };

  useEffect(() => {
    setLoading(false);
  }, []);

  const value: AuthContextValue = {
    user,
    setUser,
    login,
    logout,
    isLoading,
    setLoading,
    authError,
    setAuthError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
