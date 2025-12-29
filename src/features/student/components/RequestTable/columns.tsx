import { ColumnDef } from "@tanstack/react-table";
import Button from "@/components/common/Button/Button";
import { DocumentRequest, RequestStatus } from "@/types";
import { formatDateShort } from "@/util/formatDate";
import style from "./column.module.css";

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
      return (
        <span
          className={[
            style.status,
            status === "ACCEPTED"
              ? style["status--accepted"]
              : status === "REJECTED"
                ? style["status--rejected"]
                : style["status--pending"],
          ].join(" ")}
        >
          {status}
        </span>
      );
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
        <div className={style.actionButtonContainer}>
          {(isPending || isAccepted) && (
            <Button
              className={style.actionButton}
              disabled={isPending}
              onClick={() => {
                console.log("TODO: API call to download file");
              }}
            >
              Download
            </Button>
          )}
          {isRejected && (
            <Button
              className={style.actionButton}
              onClick={() => {
                console.log("TODO: API call to remove request");
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
