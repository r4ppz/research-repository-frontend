import type { ReactNode } from "react";
import { ErrorBoundary, type FallbackProps } from "react-error-boundary";
import { extractApiError } from "@/util/errorHandler";

interface ErrorBoundaryProps {
  children: ReactNode;
}

function SimpleFallback({ error }: FallbackProps) {
  const traceId = extractApiError(error).traceId;

  return (
    <div role="alert">
      <h1>This is an error boundary page.</h1>
      <p>
        If you are seeing this, something went wrong (like a critical error). Please report this on
        our GitHub repo by taking a screenshot of this page and optionally telling us what you were
        doing when the error happened. Then just restart the page to see if it’s usable again.
        Thanks :)
      </p>
      <p>Make sure the code below is visible in your screenshot.</p>
      <p>Error code: {traceId}</p>
    </div>
  );
}

export function SimpleErrorBoundary({ children }: ErrorBoundaryProps) {
  return <ErrorBoundary FallbackComponent={SimpleFallback}>{children}</ErrorBoundary>;
}
