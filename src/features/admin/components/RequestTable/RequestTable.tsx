import type { PaginationState } from "@tanstack/react-table";
import { DataTable } from "@/components/common/DataTable/DataTable";
import { LoadingSpinner } from "@/components/common/LoadingSpinner/LoadingSpinner";
import { useAdminRequests } from "../../hooks/useAdminDocumentRequest";
import { columns, type TableMeta } from "./columns";

export function RequestsTable() {
  const { data, pageIndex, pageSize, pageCount, setPageIndex, isLoading, error } =
    useAdminRequests();

  const tableMeta: TableMeta = {
    onView: (paper) => {
      console.log("Button clicked! Here is the paper object:", paper);
      console.log("Title:", paper.title);
      console.log("File Path:", paper.filePath);
    },
  };

  if (isLoading) {
    return <LoadingSpinner message="Loading requests..." />;
  }

  if (error) {
    return <p>Failed to load: {error}</p>;
  }

  return (
    <DataTable
      caption="Document Requests"
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
