import { useNavigate } from "react-router-dom";
import { extractApiError } from "@/util/errorHandler";
import { useAuth } from "../context/useAuth";

export function useGoogleLogin(setShowErrorModal: (v: boolean) => void) {
  const { login, setAuthError, setIsLoading: setAuthIsLoading } = useAuth();
  const navigate = useNavigate();

  const performLogin = async (authCode: string) => {
    setAuthIsLoading(true);
    setAuthError(null);
    try {
      await login(authCode);
      void navigate("/", { replace: true });
    } catch (err: unknown) {
      const apiError = extractApiError(err);
      setAuthError(apiError);
      setShowErrorModal(true);
    } finally {
      setAuthIsLoading(false);
    }
  };

  const handleGoogleSuccess = (authCode: string) => {
    void performLogin(authCode);
  };

  return handleGoogleSuccess;
}
