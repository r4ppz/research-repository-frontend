import clsx from "clsx";
import { Archive, Eye, Pencil, Trash2, RotateCcw } from "lucide-react";
import { useState } from "react";
import Button from "@/components/common/Button/Button";
import Table from "@/components/common/Table/Table";
import { type ResearchPaper } from "@/types";
import styles from "./ResearchPaperTable.module.css";

interface ResearchPaperTableProps {
  papers: ResearchPaper[];
  className?: string;
  onEdit: (paperId: number) => void;
  onArchive: (paperId: number) => void;
  onDelete: (paperId: number) => void;
  onPreview: (paper: ResearchPaper) => void;
  showDepartmentColumn?: boolean;
}

const ResearchPaperTable = ({
  papers,
  className,
  onEdit,
  onArchive,
  onDelete,
  onPreview,
  showDepartmentColumn = true,
}: ResearchPaperTableProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 5;

  const columns = [
    {
      key: "title",
      title: "Title",
      render: (paper: ResearchPaper) => paper.title,
    },
    {
      key: "authorName",
      title: "Author",
      render: (paper: ResearchPaper) => paper.authorName,
    },
    ...(showDepartmentColumn
      ? [
          {
            key: "department.departmentName",
            title: "Department",
            render: (paper: ResearchPaper) => paper.department.departmentName,
          },
        ]
      : []),
    {
      key: "submissionDate",
      title: "Submission Date",
      render: (paper: ResearchPaper) => new Date(paper.submissionDate).toLocaleDateString(),
    },
    {
      key: "status",
      title: "Status",
      render: (paper: ResearchPaper) => (
        <span
          className={clsx(styles.statusBadge, paper.archived ? styles.archived : styles.active)}
        >
          {paper.archived ? "Archived" : "Active"}
        </span>
      ),
    },
    {
      key: "actions",
      title: "Actions",
      render: (paper: ResearchPaper) => (
        <div className={styles.actionButtons}>
          <Button
            className={styles.actionButton}
            onClick={() => {
              onPreview(paper);
            }}
            variant="secondary"
          >
            <Eye className={styles.iconEye} />
          </Button>
          <Button
            className={styles.actionButton}
            onClick={() => {
              onEdit(paper.paperId);
            }}
            variant="secondary"
          >
            <Pencil className={styles.iconEdit} />
          </Button>
          {paper.archived ? (
            <Button
              className={styles.actionButton}
              onClick={() => {
                onArchive(paper.paperId);
              }}
              variant="secondary"
            >
              <RotateCcw className={styles.iconUnarchive} />
            </Button>
          ) : (
            <Button
              className={styles.actionButton}
              onClick={() => {
                onArchive(paper.paperId);
              }}
              variant="secondary"
            >
              <Archive className={styles.iconArchive} />
            </Button>
          )}
          <Button
            className={styles.actionButton}
            onClick={() => {
              onDelete(paper.paperId);
            }}
            variant="secondary"
          >
            <Trash2 className={styles.iconDelete} />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Table<ResearchPaper>
      data={papers}
      columns={columns}
      rowKey={(paper) => paper.paperId.toString()}
      className={clsx(styles.paperTable, className)}
      pagination={{
        pageSize,
        currentPage,
        onPageChange: setCurrentPage,
        totalElements: papers.length,
      }}
      emptyText="No papers found"
    />
  );
};

export default ResearchPaperTable;
