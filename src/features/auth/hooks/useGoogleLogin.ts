import { useNavigate } from "react-router-dom";
import { extractApiError, getUserErrorMessage } from "@/util/errorHandler";
import { useAuth } from "../context/useAuth";

export function useGoogleLogin(
  setIsLoading: (v: boolean) => void,
  setShowErrorModal: (v: boolean) => void,
) {
  const { login, setAuthError } = useAuth();
  const navigate = useNavigate();

  const handleGoogleSuccess = (authCode: string) => {
    const performLogin = async () => {
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
    void performLogin();
  };

  return handleGoogleSuccess;
}
