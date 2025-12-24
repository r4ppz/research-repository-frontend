import { useEffect, useState } from "react";

/**
 * Custom hook to simulate a loading delay for demo purposes.
 * @param delayMs - The delay in milliseconds (default: 500)
 * @returns boolean indicating if loading is still in progress
 */
export const useLoadingDelay = (delayMs: number = 500): boolean => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, delayMs);

    return () => {
      clearTimeout(timer);
    };
  }, [delayMs]);

  return isLoading;
};
