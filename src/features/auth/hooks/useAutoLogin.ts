import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getErrorMessage } from "@/util/getError";
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
          setAuthError(getErrorMessage(error));
          removeAccessToken();
          setShowErrorModal(true);
        }
      }
      setIsLoading(false);
    };

    if (isLoading) {
      void autoLogin();
    }
  }, [user, navigate, isLoading, setAuthError, setUser, setIsLoading, setShowErrorModal]);
}
