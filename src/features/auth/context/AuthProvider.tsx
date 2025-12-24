import { ReactNode, useState, useEffect } from "react";
import { AuthResponse, User, ApiError } from "@/types";
import { extractApiError, getUserErrorMessage } from "@/util/errorHandler";
import { AuthContext, AuthContextValue } from "./AuthContext";
import { removeAccessToken, setAccessToken } from "./tokenStore";
import { loginApi, logoutApi } from "../api/auth";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [authError, setAuthError] = useState<ApiError | null>(null);

  const login = async (authCode: string) => {
    setIsLoading(true);
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
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await logoutApi();
    } catch (error) {
      const apiError = extractApiError(error);
      const errorMessage = getUserErrorMessage(apiError);

      console.error("Logout failed:", errorMessage);
    } finally {
      removeAccessToken();
      setUser(null);
      setAuthError(null);
    }
  };

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const value: AuthContextValue = {
    user,
    setUser,
    login,
    logout,
    isLoading,
    setIsLoading,
    authError,
    setAuthError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
