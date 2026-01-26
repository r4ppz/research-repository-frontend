import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getMyPaperRequest } from "@/api/paper";
import { createRequest } from "@/api/request";
import { User } from "@/types/user";
import { isUserAdmin } from "@/util/roleBasedAccess";

export function usePaperRequest(paperId: number | null, user: User | null) {
  const queryClient = useQueryClient();

  const { data: requestExists, isLoading: isCheckingRequest } = useQuery({
    queryKey: ["myPaperRequest", paperId],
    queryFn: async () => {
      if (!paperId) return false;

      try {
        await getMyPaperRequest(paperId);
        return true;
      } catch {
        return false;
      }
    },
    enabled: !isUserAdmin(user) && paperId !== null,
  });

  const mutation = useMutation({
    mutationFn: createRequest,
    onSuccess: () => {
      queryClient.setQueryData(["myPaperRequest", paperId], true);
    },
  });

  const requestDocument = () => {
    if (isUserAdmin(user) || requestExists || mutation.isPending || !paperId) {
      return;
    }
    mutation.mutate({ paperId });
  };

  const isRequestLoading = mutation.isPending || isCheckingRequest;

  return {
    requestExists: requestExists ?? false,
    isRequestLoading,
    requestDocument,
  };
}
