import { useEffect, useState } from "react";

import { getUserRequests } from "@/api/users";
import { DocumentRequest } from "@/types";
import { extractApiError, getUserErrorMessage } from "@/util/errorHandler";

interface UseUserRequestsReturn {
  requests: DocumentRequest[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useUserRequests = (): UseUserRequestsReturn => {
  const [requests, setRequests] = useState<DocumentRequest[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUserRequests = async (): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const result = await getUserRequests();
      setRequests(result.requests);
    } catch (err) {
      const apiError = extractApiError(err);
      setError(getUserErrorMessage(apiError));
      setRequests([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchUserRequests();
  }, []);

  return {
    requests,
    loading,
    error,
    refetch: () => {
      void fetchUserRequests();
    },
  };
};
