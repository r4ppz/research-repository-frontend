import { ErrorBoundary, type FallbackProps } from "react-error-boundary";
import type { ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
}

function SimpleFallback(_: FallbackProps) {
  return (
    <div role="alert">
      <p>Something must have happened idk, restart the page.</p>
    </div>
  );
}

export function SimpleErrorBoundary({ children }: ErrorBoundaryProps) {
  return <ErrorBoundary FallbackComponent={SimpleFallback}>{children}</ErrorBoundary>;
}
