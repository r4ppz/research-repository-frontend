import type { PaginationState } from "@tanstack/react-table";
import { useState } from "react";
import { DataTable } from "@/components/common/DataTable/DataTable";
import { LoadingSpinner } from "@/components/common/LoadingSpinner/LoadingSpinner";
import type { ResearchPaper } from "@/types";
import { useAdminRequests } from "../../hooks/useAdminDocumentRequest";
import { AdminResearchModal } from "../AdminResearchModal/AdminResearchModal";
import { columns, type TableMeta } from "./columns";

export function RequestsTable() {
  const [selectedPaper, setSelectedPaper] = useState<ResearchPaper | null>(null);

  const { data, pageIndex, pageSize, pageCount, setPageIndex, isLoading, error } =
    useAdminRequests();

  // TODO: add reject accept func in here
  // NOTE: still working on backend endpoint for this
  const tableMeta: TableMeta = {
    onView: (paper) => {
      setSelectedPaper(paper);
    },
    onReject: () => {
      console.log("Reject");
    },
    onAccept: () => {
      console.log("Accept");
    },
  };

  if (isLoading) {
    return <LoadingSpinner message="Loading requests..." />;
  }

  if (error) {
    return <p>Failed to load: {error}</p>;
  }

  return (
    <>
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

      <AdminResearchModal
        isOpen={!!selectedPaper}
        paper={selectedPaper}
        onClose={() => setSelectedPaper(null)}
      />
    </>
  );
}
