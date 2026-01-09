import { useEffect } from "react";
import { postRefresh } from "@/api/auth";
import { getCurrentUser } from "@/api/users";
import {
  getAccessToken,
  removeAccessToken,
  setAccessToken,
} from "@/features/auth/context/tokenStore";
import { useAuth } from "@/features/auth/context/useAuth";
import { extractApiError, isAuthError } from "@/util/errorHandler";

const AuthRestorer = () => {
  const { user, setUser, setAuthError, setIsLoading } = useAuth();

  useEffect(() => {
    const restoreAuth = async () => {
      const token = getAccessToken();

      if (user || !token) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);

        // Refresh session
        const data = await postRefresh();
        removeAccessToken();
        setAccessToken(data.accessToken);

        // Fetch profile
        const userData = await getCurrentUser();
        setUser(userData);
        setAuthError(null);
      } catch (error) {
        const apiError = extractApiError(error);

        // Handle invalid credentials
        if (isAuthError(apiError)) {
          removeAccessToken();
          setAuthError(null);
        } else {
          setAuthError(apiError);
        }
      } finally {
        setIsLoading(false);
      }
    };

    void restoreAuth();
  }, [user, setUser, setAuthError, setIsLoading]);

  return null;
};
export default AuthRestorer;
