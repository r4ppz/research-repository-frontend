import { createColumnHelper } from "@tanstack/react-table";
import { Download, Trash2 } from "lucide-react";
import { Button } from "@/components/common/Button/Button";
import type { DocumentRequest } from "@/types";
import { formatDateShort } from "@/util/formatDate";
import style from "./column.module.css";

export interface TableMeta {
  onDownload: () => void;
  onRemove: (requestId: number) => void;
  removingIds?: Set<number>;
}

const columnHelper = createColumnHelper<DocumentRequest>();

export const columns = [
  columnHelper.accessor((row) => row.paper.title, {
    id: "paperTitle",
    header: "Paper Title",
    cell: (info) => info.getValue(),
  }),

  columnHelper.accessor((row) => row.paper.authorName, {
    id: "author",
    header: "Author",
    cell: (info) => info.getValue(),
  }),

  columnHelper.accessor((row) => row.paper.department.departmentName, {
    id: "department",
    header: "Department",
  }),

  columnHelper.accessor("createdAt", {
    header: "Request Date",
    cell: (info) => formatDateShort(info.getValue<string>()),
  }),

  columnHelper.accessor("status", {
    header: "Status",
    cell: (info) => {
      const status = info.getValue();
      const statusStyles = {
        ACCEPTED: style["status--accepted"],
        REJECTED: style["status--rejected"],
        PENDING: style["status--pending"],
      };

      return <span className={[style.status, statusStyles[status]].join(" ")}>{status}</span>;
    },
  }),

  columnHelper.display({
    id: "actions",
    header: "Actions",
    cell: ({ row, table }) => {
      const request = row.original;
      const meta = table.options.meta as TableMeta;

      const isAccepted = request.status === "ACCEPTED";
      const isRejected = request.status === "REJECTED";
      const isPending = request.status === "PENDING";

      return (
        <div className={style.actionButtonContainer}>
          {(isPending || isAccepted) && (
            <Button
              className={style.actionButton}
              disabled={isPending}
              onClick={() => {
                meta.onDownload();
              }}
            >
              <Download size={16} />
            </Button>
          )}

          {isRejected &&
            (() => {
              const isRemoving = (meta.removingIds ?? new Set()).has(request.requestId);
              return (
                <Button
                  className={style.actionButton}
                  onClick={() => {
                    meta.onRemove(request.requestId);
                  }}
                  disabled={isRemoving}
                >
                  <Trash2 size={16} />
                </Button>
              );
            })()}
        </div>
      );
    },
  }),
];
