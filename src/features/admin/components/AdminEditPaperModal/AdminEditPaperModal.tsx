import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { getDepartments } from "@/api/filter";
import { Button } from "@/components/common/Button/Button";
import { Dialog, DialogContent, DialogTitle } from "@/components/common/Dialog/Dialog";
import { Input } from "@/components/common/Input/Input";
import { Select } from "@/components/common/Select/Select";
import { Textarea } from "@/components/common/Textarea/Textarea";
import { useAuth } from "@/features/auth/context/useAuth";
import type { ResearchPaper } from "@/types";
import { useUpdatePaper } from "../../hooks/useAdminPaperActions";
import style from "./AdminEditPaperModal.module.css";

interface AdminEditPaperModalProps {
  isOpen: boolean;
  onClose: () => void;
  paper: ResearchPaper | null;
}

export const AdminEditPaperModal = ({ isOpen, onClose, paper }: AdminEditPaperModalProps) => {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [abstractText, setAbstractText] = useState("");
  const [departmentId, setDepartmentId] = useState<number | "">("");
  const [submissionDate, setSubmissionDate] = useState("");

  const isDepartmentDisabled = user?.role === "DEPARTMENT_ADMIN";

  // Sync state when paper changes or modal opens
  useEffect(() => {
    if (paper && isOpen) {
      setTitle(paper.title);
      setAuthorName(paper.authorName);
      setAbstractText(paper.abstractText);
      setDepartmentId(paper.department.departmentId);
      setSubmissionDate(paper.submissionDate.split("T")[0]);
    }
  }, [isOpen, paper]);

  const { data: departments } = useQuery({
    queryKey: ["departments"],
    queryFn: getDepartments,
  });

  const updateMutation = useUpdatePaper();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!paper || departmentId === "") return;

    updateMutation.mutate(
      {
        id: paper.paperId,
        metadata: {
          title,
          authorName,
          abstractText,
          departmentId,
          submissionDate,
        },
      },
      {
        onSuccess: () => {
          onClose();
        },
      },
    );
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          onClose();
        }
      }}
    >
      <DialogContent className={style.modal}>
        <DialogTitle className={style.modalTitle}>Edit Research Paper</DialogTitle>
        <form onSubmit={handleSubmit} className={style.form}>
          <div className={style.leftColumn}>
            <div className={style.field}>
              <label htmlFor="title">Title</label>
              <Input
                id="title"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                required
              />
            </div>

            <div className={style.field}>
              <label htmlFor="author">Author Name</label>
              <Input
                id="author"
                value={authorName}
                onChange={(e) => {
                  setAuthorName(e.target.value);
                }}
                required
              />
            </div>

            <div className={style.field}>
              <label htmlFor="department">Department</label>
              <Select
                value={departmentId.toString()}
                onValueChange={(v) => {
                  setDepartmentId(Number(v));
                }}
                disabled={isDepartmentDisabled}
                options={
                  departments?.map((dept) => ({
                    value: dept.departmentId.toString(),
                    label: dept.departmentName,
                  })) ?? []
                }
                placeholder={
                  isDepartmentDisabled && paper
                    ? paper.department.departmentName
                    : "Select Department"
                }
              />
            </div>

            <div className={style.field}>
              <label htmlFor="date">Submission Date</label>
              <Input
                id="date"
                type="date"
                value={submissionDate}
                onChange={(e) => {
                  setSubmissionDate(e.target.value);
                }}
                required
              />
            </div>
          </div>

          <div className={style.rightColumn}>
            <div className={style.field}>
              <label htmlFor="abstract">Abstract</label>
              <Textarea
                id="abstract"
                value={abstractText}
                className={style.abstractTextarea}
                onChange={(e) => {
                  setAbstractText(e.target.value);
                }}
                required
              />
            </div>
          </div>

          <div className={clsx(style.actions, style.fullWidth)}>
            <Button variant="secondary" onClick={onClose} type="button">
              Cancel
            </Button>
            <Button type="submit" disabled={updateMutation.isPending}>
              {updateMutation.isPending ? "Updating..." : "Update Paper"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
