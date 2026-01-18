import type { PaginationState } from "@tanstack/react-table";
import { DataTable } from "@/components/common/DataTable/DataTable";
import { LoadingSpinner } from "@/components/common/LoadingSpinner/LoadingSpinner";
import { useUserRequests } from "../../hooks/useUserRequests";
import { columns, type TableMeta } from "./columns";

export function StudentRequestTable() {
  const { data, pageIndex, pageSize, pageCount, setPageIndex, isLoading, error } =
    useUserRequests();

  const tableMeta: TableMeta = {
    onDownload: () => {},
    onRemove: () => {},
  };

  if (isLoading && data.length === 0) {
    return <LoadingSpinner message="Loading your requests..." />;
  }

  if (error) {
    return <p>Failed to load: {error}</p>;
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
      meta={tableMeta}
    />
  );
}
