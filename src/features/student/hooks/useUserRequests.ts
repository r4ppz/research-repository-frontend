import { useQuery } from "@tanstack/react-query";
import { getUserRequests } from "@/api/users";
import type { DocumentRequest } from "@/types";
import { extractApiError } from "@/util/errorHandler";

interface UseUserRequestsReturn {
  requests: DocumentRequest[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useUserRequests = (): UseUserRequestsReturn => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["userRequests"],
    queryFn: async () => {
      try {
        const result = await getUserRequests();
        return result.requests;
      } catch (err) {
        const apiError = extractApiError(err);
        throw apiError;
      }
    },
    initialData: [],
  });

  return {
    requests: data,
    loading: isLoading,
    error: error instanceof Error ? error.message : null,
    refetch: () => void refetch(),
  };
};
