import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getDepartments } from "@/api/filter";
import { Button } from "@/components/common/Button/Button";
import { Dialog, DialogContent, DialogTitle } from "@/components/common/Dialog/Dialog";
import { Input } from "@/components/common/Input/Input";
import { Select } from "@/components/common/Select/Select";
import { Textarea } from "@/components/common/Textarea/Textarea";
import { useAuth } from "@/features/auth/context/useAuth";
import { useCreatePaper } from "../../hooks/useAdminPaperActions";
import { FileUpload } from "../FileUpload/FileUpload";
import style from "./PaperFormModal.module.css";

interface PaperFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PaperFormModal = ({ isOpen, onClose }: PaperFormModalProps) => {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [abstractText, setAbstractText] = useState("");
  const [departmentId, setDepartmentId] = useState<number | "">("");
  const [submissionDate, setSubmissionDate] = useState("");
  const [file, setFile] = useState<File | null>(null);

  // Auto-set department for Department Admin
  useEffect(() => {
    if (isOpen && user?.role === "DEPARTMENT_ADMIN" && user.department) {
      setDepartmentId(user.department.departmentId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

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
          departmentId,
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
    // Only reset department if user is Super Admin
    if (user?.role === "SUPER_ADMIN") {
      setDepartmentId("");
    }
    setSubmissionDate("");
    setFile(null);
  };

  const isDepartmentDisabled = user?.role === "DEPARTMENT_ADMIN";

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          resetForm();
          onClose();
        }
      }}
    >
      <DialogContent className={style.modal}>
        <DialogTitle className={style.modalTitle}>Add New Research Paper</DialogTitle>
        <form onSubmit={handleSubmit} className={style.form}>
          <div className={style.columnContainer}>
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
                  value={departmentId ? departmentId.toString() : ""}
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
                    isDepartmentDisabled && user.department
                      ? user.department.departmentName
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
                  onChange={(e) => {
                    setAbstractText(e.target.value);
                  }}
                  required
                />
              </div>

              <div className={style.field}>
                <label htmlFor="paper-file">Paper File (PDF/DOCX)</label>
                <FileUpload
                  id="paper-file"
                  value={file}
                  onChange={(f) => {
                    setFile(f);
                  }}
                  required
                />
              </div>
            </div>
          </div>

          <div className={style.actionsContainer}>
            <Button variant="secondary" onClick={onClose} type="button">
              Cancel
            </Button>
            <Button type="submit" isPending={createMutation.isPending}>
              {createMutation.isPending ? "Adding..." : "Add Paper"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
