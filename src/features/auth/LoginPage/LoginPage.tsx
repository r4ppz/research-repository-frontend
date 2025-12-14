import { useState, useEffect } from "react";
import schoolLogo from "@/assets/school-logo.svg";
import LoadingSpinner from "@/components/common/LoadingSpinner/LoadingSpinner";
import Modal from "@/components/common/Modal/Modal";
import style from "./LoginPage.module.css";
import GoogleButton from "../components/GoogleButton/GoogleButton";
import { useAuth } from "../context/useAuth";
import { useAutoLogin } from "../hooks/useAutoLogin";
import { useGoogleLogin } from "../hooks/useGoogleLogin";

const LoginPage = () => {
  const { authError, setAuthError } = useAuth();
  const [showErrorModal, setShowErrorModal] = useState(!!authError);
  const [isLoading, setIsLoading] = useState(true);
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || "";

  useAutoLogin(isLoading, setIsLoading, setShowErrorModal);

  // To show modal
  useEffect(() => {
    if (authError && !isLoading) {
      setShowErrorModal(true);
    }
  }, [authError, isLoading]);

  const handleGoogleSuccess = useGoogleLogin(setIsLoading, setShowErrorModal);

  const handleGoogleError = () => {
    setAuthError("Google authentication failed. Please try again.");
    setShowErrorModal(true);
  };

  const handleCloseModal = () => {
    setShowErrorModal(false);
    setAuthError(null);
  };

  if (isLoading && !authError) {
    return (
      <div className={style.page}>
        <LoadingSpinner message="Auto-signing in..." />
      </div>
    );
  }

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
          <p className={style.modalDescription}>{authError}</p>
        </div>
      </Modal>
    </div>
  );
};

export default LoginPage;
