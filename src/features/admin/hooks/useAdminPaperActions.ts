import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  archivePaper,
  createPaper,
  type CreatePaperMetadata,
  deletePaper,
  unarchivePaper,
} from "@/api/admin/papers";
import { extractApiError, getUserErrorMessage } from "@/util/errorHandler";

// UI error later, im thinking modal? idk

export function useCreatePaper() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ metadata, file }: { metadata: CreatePaperMetadata; file: File }) =>
      createPaper(metadata, file),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["adminPapers"] });
    },
    onError: (error: unknown) => {
      const apiError = extractApiError(error);
      console.error("Failed to create paper:", getUserErrorMessage(apiError));
    },
  });
}

export function useDeletePaper() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (paperId: number) => deletePaper(paperId),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["adminPapers"] });
    },
    onError: (error: unknown) => {
      const apiError = extractApiError(error);
      console.error("Failed to delete paper:", getUserErrorMessage(apiError));
    },
  });
}

export function useArchivePaper() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (paperId: number) => archivePaper(paperId),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["adminPapers"] });
    },
    onError: (error: unknown) => {
      const apiError = extractApiError(error);
      console.error("Failed to archive paper:", getUserErrorMessage(apiError));
    },
  });
}

export function useUnarchivePaper() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (paperId: number) => unarchivePaper(paperId),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["adminPapers"] });
    },
    onError: (error: unknown) => {
      const apiError = extractApiError(error);
      console.error("Failed to unarchive paper:", getUserErrorMessage(apiError));
    },
  });
}
