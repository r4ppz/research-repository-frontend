import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getAdminRequests, type GetAdminRequestsParams } from "@/api/admin/requests";
import { extractApiError, getUserErrorMessage } from "@/util/errorHandler";

export function useAdminRequests(params: GetAdminRequestsParams = {}) {
  // 1. Manage pagination state locally
  const [pageIndex, setPageIndex] = useState(params.page ?? 0);
  const [pageSize, setPageSize] = useState(params.size ?? 5);

  // 2. Destructure other filters to include in the Query Key
  const { departmentId, status, sortBy, sortOrder } = params;

  // 3. TanStack Query implementation
  const query = useQuery({
    // The queryKey is the "ID" for this specific request.
    // When pageIndex or filters change, a new request is triggered.
    queryKey: ["adminRequests", { departmentId, status, pageIndex, pageSize, sortBy, sortOrder }],
    queryFn: () =>
      getAdminRequests({
        ...params,
        page: pageIndex,
        size: pageSize,
      }),
    // placeholderData: keepPreviousData prevents the UI from jumping to
    // a loading spinner when moving between pages.
    placeholderData: keepPreviousData,
  });

  const totalElements = query.data?.totalElements ?? 0;
  const pageCount = Math.ceil(totalElements / pageSize);

  return {
    // Data and Status
    data: query.data?.content ?? [],
    totalCount: totalElements,
    pageCount,
    isLoading: query.isLoading, // First time loading
    isFetching: query.isFetching, // Any time background fetching happens
    error: query.error ? getUserErrorMessage(extractApiError(query.error)) : null,

    // Pagination State & Setters
    pageIndex,
    pageSize,
    setPageIndex,
    setPageSize,

    // Manual Refresh (Query Client refetch)
    refresh: query.refetch,
  };
}
