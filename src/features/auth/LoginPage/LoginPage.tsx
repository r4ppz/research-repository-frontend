import { useEffect, useState } from "react";
import schoolLogo from "@/assets/school-logo.svg";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/common/Dialog/Dialog";
import { LoadingSpinner } from "@/components/common/LoadingSpinner/LoadingSpinner";
import { GoogleButton } from "@/features/auth/components/GoogleButton/GoogleButton";
import { useAuth } from "@/features/auth/context/useAuth";
import { useGoogleLogin } from "@/features/auth/hooks/useGoogleLogin";
import { ApiError } from "@/types";
import {
  getUserErrorMessage,
  isAuthorizationError,
  isBackendNotRunning,
} from "@/util/errorHandler";
import style from "./LoginPage.module.css";

export const LoginPage = () => {
  const { authError, setAuthError, isLoading } = useAuth();
  const [showErrorModal, setShowErrorModal] = useState(false);
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || "";

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

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      handleCloseModal();
    }
  };

  if (isLoading) {
    return (
      <div className={style.page}>
        <LoadingSpinner message="Signing in..." />
      </div>
    );
  }

  // Logic to determine modal content
  let modalTitle = "Login Error";
  let errorMessage = "An unexpected error occurred.";

  if (authError) {
    errorMessage = getUserErrorMessage(authError);

    if (isAuthorizationError(authError)) {
      modalTitle = "Access Denied";
    } else if (isBackendNotRunning(authError)) {
      modalTitle = "Service Unavailable";
    }
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

        <p className={style.textNotice}>Single Sign-On via Google Workspace</p>
      </div>

      <Dialog open={showErrorModal} onOpenChange={handleOpenChange}>
        <DialogContent className={style.errorModal}>
          <DialogTitle className={style.modalTitle}>{modalTitle}</DialogTitle>

          <div className={style.descriptionContainer}>
            <DialogDescription className={style.modalDescription}>{errorMessage}</DialogDescription>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
