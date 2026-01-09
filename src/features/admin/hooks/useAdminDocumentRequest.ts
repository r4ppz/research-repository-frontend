import { useCallback, useEffect, useState } from "react";

import { getAdminRequests, GetAdminRequestsParams } from "@/api/admin/requests";
import { DocumentRequest } from "@/types";
import { Page } from "@/types/api";
import { extractApiError, getUserErrorMessage } from "@/util/errorHandler";

export function useAdminRequests(params: GetAdminRequestsParams = {}) {
  const [data, setData] = useState<DocumentRequest[]>([]);
  const [totalElements, setTotalElements] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Sync internal pagination state with initial params if provided
  const [pageIndex, setPageIndex] = useState<number>(params.page ?? 0);
  const [pageSize, setPageSize] = useState<number>(params.size ?? 6);

  // Destructure for dependency tracking
  const { departmentId, status, sortBy, sortOrder } = params;

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result: Page<DocumentRequest> = await getAdminRequests({
        departmentId,
        status,
        page: pageIndex,
        size: pageSize,
        sortBy,
        sortOrder,
      });

      setData(result.content);
      setTotalElements(result.totalElements);
    } catch (err) {
      const apiError = extractApiError(err);
      setError(getUserErrorMessage(apiError));
      setData([]);
      setTotalElements(0);
    } finally {
      setLoading(false);
    }
  }, [departmentId, status, pageIndex, pageSize, sortBy, sortOrder]);

  useEffect(() => {
    void fetchData();
  }, [fetchData]);

  useEffect(() => {
    setPageIndex(0);
  }, []);

  const pageCount = Math.ceil(totalElements / pageSize);

  return {
    data,
    pageIndex,
    pageSize,
    totalCount: totalElements,
    pageCount,
    setPageIndex,
    setPageSize,
    loading,
    error,
    refresh: fetchData,
  };
}
