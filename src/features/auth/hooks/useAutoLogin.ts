import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { extractApiError, isAuthError } from "@/util/errorHandler";
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
          const apiError = extractApiError(error);
          
          // For auth errors, just clear token and don't show modal (expected flow)
          if (isAuthError(apiError)) {
            removeAccessToken();
            setAuthError(null); // Don't show error for expected auth failures
          } else {
            // For other errors, show the error modal
            setAuthError(apiError);
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
