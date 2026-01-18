import type { PaginationState } from "@tanstack/react-table";
import { useState } from "react";
import { deleteRequest } from "@/api/request";
import { DataTable } from "@/components/common/DataTable/DataTable";
import { LoadingSpinner } from "@/components/common/LoadingSpinner/LoadingSpinner";
import { extractApiError, getUserErrorMessage } from "@/util/errorHandler";
import { useUserRequests } from "../../hooks/useUserRequests";
import { columns, type TableMeta } from "./columns";

export function StudentRequestTable() {
  const [removalError, setRemovalError] = useState<string | null>(null);
  const [removingIds, setRemovingIds] = useState<Set<number>>(new Set());

  const { data, pageIndex, pageSize, pageCount, setPageIndex, isLoading, error, refresh } =
    useUserRequests();

  const tableMeta: TableMeta = {
    onDownload: () => {},
    // NOTE: this is still not tested
    // TODO: test once onReject is good enough
    onRemove: async (requestId: number) => {
      setRemovalError(null);
      // Check before mutating state or firing network
      if (removingIds.has(requestId)) {
        return;
      }

      setRemovingIds((prev) => {
        const newSet = new Set(prev);
        newSet.add(requestId);
        return newSet;
      });

      try {
        await deleteRequest(requestId);
        await refresh();
      } catch (error) {
        const errorMessage = extractApiError(error);
        setRemovalError(getUserErrorMessage(errorMessage));
      } finally {
        setRemovingIds((prev) => {
          const newSet = new Set(prev);
          newSet.delete(requestId);
          return newSet;
        });
      }
    },
  };

  if (isLoading && data.length === 0) {
    return <LoadingSpinner message="Loading your requests..." />;
  }

  if (error || removalError) {
    return <p>Failed to load: {error || removalError}</p>;
  }

  return (
    <DataTable
      caption="My Research Requests"
      columns={columns}
      data={data}
      pageCount={pageCount}
      pagination={{ pageIndex, pageSize }}
      onPaginationChange={(updater) => {
        let nextState: PaginationState;

        if (typeof updater === "function") {
          nextState = updater({ pageIndex, pageSize });
        } else {
          nextState = updater;
        }

        setPageIndex(nextState.pageIndex);
      }}
      meta={{ ...tableMeta, removingIds }}
    />
  );
}
