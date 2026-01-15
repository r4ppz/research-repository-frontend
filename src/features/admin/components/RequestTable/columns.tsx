import { createColumnHelper } from "@tanstack/react-table";
import { Button } from "@/components/common/Button/Button";
import type { DocumentRequest, ResearchPaper } from "@/types";
import { formatDateShort } from "@/util/formatDate";
import style from "./columns.module.css";

export interface TableMeta {
  onView: (paper: ResearchPaper) => void;
  onReject: (requestId: number) => void;
  onAccept: (requestId: number) => void;
}

const columnHelper = createColumnHelper<DocumentRequest>();

export const columns = [
  columnHelper.accessor((row) => row.user?.fullName, {
    id: "studentName",
    header: "Student Name",
    cell: (info) => info.getValue(),
  }),

  columnHelper.accessor((row) => row.paper.title, {
    id: "paperTitle",
    header: "Requested Paper",
    cell: (info) => info.getValue(),
  }),

  columnHelper.accessor((row) => row.paper.department.departmentName, {
    id: "department",
    header: "Department",
  }),

  columnHelper.accessor("createdAt", {
    header: "Date Requested",
    cell: (info) => formatDateShort(info.getValue<string>()),
  }),

  columnHelper.display({
    id: "actions",
    header: "Action",
    cell: ({ row, table }) => {
      const meta = table.options.meta as TableMeta;

      return (
        <div className={style.actionButtonContainer}>
          <Button onClick={() => meta?.onView(row.original.paper)}>View</Button>
          <Button onClick={() => meta?.onReject(row.original.requestId)}>Reject</Button>
          <Button onClick={() => meta?.onAccept(row.original.requestId)}>Accept</Button>
        </div>
      );
    },
  }),
];
