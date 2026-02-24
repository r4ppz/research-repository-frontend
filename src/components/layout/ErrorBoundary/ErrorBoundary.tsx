import type { ReactNode } from "react";
import { type FallbackProps, ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";
import styles from "./ErrorBoundary.module.css";
import { Heading, Text } from "@/components/common/Content/Content";
import { Link } from "@/components/common/Link/Link";
import { extractApiError } from "@/util/errorHandler";

interface ErrorBoundaryProps {
  children: ReactNode;
}

function SimpleFallback({ error }: FallbackProps) {
  const errorTraceId = extractApiError(error).traceId;
  const githublink = "https://github.com/r4ppz/research-repository-frontend/issues";
  const ytLink = "https://youtu.be/K3V2_BxrT7c";

  return (
    <div className={styles.mainContainer} role="alert">
      <Heading className={styles.heading}>This isn't supposed to happened ( ` ᴖ ´ )</Heading>
      <Text>
        If you are reading this, I probably fucked up. Please report this on our{" "}
        <Link href={githublink}>GitHub</Link> repo by taking a screenshot of this page and
        optionally telling us what you were doing when the error happened. Then just restart the
        page to see if it’s usable again. <Link href={ytLink}>Sorry</Link>
      </Text>
      {errorTraceId && <code>trace ID: {errorTraceId}</code>}
    </div>
  );
}

export function ErrorBoundary({ children }: ErrorBoundaryProps) {
  return <ReactErrorBoundary FallbackComponent={SimpleFallback}>{children}</ReactErrorBoundary>;
}
