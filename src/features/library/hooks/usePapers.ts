import { useCallback, useEffect, useState } from "react";
import { getPapers, GetPapersParams } from "@/api/paper";
import { type ResearchPaper } from "@/types";
import { extractApiError, getUserErrorMessage } from "@/util/errorHandler";

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
  currentPage: number;
  goToNextPage: () => void;
  goToPrevPage: () => void;
  goToPage: (page: number) => void;
  refetch: () => Promise<void>;
}

export const usePapers = (params: GetPapersParams = {}): UsePapersReturn => {
  const [papers, setPapers] = useState<ResearchPaper[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<UsePapersReturn["pagination"]>(null);
  const [currentPage, setCurrentPage] = useState(params.page ?? 0);

  const { search, departmentId, year, sortBy, sortOrder, size = 12, archived } = params;

  const fetchPapers = useCallback(async (): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const apiParams: GetPapersParams = {
        search: search,
        departmentId: departmentId,
        year: year,
        sortBy,
        sortOrder,
        page: currentPage,
        size,
        archived,
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
  }, [search, departmentId, year, sortBy, sortOrder, currentPage, size, archived]);

  const goToNextPage = useCallback(() => {
    if (pagination && currentPage < pagination.totalPages - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  }, [currentPage, pagination]);

  const goToPrevPage = useCallback(() => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  }, [currentPage]);

  const goToPage = useCallback(
    (page: number) => {
      if (pagination && page >= 0 && page < pagination.totalPages) {
        setCurrentPage(page);
      }
    },
    [pagination],
  );

  // Reset to first page when search parameters change
  useEffect(() => {
    setCurrentPage(0);
  }, [search, departmentId, year]);

  useEffect(() => {
    void fetchPapers();
  }, [fetchPapers, currentPage]);

  return {
    papers,
    loading,
    error,
    pagination,
    currentPage,
    goToNextPage,
    goToPrevPage,
    goToPage,
    refetch: fetchPapers,
  };
};
