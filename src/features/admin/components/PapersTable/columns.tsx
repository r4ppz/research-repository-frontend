import { createColumnHelper } from "@tanstack/react-table";
import { Archive, Edit, Eye, RotateCcw, Trash2 } from "lucide-react";
import { Button } from "@/components/common/Button/Button";
import { ConfirmDialog } from "@/components/common/AlertDialog/ConfirmDialog";
import type { ResearchPaper } from "@/types";
import { formatDateShort } from "@/util/formatDate";
import style from "../RequestTable/columns.module.css";

export interface TableMeta {
  onView: (paper: ResearchPaper) => void;
  onEdit: (paper: ResearchPaper) => void;
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
          className={style.actionButton}
          onClick={() => {
            meta.onView(paper);
          }}
        >
          <Eye className={style.actionIcon} />
        </Button>
        <Button
          className={style.actionButton}
          onClick={() => {
            meta.onEdit(paper);
          }}
        >
          <Edit className={style.actionIcon} />
        </Button>
        <ConfirmDialog
          title="Archive paper?"
          description="Are you sure you want to archive this paper? It will be moved to archived papers."
          confirmText="Archive"
          cancelText="Cancel"
          onConfirm={() => {
            meta.onArchive(paper.paperId);
          }}
          trigger={
            <Button className={style.actionButton}>
              <Archive className={style.actionIcon} />
            </Button>
          }
        />
        <ConfirmDialog
          title="Delete paper?"
          description="Are you sure you want to permanently delete this paper? This action cannot be undone."
          confirmText="Delete"
          cancelText="Cancel"
          onConfirm={() => {
            meta.onDelete(paper.paperId);
          }}
          trigger={
            <Button className={style.actionButton}>
              <Trash2 className={style.actionIcon} />
            </Button>
          }
        />
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
          className={style.actionButton}
          onClick={() => {
            meta.onView(paper);
          }}
        >
          <Eye className={style.actionIcon} />
        </Button>
        <Button
          className={style.actionButton}
          onClick={() => {
            meta.onEdit(paper);
          }}
        >
          <Edit className={style.actionIcon} />
        </Button>
        <ConfirmDialog
          title="Restore paper?"
          description="Are you sure you want to restore this paper to active papers?"
          confirmText="Restore"
          cancelText="Cancel"
          onConfirm={() => {
            meta.onRestore(paper.paperId);
          }}
          trigger={
            <Button className={style.actionButton}>
              <RotateCcw className={style.actionIcon} />
            </Button>
          }
        />
        <ConfirmDialog
          title="Delete paper?"
          description="Are you sure you want to permanently delete this paper? This action cannot be undone."
          confirmText="Delete"
          cancelText="Cancel"
          onConfirm={() => {
            meta.onDelete(paper.paperId);
          }}
          trigger={
            <Button className={style.actionButton}>
              <Trash2 className={style.actionIcon} />
            </Button>
          }
        />
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
