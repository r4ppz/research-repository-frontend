import "@/styles/variables.css";
import "@/styles/global.css";
import "@/styles/reset.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { App } from "./App";
import { ErrorBoundary } from "./components/layout/ErrorBoundary/ErrorBoundary";
import { AuthProvider } from "@/features/auth/context/AuthProvider";

// Add the TypeScript declaration at the top level
declare global {
  interface Window {
    __TANSTACK_QUERY_CLIENT__: QueryClient;
  }
}

const queryClient = new QueryClient();

// Expose the client to the extension (only in development)
if (import.meta.env.DEV) {
  window.__TANSTACK_QUERY_CLIENT__ = queryClient;
}

const container = document.getElementById("root");
if (container) {
  createRoot(container).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <HashRouter>
          <AuthProvider>
            <ErrorBoundary>
              <App />
            </ErrorBoundary>
          </AuthProvider>
        </HashRouter>
      </QueryClientProvider>
    </StrictMode>,
  );
}
