import { useCallback, useEffect, useState } from "react";
import { getAdminRequests, GetAdminRequestsParams } from "@/api/admin/requests";
import { DocumentRequest } from "@/types";
import { extractApiError, getUserErrorMessage } from "@/util/errorHandler";

interface UseAdminRequestsReturn {
  requests: DocumentRequest[];
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

export const useAdminRequests = (params: GetAdminRequestsParams = {}): UseAdminRequestsReturn => {
  const [requests, setRequests] = useState<DocumentRequest[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<UseAdminRequestsReturn["pagination"]>(null);
  const [currentPage, setCurrentPage] = useState(params.page ?? 0);

  const { departmentId, status, sortBy, sortOrder, size = 10 } = params;

  const fetchRequests = useCallback(async (): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const apiParams: GetAdminRequestsParams = {
        departmentId: departmentId ?? undefined,
        status: status ?? undefined,
        sortBy,
        sortOrder,
        page: currentPage,
        size,
      };

      const result = await getAdminRequests(apiParams);

      setRequests(result.content);
      setPagination({
        totalElements: result.totalElements,
        totalPages: result.totalPages,
        currentPage: result.number,
        pageSize: result.size,
      });
    } catch (err) {
      const apiError = extractApiError(err);
      setError(getUserErrorMessage(apiError));
      setRequests([]);
      setPagination(null);
    } finally {
      setLoading(false);
    }
  }, [departmentId, status, sortBy, sortOrder, currentPage, size]);

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

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(0);
  }, [departmentId, status]);

  // Fetch data when dependencies or page change
  useEffect(() => {
    void fetchRequests();
  }, [fetchRequests, currentPage]);

  return {
    requests,
    loading,
    error,
    pagination,
    currentPage,
    goToNextPage,
    goToPrevPage,
    goToPage,
    refetch: fetchRequests,
  };
};
