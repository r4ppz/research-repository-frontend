import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import schoolLogo from "@/assets/school-logo.svg";
import Modal from "@/components/common/Modal/Modal";
import { getErrorMessage, getErrorCode, ERROR_CODES } from "@/util/getError";
import style from "./LoginPage.module.css";
import GoogleButton from "../components/GoogleButton/GoogleButton";
import { useAuth } from "../context/useAuth";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || "";

  useEffect(() => {
    if (error) {
      setShowErrorModal(true);
    }
  }, [error]);

  const handleGoogleSuccess = (authCode: string): void => {
    const performLogin = async (): Promise<void> => {
      try {
        setError(null);
        await login(authCode);
        void navigate("/", { replace: true });
      } catch (err: unknown) {
        const errorCode = getErrorCode(err);
        let errorMessage = getErrorMessage(err);

        // Handle specific auth error codes according to API contract
        if (errorCode === ERROR_CODES.INVALID_TOKEN) {
          errorMessage = "Authentication failed. Please try again.";
        } else if (errorCode === ERROR_CODES.DOMAIN_NOT_ALLOWED) {
          errorMessage = "Email domain not allowed. Please use your official Assumption College of Davao email address.";
        }

        setError(errorMessage);
      }
    };
    void performLogin();
  };

  const handleGoogleError = () => {
    setError("Google authentication failed. Please try again.");
  };

  const handleCloseModal = () => {
    setShowErrorModal(false);
    setError(null);
  };

  return (
    <div className={style.page}>
      <div className={style.loginCard}>
        <img alt="school-logo" className={style.schoolLogo} src={schoolLogo} />

        <div className={style.headerContainer}>
          <h1 className={style.headerSchool}>Assumption College of Davao</h1>
          <h2 className={style.subHeaderTitle}>Research Repository Portal</h2>
        </div>

        <p className={style.textInstruction}>
          Please sign in using your official Assumption College of Davao email address.
        </p>

        <div className={style.googleButtonContainer}>
          <GoogleButton
            clientId={googleClientId}
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
          />
        </div>

        <p className={style.textNotice}>Single Sign-On via Google Workspace for Education</p>
      </div>

      <Modal className={style.errorModal} isOpen={showErrorModal} onClose={handleCloseModal}>
        <h2 className={style.modalTitle}>Login Error</h2>
        <div className={style.descriptionContainer}>
          <p className={style.modalDescription}>{error}</p>
        </div>
      </Modal>
    </div>
  );
};

export default LoginPage;
