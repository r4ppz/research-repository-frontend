import { ColumnDef } from "@tanstack/react-table";
import Button from "@/components/common/Button/Button";
import { DocumentRequest, RequestStatus } from "@/types";
import { formatDateShort } from "@/util/formatDate";

export const columns: ColumnDef<DocumentRequest>[] = [
  {
    accessorKey: "paper.title",
    header: () => "Paper Title",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "paper.authorName",
    header: () => "Author",
  },
  {
    accessorKey: "paper.department.departmentName",
    header: () => "Department",
  },
  {
    accessorKey: "createdAt",
    header: () => "Request Date",
    cell: (info) => formatDateShort(info.getValue<string>()),
  },
  {
    accessorKey: "status",
    header: () => "Status",
    cell: (info) => {
      const status = info.getValue<RequestStatus>();
      return <span>{status}</span>;
    },
  },
  {
    id: "action",
    header: () => "Action",
    cell: ({ row }) => {
      const doc = row.original;
      const isAccepted = doc.status === "ACCEPTED";
      const isRejected = doc.status === "REJECTED";
      const isPending = doc.status === "PENDING";

      return (
        <div>
          {(isPending || isAccepted) && (
            <Button
              disabled={isPending}
              onClick={() => {
                console.log("Downloading paper");
              }}
            >
              Download
            </Button>
          )}
          {isRejected && (
            <Button
              onClick={() => {
                console.log("Removing request");
              }}
            >
              Remove
            </Button>
          )}
        </div>
      );
    },
  },
];
