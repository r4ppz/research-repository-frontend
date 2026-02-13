import { type ReactNode, useEffect, useState } from "react";
import { AuthContext, type AuthContextValue } from "./AuthContext";
import { getAccessToken, removeAccessToken, setAccessToken } from "./tokenStore";
import { postLoginGoogle, postLogout } from "@/api/auth";
import type { ApiError, AuthResponse, User } from "@/types";
import { extractApiError, getUserErrorMessage } from "@/util/errorHandler";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [authError, setAuthError] = useState<ApiError | null>(null);

  const login = async (authCode: string) => {
    setIsLoading(true);
    setAuthError(null);
    try {
      const data: AuthResponse = await postLoginGoogle(authCode);
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
    setIsLoading(true);
    try {
      await postLogout();
    } catch (error) {
      const apiError = extractApiError(error);
      const errorMessage = getUserErrorMessage(apiError);

      console.error("Logout failed:", errorMessage);
    } finally {
      removeAccessToken();
      setUser(null);
      setAuthError(null);
      setIsLoading(false);
    }
  };

  // Initialize auth state on app load
  // Initially check if there's no token to set appropriate loading state
  // If no token exists, authentication state is complete (as "not logged in")
  // If there is a token, isLoading remains true and AuthRestorer will handle it
  useEffect(() => {
    const token = getAccessToken();
    if (!token) {
      setIsLoading(false);
    }
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
