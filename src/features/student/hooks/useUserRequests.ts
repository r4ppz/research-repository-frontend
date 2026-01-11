import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { type GetUserRequestsParams, getUserRequests } from "@/api/users";
import { extractApiError, getUserErrorMessage } from "@/util/errorHandler";

export function useUserRequests(params: GetUserRequestsParams = {}) {
  const [pageIndex, setPageIndex] = useState(params.page ?? 0);
  const [pageSize, setPageSize] = useState(params.size ?? 5);

  const { status, sortBy, sortOrder, search } = params;

  const query = useQuery({
    queryKey: ["userRequests", { status, pageIndex, pageSize, sortBy, sortOrder, search }],
    queryFn: () =>
      getUserRequests({
        ...params,
        page: pageIndex,
        size: pageSize,
      }),
    placeholderData: keepPreviousData,
  });

  const totalElements = query.data?.totalElements ?? 0;
  const pageCount = query.data?.totalPages ?? Math.ceil(totalElements / pageSize);

  return {
    data: query.data?.content ?? [],
    totalCount: totalElements,
    pageCount,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error ? getUserErrorMessage(extractApiError(query.error)) : null,

    // State & Setters
    pageIndex,
    pageSize,
    setPageIndex,
    setPageSize,

    refresh: query.refetch,
  };
}
