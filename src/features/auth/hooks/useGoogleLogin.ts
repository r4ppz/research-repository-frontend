import { useNavigate } from "react-router-dom";

import { extractApiError } from "@/util/errorHandler";

import { useAuth } from "../context/useAuth";

export function useGoogleLogin(setShowErrorModal: (v: boolean) => void) {
  const { login, setAuthError, setIsLoading } = useAuth();
  const navigate = useNavigate();

  const performLogin = async (authCode: string) => {
    setIsLoading(true);
    setAuthError(null);
    try {
      await login(authCode);
      void navigate("/", { replace: true });
    } catch (err: unknown) {
      const apiError = extractApiError(err);
      setAuthError(apiError);
      setShowErrorModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSuccess = (authCode: string) => {
    void performLogin(authCode);
  };

  return handleGoogleSuccess;
}
