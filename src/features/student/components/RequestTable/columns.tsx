import type { ColumnDef } from "@tanstack/react-table";

import { deleteRequest } from "@/api/request";
import Button from "@/components/common/Button/Button";
import type { DocumentRequest, RequestStatus } from "@/types";
import { extractApiError, getUserErrorMessage } from "@/util/errorHandler";
import { formatDateShort } from "@/util/formatDate";

import style from "./column.module.css";

// TODO: use createColumnHelper instead

interface ColumnProps {
  refreshData: () => void;
}

export const createColumns = ({ refreshData }: ColumnProps): ColumnDef<DocumentRequest>[] => [
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

      const handleDeleteRequest = async () => {
        try {
          await deleteRequest(doc.requestId);
          alert("Request removed successfully");
          refreshData();
        } catch (error) {
          const apiError = extractApiError(error);
          const errorMessage = getUserErrorMessage(apiError);
          alert(`Request removed successfully${errorMessage}`);
        }
      };

      const handleDeleteClick = () => {
        void handleDeleteRequest();
      };

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
            <Button className={style.actionButton} onClick={handleDeleteClick}>
              Remove
            </Button>
          )}
        </div>
      );
    },
  },
];
