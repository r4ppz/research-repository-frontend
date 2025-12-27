import { useState } from "react";
import clsx from "clsx";
import { Download } from "lucide-react";
import Button from "@/components/common/Button/Button";
import Table from "@/components/common/Table/Table";
import { DocumentRequest } from "@/types";
import style from "./RequestTable.module.css";

interface RequestTableProps {
  requests: DocumentRequest[];
  className?: string;
  onDownload: (request: DocumentRequest) => void;
}

const RequestTable = ({ requests, className, onDownload }: RequestTableProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 5;

  const columns = [
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
      key: "paper.department.departmentName",
      title: "Department",
      render: (request: DocumentRequest) => request.paper.department.departmentName,
    },
    {
      key: "requestDate",
      title: "Request Date",
      render: (request: DocumentRequest) => new Date(request.requestDate).toLocaleDateString(),
    },
    {
      key: "status",
      title: "Status",
      render: (request: DocumentRequest) => (
        <span
          className={clsx(
            style.statusBadge,
            request.status === "PENDING" && style.statusPending,
            request.status === "ACCEPTED" && style.statusAccepted,
            request.status === "REJECTED" && style.statusRejected,
          )}
        >
          {request.status}
        </span>
      ),
    },
    {
      key: "actions",
      title: "Actions",
      render: (request: DocumentRequest) => (
        <Button
          className={style.downloadButton}
          onClick={() => {
            onDownload(request);
          }}
          disabled={request.status !== "ACCEPTED"}
          variant={request.status === "ACCEPTED" ? "primary" : "secondary"}
        >
          <Download className={style.iconDownload} />
          Download
        </Button>
      ),
    },
  ];

  return (
    <Table<DocumentRequest>
      data={requests}
      columns={columns}
      rowKey={(request) => request.requestId.toString()}
      className={clsx(style.requestTable, className)}
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
