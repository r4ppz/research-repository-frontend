import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { extractApiError, getErrorMessage } from "@/util/getError";
import { getUserApi, refreshApi } from "../api/auth";
import { getAccessToken, removeAccessToken, setAccessToken } from "../context/tokenStore";
import { useAuth } from "../context/useAuth";

export function useAutoLogin(
  isLoading: boolean,
  setIsLoading: (v: boolean) => void,
  setShowErrorModal: (v: boolean) => void,
) {
  const { user, setUser, setAuthError } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const autoLogin = async () => {
      setIsLoading(true);
      setAuthError(null);

      const token = getAccessToken();
      if (token && !user) {
        try {
          const data = await refreshApi();
          removeAccessToken();
          setAccessToken(data.accessToken);

          const userData = await getUserApi();
          setUser(userData);
          void navigate("/", { replace: true });
        } catch (error) {
          // Extract API error for better handling
          const apiError = extractApiError(error);

          // For auth errors, just clear tokens and don't show modal
          // The user will see the login page
          if (apiError?.code === "REFRESH_TOKEN_REVOKED" || apiError?.code === "UNAUTHENTICATED") {
            removeAccessToken();
            // Don't show error modal for expected auth failures
            setAuthError(null);
          } else {
            // For other errors, show the error
            setAuthError(getErrorMessage(error));
            removeAccessToken();
            setShowErrorModal(true);
          }
        }
      }
      setIsLoading(false);
    };

    if (isLoading) {
      void autoLogin();
    }
  }, [user, navigate, isLoading, setAuthError, setUser, setIsLoading, setShowErrorModal]);
}
