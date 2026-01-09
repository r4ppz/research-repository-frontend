import { createColumnHelper } from "@tanstack/react-table";
import { Button } from "@/components/common/Button/Button";
import type { DocumentRequest } from "@/types";
import { formatDateShort } from "@/util/formatDate";

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
    cell: (props) => (
      // temporary add later
      <div>
        <Button
          onClick={() => {
            console.log("Action for:", props.row.original.requestId);
          }}
        >
          View
        </Button>
      </div>
    ),
  }),
];
