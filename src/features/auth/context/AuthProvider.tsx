import { ReactNode, useState, useEffect } from "react";
import { AuthResponse, User, ApiError } from "@/types";
import { extractApiError, getUserErrorMessage } from "@/util/errorHandler";
import { AuthContext, AuthContextValue } from "./AuthContext";
import { removeAccessToken, setAccessToken } from "./tokenStore";
import { loginApi, logoutApi } from "../api/auth";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [authError, setAuthError] = useState<ApiError | null>(null);

  const login = async (authCode: string) => {
    setLoading(true);
    setAuthError(null);
    try {
      const data: AuthResponse = await loginApi(authCode);
      setAccessToken(data.accessToken);
      setUser(data.user);
    } catch (error) {
      const apiError = extractApiError(error);
      setAuthError(apiError);
      throw apiError;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await logoutApi();
    } catch (error) {
      const apiError = extractApiError(error);
      const errorMessage = getUserErrorMessage(apiError);
      console.error("Logout failed:", errorMessage);
      // Don't set authError for logout failures, just log them
    } finally {
      removeAccessToken();
      setUser(null);
      setAuthError(null);
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
