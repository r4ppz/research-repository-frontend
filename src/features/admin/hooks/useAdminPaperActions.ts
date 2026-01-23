import { useMutation, useQueryClient } from "@tanstack/react-query";
import { archivePaper, unarchivePaper } from "@/api/admin/papers";

export function useArchivePaper() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (paperId: number) => archivePaper(paperId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["adminPapers"] });
    },
  });
}

export function useUnarchivePaper() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (paperId: number) => unarchivePaper(paperId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["adminPapers"] });
    },
  });
}
