import type { PaginationState } from "@tanstack/react-table";
import { useState } from "react";
import { DataTable } from "@/components/common/DataTable/DataTable";
import { LoadingSpinner } from "@/components/common/LoadingSpinner/LoadingSpinner";
import type { ResearchPaper } from "@/types";
import { useAdminPapers } from "../../hooks/useAdminPapers";
import {
  useArchivePaper,
  useDeletePaper,
  useUnarchivePaper,
} from "../../hooks/useAdminPaperActions";
import { EditPaperModal } from "../EditPaperModal/EditPaperModal";
import { ResearchModal } from "../ResearchModal/ResearchModal";
import {
  columnsActive,
  columnsActiveWithoutDepartment,
  columnsArchived,
  columnsArchivedWithoutDepartment,
  type TableMeta,
} from "./columns";

interface PapersTableProps {
  archived: boolean;
  showDepartment?: boolean;
}

export function PapersTable({ archived, showDepartment = true }: PapersTableProps) {
  const [selectedPaper, setSelectedPaper] = useState<ResearchPaper | null>(null);
  const [editingPaper, setEditingPaper] = useState<ResearchPaper | null>(null);

  const { data, pageIndex, pageSize, pageCount, setPageIndex, isLoading, error } = useAdminPapers({
    archived,
  });

  const archiveMutation = useArchivePaper();
  const unarchiveMutation = useUnarchivePaper();
  const deleteMutation = useDeletePaper();

  const tableMeta: TableMeta = {
    onView: (paper) => {
      setSelectedPaper(paper);
    },
    onEdit: (paper) => {
      setEditingPaper(paper);
    },
    onArchive: (paperId) => {
      archiveMutation.mutate(paperId);
    },
    onRestore: (paperId) => {
      unarchiveMutation.mutate(paperId);
    },
    onDelete: (paperId) => {
      if (window.confirm("Are you sure you want to permanently delete this paper?")) {
        deleteMutation.mutate(paperId);
      }
    },
  };

  // Select the appropriate columns based on archived and showDepartment
  const getColumns = () => {
    if (archived) {
      return showDepartment ? columnsArchived : columnsArchivedWithoutDepartment;
    }
    return showDepartment ? columnsActive : columnsActiveWithoutDepartment;
  };

  if (isLoading) {
    return (
      <LoadingSpinner message={archived ? "Loading archived papers..." : "Loading papers..."} />
    );
  }

  if (error) {
    return <p>Failed to load: {error}</p>;
  }

  return (
    <>
      <DataTable
        caption={archived ? "Archived Papers" : "Active Papers"}
        columns={getColumns()}
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

      <ResearchModal
        isOpen={!!selectedPaper}
        paper={selectedPaper}
        onClose={() => {
          setSelectedPaper(null);
        }}
      />

      <EditPaperModal
        isOpen={!!editingPaper}
        paper={editingPaper}
        onClose={() => {
          setEditingPaper(null);
        }}
      />
    </>
  );
}
