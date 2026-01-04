import { useCallback, useEffect, useState } from "react";

import { getAdminRequests } from "@/api/admin/requests";
import { DocumentRequest } from "@/types";
import { Page } from "@/types/api";
import { extractApiError, getUserErrorMessage } from "@/util/errorHandler";

export function useAdminRequests() {
  const [data, setData] = useState<DocumentRequest[]>([]);
  const [pageIndex, setPageIndex] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(5);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res: Page<DocumentRequest> = await getAdminRequests({
        page: pageIndex,
        size: pageSize,
      });
      setData(res.content);
      setTotalCount(res.totalElements);
    } catch (err) {
      const error = extractApiError(err);
      setError(getUserErrorMessage(error));
      setData([]);
      setTotalCount(0);
    } finally {
      setLoading(false);
    }
  }, [pageIndex, pageSize]);

  useEffect(() => {
    void fetchData();
  }, [fetchData]);

  const pageCount = Math.ceil(totalCount / pageSize);

  return {
    data,
    pageIndex,
    pageSize,
    totalCount,
    pageCount,
    setPageIndex,
    setPageSize,
    loading,
    error,
  };
}
