import { useState } from "react";
import clsx from "clsx";
import { Check, X } from "lucide-react";
import Button from "@/components/common/Button/Button";
import Table from "@/components/common/Table/Table";
import { DocumentRequest } from "@/types";
import styles from "./RequestTable.module.css";

interface RequestTableProps {
  requests: DocumentRequest[];
  className?: string;
  onAction: (requestId: number, action: "accept" | "reject") => void;
  showDepartmentColumn?: boolean;
}

const RequestTable = ({
  requests,
  className,
  onAction,
  showDepartmentColumn = true,
}: RequestTableProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 5;

  const baseColumns = [
    {
      key: "requester.fullName",
      title: "Requester",
      render: (request: DocumentRequest) => request.requester.fullName,
    },
    {
      key: "paper.title",
      title: "Paper Title",
      render: (request: DocumentRequest) => request.paper.title,
    },
    {
      key: "paper.authorName",
      title: "Author",
      render: (request: DocumentRequest) => request.paper.authorName,
    },
    {
      key: "requestDate",
      title: "Request Date",
      render: (request: DocumentRequest) => new Date(request.requestDate).toLocaleDateString(),
    },
    {
      key: "actions",
      title: "Actions",
      render: (request: DocumentRequest) => (
        <div className={styles.actionButtons}>
          <Button
            className={styles.actionButton}
            onClick={() => {
              onAction(request.requestId, "reject");
            }}
            disabled={request.status !== "PENDING"}
            variant={request.status === "PENDING" ? "secondary" : "secondary"}
          >
            Reject
            <X className={styles.iconReject} />
          </Button>

          <Button
            className={styles.actionButton}
            onClick={() => {
              onAction(request.requestId, "accept");
            }}
            disabled={request.status !== "PENDING"}
            variant={request.status === "PENDING" ? "primary" : "secondary"}
          >
            Accept
            <Check className={styles.iconAccept} />
          </Button>
        </div>
      ),
    },
  ];

  // NOTE: Could be improve, but okay for now :)
  const columns = showDepartmentColumn
    ? [
        ...baseColumns.slice(0, 3),
        {
          key: "paper.department.departmentName",
          title: "Department",
          render: (request: DocumentRequest) => request.paper.department.departmentName,
        },
        ...baseColumns.slice(3),
      ]
    : baseColumns;

  return (
    <Table<DocumentRequest>
      data={requests}
      columns={columns}
      rowKey={(request) => request.requestId.toString()}
      className={clsx(styles.requestTable, className)}
      pagination={{
        pageSize,
        currentPage,
        onPageChange: setCurrentPage,
        totalElements: requests.length,
      }}
      emptyText="No requests found"
    />
  );
};

export default RequestTable;
