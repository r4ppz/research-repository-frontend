import { useCallback, useEffect, useState } from "react";
import { getAdminRequests, GetAdminRequestsParams } from "@/api/admin/requests";
import { DocumentRequest } from "@/types";
import { extractApiError, getUserErrorMessage } from "@/util/errorHandler";

export const useAdminDocumentRequests = (params: GetAdminRequestsParams = {}) => {
  const [data, setData] = useState<DocumentRequest[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalElements, setTotalElements] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [error, setError] = useState<string | null>(null);

  // Destructure primitives to avoid the object reference identity trap
  const { departmentId, status, sortBy, sortOrder, size = 20 } = params;

  //  Local state for TanStack Table pagination
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: size,
  });

  const fetchRequests = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getAdminRequests({
        departmentId,
        status,
        sortBy,
        sortOrder,
        page: pagination.pageIndex,
        size: pagination.pageSize,
      });

      setData(response.content);
      setTotalElements(response.totalElements);
      setPageCount(response.totalPages);
    } catch (err) {
      const apiError = extractApiError(err);
      setError(getUserErrorMessage(apiError));
      console.error("Failed to fetch requests", apiError);
    } finally {
      setLoading(false);
    }
    //  Dependency array uses primitives (strings/numbers) only
  }, [departmentId, status, sortBy, sortOrder, pagination.pageIndex, pagination.pageSize]);

  // Reset to first page if filters change
  useEffect(() => {
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  }, [departmentId, status, sortBy, sortOrder]);

  useEffect(() => {
    void fetchRequests();
  }, [fetchRequests]);

  return {
    data,
    loading,
    error,
    totalElements,
    pageCount,
    pagination,
    setPagination,
    refetch: fetchRequests,
  };
};
