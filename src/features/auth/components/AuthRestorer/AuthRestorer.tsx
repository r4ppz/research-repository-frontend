import { useEffect } from "react";
import { postRefresh } from "@/api/auth";
import { getCurrentUser } from "@/api/users";
import {
  getAccessToken,
  removeAccessToken,
  setAccessToken,
} from "@/features/auth/context/tokenStore";
import { useAuth } from "@/features/auth/context/useAuth";
import { extractApiError, isAuthError, isBackendNotRunning } from "@/util/errorHandler";

const AuthRestorer = () => {
  const { user, setUser, setAuthError, setIsLoading } = useAuth();

  useEffect(() => {
    const restoreAuth = async () => {
      // If user is already set, no need to restore
      if (user) {
        setIsLoading(false);
        return;
      }

      const token = getAccessToken();
      if (token) {
        try {
          setIsLoading(true);
          const data = await postRefresh();
          // Update the access token in storage with the new one
          removeAccessToken();
          setAccessToken(data.accessToken);

          const userData = await getCurrentUser();
          setUser(userData);
        } catch (error) {
          const apiError = extractApiError(error);

          if (isAuthError(apiError)) {
            // Clear the invalid token
            removeAccessToken();
            setAuthError(null);
          } else if (isBackendNotRunning(apiError)) {
            setAuthError(apiError);
          } else {
            setAuthError(apiError);
          }
        } finally {
          setIsLoading(false);
        }
      } else {
        // No token exists, so authentication is complete (as "not logged in")
        setIsLoading(false);
      }
    };

    void restoreAuth();
  }, [user, setUser, setAuthError, setIsLoading]);

  return null;
};

export default AuthRestorer;
