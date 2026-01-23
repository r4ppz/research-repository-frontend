import { createColumnHelper } from "@tanstack/react-table";
import clsx from "clsx";
import { Archive, Eye, RotateCcw, Trash2 } from "lucide-react";
import { Button } from "@/components/common/Button/Button";
import type { ResearchPaper } from "@/types";
import { formatDateShort } from "@/util/formatDate";
import style from "./columns.module.css";

export interface TableMeta {
  onView: (paper: ResearchPaper) => void;
  onArchive: (paperId: number) => void;
  onRestore: (paperId: number) => void;
  onDelete: (paperId: number) => void;
}

const columnHelper = createColumnHelper<ResearchPaper>();

const titleColumn = columnHelper.accessor("title", {
  header: "Title",
  cell: (info) => info.getValue(),
});

const authorColumn = columnHelper.accessor("authorName", {
  header: "Author",
  cell: (info) => info.getValue(),
});

const departmentColumn = columnHelper.accessor((row) => row.department.departmentName, {
  id: "department",
  header: "Department",
});

const submissionDateColumn = columnHelper.accessor("submissionDate", {
  header: "Submission Date",
  cell: (info) => formatDateShort(info.getValue()),
});

// Actions column for Active Papers (View + Archive)
const actionsActiveColumn = columnHelper.display({
  id: "actions",
  header: "Action",
  cell: ({ row, table }) => {
    const meta = table.options.meta as TableMeta;
    const paper = row.original;

    return (
      <div className={style.actionButtonContainer}>
        <Button
          className={style.actionButtonContainer}
          onClick={() => {
            meta.onView(paper);
          }}
        >
          <Eye size={16} />
        </Button>
        <Button
          className={style.actionButtonContainer}
          onClick={() => {
            meta.onArchive(paper.paperId);
          }}
        >
          <Archive size={16} />
        </Button>
        <Button
          className={clsx(style.actionButtonContainer, style.deleteButton)}
          onClick={() => {
            meta.onDelete(paper.paperId);
          }}
        >
          <Trash2 size={16} />
        </Button>
      </div>
    );
  },
});

// Actions column for Archived Papers (View + Restore)
const actionsArchivedColumn = columnHelper.display({
  id: "actions",
  header: "Action",
  cell: ({ row, table }) => {
    const meta = table.options.meta as TableMeta;
    const paper = row.original;

    return (
      <div className={style.actionButtonContainer}>
        <Button
          className={style.actionButtonContainer}
          onClick={() => {
            meta.onView(paper);
          }}
        >
          <Eye size={16} />
        </Button>
        <Button
          className={style.actionButtonContainer}
          onClick={() => {
            meta.onRestore(paper.paperId);
          }}
        >
          <RotateCcw size={16} />
        </Button>
      </div>
    );
  },
});

// Columns for Active Papers with department (for Super Admin)
export const columnsActive = [
  titleColumn,
  authorColumn,
  departmentColumn,
  submissionDateColumn,
  actionsActiveColumn,
];

// Columns for Active Papers without department (for Department Admin)
export const columnsActiveWithoutDepartment = [
  titleColumn,
  authorColumn,
  submissionDateColumn,
  actionsActiveColumn,
];

// Columns for Archived Papers with department (for Super Admin)
export const columnsArchived = [
  titleColumn,
  authorColumn,
  departmentColumn,
  submissionDateColumn,
  actionsArchivedColumn,
];

// Columns for Archived Papers without department (for Department Admin)
export const columnsArchivedWithoutDepartment = [
  titleColumn,
  authorColumn,
  submissionDateColumn,
  actionsArchivedColumn,
];
