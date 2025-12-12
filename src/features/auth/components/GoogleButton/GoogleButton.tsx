import { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import Button from "@/components/common/Button/Button";
import { loadGoogleScript } from "@/util/googleAuth";
import styles from "./GoogleButton.module.css";

interface GoogleButtonProps {
  clientId: string;
  onSuccess: (code: string) => void;
  onError: () => void;
  disabled?: boolean;
}

export default function GoogleButton({ clientId, onSuccess, onError }: GoogleButtonProps) {
  const [initialized, setInitialized] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleClient, setGoogleClient] = useState<google.accounts.oauth2.CodeClient | null>(null);

  useEffect(() => {
    loadGoogleScript()
      .then(() => {
        const client = google.accounts.oauth2.initCodeClient({
          client_id: clientId,
          scope: "openid email profile",
          ux_mode: "popup",
          callback: (response) => {
            if (response.code) {
              onSuccess(response.code);
            } else {
              onError();
            }
            setLoading(false);
          },
        });

        setGoogleClient(client);
        setInitialized(true);
      })
      .catch(() => {
        onError();
      });
  }, [clientId, onSuccess, onError]);

  const handleClick = () => {
    if (!initialized || !googleClient) {
      console.log("Google OAuth client not initialized");
      return;
    }
    googleClient.requestCode();
  };

  return (
    <Button className={styles.googleButton} variant="secondary" onClick={handleClick}>
      <FcGoogle className={styles.googleIcon} />
      {loading ? "Signing in..." : "Sign In with Google"}
    </Button>
  );
}
