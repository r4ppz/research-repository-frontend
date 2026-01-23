import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { useState } from "react";
import { getDepartments } from "@/api/filter";
import { Button } from "@/components/common/Button/Button";
import { Dialog, DialogContent, DialogTitle } from "@/components/common/Dialog/Dialog";
import { Input } from "@/components/common/Input/Input";
import { Select } from "@/components/common/Select/Select";
import { Textarea } from "@/components/common/Textarea/Textarea";
import { FileUpload } from "../FileUpload/FileUpload";
import { useCreatePaper } from "../../hooks/useAdminPaperActions";
import style from "./AdminPaperFormModal.module.css";

interface AdminPaperFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminPaperFormModal = ({ isOpen, onClose }: AdminPaperFormModalProps) => {
  const [title, setTitle] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [abstractText, setAbstractText] = useState("");
  const [departmentId, setDepartmentId] = useState<number | "">("");
  const [submissionDate, setSubmissionDate] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const { data: departments } = useQuery({
    queryKey: ["departments"],
    queryFn: getDepartments,
  });

  const createMutation = useCreatePaper();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || departmentId === "") return;

    createMutation.mutate(
      {
        metadata: {
          title,
          authorName,
          abstractText,
          departmentId: departmentId,
          submissionDate,
        },
        file,
      },
      {
        onSuccess: () => {
          onClose();
          resetForm();
        },
      },
    );
  };

  const resetForm = () => {
    setTitle("");
    setAuthorName("");
    setAbstractText("");
    setDepartmentId("");
    setSubmissionDate("");
    setFile(null);
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
        <DialogTitle className={style.modalTitle}>Add New Research Paper</DialogTitle>
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
                options={
                  departments?.map((dept) => ({
                    value: dept.departmentId.toString(),
                    label: dept.departmentName,
                  })) ?? []
                }
                placeholder="Select Department"
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

            <div className={style.field}>
              <label>Paper File (PDF/DOCX)</label>
              <FileUpload
                value={file}
                onChange={(f) => {
                  setFile(f);
                }}
                required
              />
            </div>
          </div>

          <div className={clsx(style.actions, style.fullWidth)}>
            <Button variant="secondary" onClick={onClose} type="button">
              Cancel
            </Button>
            <Button type="submit" disabled={createMutation.isPending}>
              {createMutation.isPending ? "Adding..." : "Add Paper"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
