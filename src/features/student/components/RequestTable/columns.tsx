import { ColumnDef } from "@tanstack/react-table";
import Button from "@/components/common/Button/Button";
import { DocumentRequest, RequestStatus } from "@/types";

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
    accessorKey: "paper.department",
    header: () => "Department",
  },
  {
    accessorKey: "createdAt",
    header: () => "Request Date",
    cell: (info) => new Date(info.getValue<string>()).toLocaleDateString(),
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

      return (
        <div style={{ display: "flex", gap: "8px" }}>
          <Button
            onClick={() => {
              console.log("Downloading paper");
            }}
            disabled={!isAccepted}
          >
            {isAccepted ? "Download" : "Disabled"}
          </Button>
          {isRejected && (
            <Button
              onClick={() => {
                console.log("Removing request");
              }}
              style={{ backgroundColor: "red", color: "white" }}
            >
              X
            </Button>
          )}
        </div>
      );
    },
  },
];
