import { useMutation, useQueryClient } from "@tanstack/react-query";
import { acceptRequest, rejectRequest } from "@/api/admin/requests";
import { extractApiError, getUserErrorMessage } from "@/util/errorHandler";

//TODO: add ui error later

export function useAcceptRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: acceptRequest,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["adminRequests"] });
    },
    onError: (error: unknown) => {
      const apiError = extractApiError(error);
      console.error("Failed to accept request:", getUserErrorMessage(apiError));
    },
  });
}

export function useRejectRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: rejectRequest,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["adminRequests"] });
    },
    onError: (error: unknown) => {
      const apiError = extractApiError(error);
      console.error("Failed to reject request:", getUserErrorMessage(apiError));
    },
  });
}
