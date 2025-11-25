import { ReactNode, useState, useCallback, useEffect } from "react";
import { User } from "@/types";
import { logout as logoutUser } from "../api/auth";
import { clearAccessToken, setAccessToken } from "../tokenStore";
import { AuthContext, AuthContextValue } from "./AuthContext";

const getUserFromStorage = (): User | null => {
  const userJson = localStorage.getItem("user");
  if (!userJson) return null;
  try {
    return JSON.parse(userJson) as User;
  } catch {
    localStorage.removeItem("user");
    return null;
  }
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(getUserFromStorage());
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // On initial load, we just check for the user in storage.
    // The interceptor will handle any required token refreshes.
    setLoading(false);
  }, []);

  const login = useCallback((newAccessToken: string, newUser: User) => {
    localStorage.setItem("user", JSON.stringify(newUser));
    setAccessToken(newAccessToken);
    setUser(newUser);
  }, []);

  const logout = useCallback(async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      localStorage.removeItem("user");
      clearAccessToken();
      setUser(null);
    }
  }, []);

  const value: AuthContextValue = {
    user,
    isLoading,
    login,
    logout,
    setLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
