import { DataTable } from "@/components/common/DataTable/DataTable";
import { LoadingSpinner } from "@/components/common/LoadingSpinner/LoadingSpinner";
import { useAdminRequests } from "../../hooks/useAdminDocumentRequest";
import { columns } from "./columns";

export function RequestsTable() {
  const { data, pageIndex, pageSize, pageCount, setPageIndex, isLoading, error } =
    useAdminRequests();

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
        const nextState =
          typeof updater === "function" ? updater({ pageIndex, pageSize }) : updater;
        setPageIndex(nextState.pageIndex);
      }}
    />
  );
}
