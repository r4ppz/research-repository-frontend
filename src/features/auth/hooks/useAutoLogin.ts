import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getUser, postRefresh } from "@/api/auth";
import { extractApiError, isAuthError } from "@/util/errorHandler";
import { getAccessToken, removeAccessToken, setAccessToken } from "../context/tokenStore";
import { useAuth } from "../context/useAuth";

export function useAutoLogin(
  setIsLoading: (v: boolean) => void,
  setShowErrorModal: (v: boolean) => void,
) {
  const { user, setUser, setAuthError } = useAuth();
  const navigate = useNavigate();
  const hasAttemptedAutoLogin = useRef(false);

  useEffect(() => {
    // Only attempt auto-login once on mount
    if (hasAttemptedAutoLogin.current) {
      return;
    }

    const autoLogin = async () => {
      setIsLoading(true);
      setAuthError(null);

      const token = getAccessToken();
      if (token && !user) {
        try {
          const data = await postRefresh();
          removeAccessToken();
          setAccessToken(data.accessToken);

          const userData = await getUser();
          setUser(userData);
          setIsLoading(false);
          void navigate("/", { replace: true });
        } catch (error) {
          const apiError = extractApiError(error);
          removeAccessToken();

          if (isAuthError(apiError)) {
            setAuthError(null);
          } else {
            setAuthError(apiError);
            setShowErrorModal(true);
          }
        }
      }
      setIsLoading(false);
    };

    hasAttemptedAutoLogin.current = true;
    void autoLogin();
  }, [user, navigate, setAuthError, setUser, setIsLoading, setShowErrorModal]);
}
