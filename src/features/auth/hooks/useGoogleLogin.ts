import { useNavigate } from "react-router-dom";
import { extractApiError, getErrorMessage } from "@/util/getError";
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
        // Extract API error for better error handling
        const apiError = extractApiError(err);

        if (apiError) {
          // Handle specific error codes according to API contract
          if (apiError.code === "DOMAIN_NOT_ALLOWED") {
            setAuthError(
              "Your email domain is not authorized to access this application. Please use your official Assumption College of Davao email address.",
            );
          } else if (apiError.code === "INVALID_TOKEN") {
            setAuthError("Google authentication failed. Please try again.");
          } else {
            setAuthError(apiError.message);
          }
        } else {
          setAuthError(getErrorMessage(err));
        }

        setShowErrorModal(true);
      } finally {
        setIsLoading(false);
      }
    };
    void performLogin();
  };

  return handleGoogleSuccess;
}
