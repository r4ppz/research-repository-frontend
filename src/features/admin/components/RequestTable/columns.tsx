import { createColumnHelper } from "@tanstack/react-table";
import { Button } from "@/components/common/Button/Button";
import type { DocumentRequest, ResearchPaper } from "@/types";
import { formatDateShort } from "@/util/formatDate";

export interface TableMeta {
  onView: (paper: ResearchPaper) => void;
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
        <div>
          {/* Now TypeScript knows that row.original.paper is a Paper object */}
          <Button onClick={() => meta?.onView(row.original.paper)}>View</Button>
        </div>
      );
    },
  }),
];
