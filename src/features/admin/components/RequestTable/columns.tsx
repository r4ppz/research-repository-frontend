import { createColumnHelper } from "@tanstack/react-table";
import { Check, Eye, X } from "lucide-react";
import { Button } from "@/components/common/Button/Button";
import { ConfirmDialog } from "@/components/common/AlertDialog/ConfirmDialog";
import type { DocumentRequest, ResearchPaper } from "@/types";
import { formatDateShort } from "@/util/formatDate";
import style from "./columns.module.css";

export interface TableMeta {
  onView: (paper: ResearchPaper) => void;
  onReject: (requestId: number) => void;
  onAccept: (requestId: number) => void;
  pendingAcceptId: number | null;
  pendingRejectId: number | null;
}

const columnHelper = createColumnHelper<DocumentRequest>();

const studentNameColumn = columnHelper.accessor((row) => row.user?.fullName, {
  id: "studentName",
  header: "Student Name",
  cell: (info) => info.getValue(),
});

const paperTitleColumn = columnHelper.accessor((row) => row.paper.title, {
  id: "paperTitle",
  header: "Requested Paper",
  cell: (info) => info.getValue(),
});

const departmentColumn = columnHelper.accessor((row) => row.paper.department.departmentName, {
  id: "department",
  header: "Department",
});

const dateRequestedColumn = columnHelper.accessor("createdAt", {
  header: "Date Requested",
  cell: (info) => formatDateShort(info.getValue<string>()),
});

const actionsColumn = columnHelper.display({
  id: "actions",
  header: "Action",
  cell: ({ row, table }) => {
    const meta = table.options.meta as TableMeta;
    const requestId = row.original.requestId;
    const isAccepting = meta.pendingAcceptId === requestId;
    const isRejecting = meta.pendingRejectId === requestId;

    return (
      <div className={style.actionButtonContainer}>
        <Button
          className={style.actionButton}
          onClick={() => {
            meta.onView(row.original.paper);
          }}
        >
          <Eye className={style.actionIcon} />
        </Button>
        <ConfirmDialog
          title="Reject document request?"
          description="Are you sure you want to reject this document request? This action cannot be undone."
          confirmText="Reject"
          cancelText="Cancel"
          onConfirm={() => {
            meta.onReject(requestId);
          }}
          trigger={
            <Button className={style.actionButton} disabled={isRejecting || isAccepting}>
              <X className={style.actionIcon} />
            </Button>
          }
        />

        <ConfirmDialog
          title="Accept document request?"
          description="Are you sure you want to accept this document request? The requester will be granted access."
          confirmText="Accept"
          cancelText="Cancel"
          onConfirm={() => {
            meta.onAccept(requestId);
          }}
          trigger={
            <Button className={style.actionButton} disabled={isAccepting || isRejecting}>
              <Check className={style.actionIcon} />
            </Button>
          }
        />
      </div>
    );
  },
});

// Columns with department (for Super Admin)
export const columns = [
  studentNameColumn,
  paperTitleColumn,
  departmentColumn,
  dateRequestedColumn,
  actionsColumn,
];

// Columns without department (for Department Admin)
export const columnsWithoutDepartment = [
  studentNameColumn,
  paperTitleColumn,
  dateRequestedColumn,
  actionsColumn,
];
