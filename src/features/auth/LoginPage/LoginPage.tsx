import { useEffect, useState } from "react";

import schoolLogo from "@/assets/school-logo.svg";
import LoadingSpinner from "@/components/common/LoadingSpinner/LoadingSpinner";
import Modal from "@/components/common/Modal/Modal";
import GoogleButton from "@/features/auth/components/GoogleButton/GoogleButton";
import { useAuth } from "@/features/auth/context/useAuth";
import { useGoogleLogin } from "@/features/auth/hooks/useGoogleLogin";
import { ApiError } from "@/types";
import { getUserErrorMessage } from "@/util/errorHandler";

import style from "./LoginPage.module.css";

const LoginPage = () => {
  const { authError, setAuthError, isLoading } = useAuth();
  const [showErrorModal, setShowErrorModal] = useState(false);
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || "";

  // To show modal
  useEffect(() => {
    if (authError && !isLoading) {
      setShowErrorModal(true);
    }
  }, [authError, isLoading]);

  const handleGoogleSuccess = useGoogleLogin(setShowErrorModal);

  const handleGoogleError = () => {
    setAuthError(new ApiError("INTERNAL_ERROR", "Google authentication failed. Please try again."));
    setShowErrorModal(true);
  };

  const handleCloseModal = () => {
    setShowErrorModal(false);
    setAuthError(null);
  };

  if (isLoading) {
    return (
      <div className={style.page}>
        <LoadingSpinner message="Signing in..." />
      </div>
    );
  }

  const errorMessage = authError && getUserErrorMessage(authError);
  const modalTitle = authError?.code === "DOMAIN_NOT_ALLOWED" ? "Access Denied" : "Login Error";

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
        <h2 className={style.modalTitle}>{modalTitle}</h2>
        <div className={style.descriptionContainer}>
          <p className={style.modalDescription}>{errorMessage}</p>
        </div>
      </Modal>
    </div>
  );
};

export default LoginPage;
