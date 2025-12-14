import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import schoolLogo from "@/assets/school-logo.svg";
import LoadingSpinner from "@/components/common/LoadingSpinner/LoadingSpinner";
import Modal from "@/components/common/Modal/Modal";
import { getErrorMessage } from "@/util/getError";
import style from "./LoginPage.module.css";
import { getUserApi, refreshApi } from "../api/auth";
import GoogleButton from "../components/GoogleButton/GoogleButton";
import { getAccessToken, removeAccessToken, setAccessToken } from "../context/tokenStore";
import { useAuth } from "../context/useAuth";

const LoginPage = () => {
  const navigate = useNavigate();
  const { user, setUser, login, authError, setAuthError } = useAuth();
  const [showErrorModal, setShowErrorModal] = useState(!!authError);
  const [isLoading, setIsLoading] = useState(true);
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || "";

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
          console.log("Access token received from refreshApi call");

          const userData = await getUserApi();
          console.log("User object received from getUserApi call");

          setUser(userData);
          void navigate("/", { replace: true });
        } catch (error) {
          const errorMessage = getErrorMessage(error);
          console.error("Error message: ", errorMessage);
          setAuthError(errorMessage);
          removeAccessToken();
          setShowErrorModal(true);
        }
      }
      setIsLoading(false);
    };

    if (isLoading) {
      void autoLogin();
    }
  }, [user, navigate, isLoading, setAuthError, setUser]);

  useEffect(() => {
    if (authError && !isLoading) {
      setShowErrorModal(true);
    }
  }, [authError, isLoading]);

  const handleGoogleSuccess = (authCode: string): void => {
    const performLogin = async (): Promise<void> => {
      setIsLoading(true);
      setAuthError(null);
      try {
        await login(authCode);
        void navigate("/", { replace: true });
      } catch (err: unknown) {
        const errorMessage: string = getErrorMessage(err);
        setAuthError(errorMessage);
        setShowErrorModal(true);
      } finally {
        setIsLoading(false);
      }
    };
    void performLogin();
  };

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
