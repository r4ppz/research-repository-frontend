import { useCallback, useEffect, useState } from "react";
import { type ResearchPaper } from "@/types";
import { extractApiError, getUserErrorMessage } from "@/util/errorHandler";
import { getPapers, type GetPapersParams } from "../../api/paper";

interface UsePapersParams {
  search?: string;
  departmentIds?: number[];
  year?: number | null;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  page?: number;
  size?: number;
  archived?: boolean;
}

interface UsePapersReturn {
  papers: ResearchPaper[];
  loading: boolean;
  error: string | null;
  pagination: {
    totalElements: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
  } | null;
  refetch: () => Promise<void>;
}

export const usePapers = (params: UsePapersParams = {}): UsePapersReturn => {
  const [papers, setPapers] = useState<ResearchPaper[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<UsePapersReturn["pagination"]>(null);

  const fetchPapers = useCallback(async (): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const apiParams: GetPapersParams = {
        search: params.search || undefined,
        departmentId: params.departmentIds?.length ? params.departmentIds.join(",") : undefined,
        year: params.year || undefined,
        sortBy: params.sortBy,
        sortOrder: params.sortOrder,
        page: params.page || 0,
        size: params.size || 20,
        archived: params.archived,
      };

      const result = await getPapers(apiParams);

      setPapers(result.content);
      setPagination({
        totalElements: result.totalElements,
        totalPages: result.totalPages,
        currentPage: result.number,
        pageSize: result.size,
      });
    } catch (err) {
      const apiError = extractApiError(err);
      setError(getUserErrorMessage(apiError));
      setPapers([]);
      setPagination(null);
    } finally {
      setLoading(false);
    }
  }, [
    params.search,
    params.departmentIds,
    params.year,
    params.sortBy,
    params.sortOrder,
    params.page,
    params.size,
    params.archived,
  ]);

  useEffect(() => {
    void fetchPapers();
  }, [fetchPapers]);

  return {
    papers,
    loading,
    error,
    pagination,
    refetch: fetchPapers,
  };
};
