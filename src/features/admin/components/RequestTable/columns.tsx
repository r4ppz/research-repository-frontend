import { createColumnHelper } from "@tanstack/react-table";
import { Check, Eye, X } from "lucide-react";
import { Button } from "@/components/common/Button/Button";
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
          className={style.actionButtonContainer}
          onClick={() => {
            meta.onView(row.original.paper);
          }}
        >
          <Eye size={16} />
        </Button>
        <Button
          className={style.actionButtonContainer}
          disabled={isRejecting || isAccepting}
          onClick={() => {
            meta.onReject(requestId);
          }}
        >
          <X size={16} />
        </Button>

        <Button
          className={style.actionButtonContainer}
          disabled={isAccepting || isRejecting}
          onClick={() => {
            meta.onAccept(requestId);
          }}
        >
          <Check size={16} />
        </Button>
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
