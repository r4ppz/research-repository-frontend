import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getAdminPapers, type GetAdminPapersParams } from "@/api/admin/papers";
import { extractApiError, getUserErrorMessage } from "@/util/errorHandler";

export function useAdminPapers(params: GetAdminPapersParams = {}) {
  // Manage pagination state locally
  const [pageIndex, setPageIndex] = useState(params.page ?? 0);
  const [pageSize, setPageSize] = useState(params.size ?? 5);

  // Destructure other filters to include in the Query Key
  const { departmentId, archived, search, year, sortBy, sortOrder } = params;

  // TanStack Query implementation
  const query = useQuery({
    // The queryKey is the "ID" for this specific request.
    // When pageIndex or filters change, a new request is triggered.
    queryKey: [
      "adminPapers",
      { departmentId, archived, search, year, pageIndex, pageSize, sortBy, sortOrder },
    ],
    queryFn: () =>
      getAdminPapers({
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
