import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import schoolLogo from "@/assets/school-logo.svg";
import Modal from "@/components/common/Modal/Modal";
import { AuthResponse } from "@/types";
import getError from "@/util/getError";
import style from "./LoginPage.module.css";
import { loginWithGoogle } from "../api/auth";
import GoogleButton from "../components/GoogleButton/GoogleButton";
import { useAuth } from "../context/useAuth";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, isLoading, setLoading } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || "";

  useEffect(() => {
    if (error) {
      setShowErrorModal(true);
    }
  }, [error]);

  const handleGoogleSuccess = (code: string) => {
    const handleGoogleLogin = async (code: string) => {
      try {
        setLoading(true);
        setError(null);
        const data: AuthResponse = await loginWithGoogle(code);
        login(data.accessToken, data.user);
        void navigate("/", { replace: true });
      } catch (err) {
        const errorMessage: string = getError(err);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };
    void handleGoogleLogin(code);
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
            disabled={isLoading}
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
