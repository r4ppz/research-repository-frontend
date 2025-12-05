import "@/styles/variables.css";
import "@/styles/global.css";
import "@/styles/reset.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "@/features/auth/context/AuthProvider";
import App from "./App";

const basename = import.meta.env.DEV ? "/" : "/research-repository/";

const container = document.getElementById("root");
if (container) {
  createRoot(container).render(
    <StrictMode>
      <BrowserRouter basename={basename}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </StrictMode>,
  );
}
