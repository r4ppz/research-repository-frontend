import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { getPapers, GetPapersParams } from "@/api/paper";

export const usePapers = (params: GetPapersParams) => {
  const query = useQuery({
    queryKey: ["papers", params],
    queryFn: () => getPapers(params),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5,
  });

  return {
    papers: query.data?.content ?? [],
    loading: query.isLoading,
    error: query.isError ? "Failed to load papers" : null,
    pagination: query.data
      ? {
          totalElements: query.data.totalElements,
          totalPages: query.data.totalPages,
          currentPage: query.data.number,
          pageSize: query.data.size,
        }
      : null,
    refetch: query.refetch,
  };
};
