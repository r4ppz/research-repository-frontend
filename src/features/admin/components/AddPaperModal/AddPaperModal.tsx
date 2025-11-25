import { FormEvent, useState } from "react";
import Button from "@/components/common/Button/Button";
import Input from "@/components/common/Input/Input";
import Modal from "@/components/common/Modal/Modal";
import Textarea from "@/components/common/Textarea/Textarea";
import FileUpload from "@/features/admin/components/FileUpload/FileUpload";
import { useAuth } from "@/features/auth/context/useAuth";
import { MOCK_DEPARTMENTS } from "@/mocks/filterMocks";
import { type ResearchPaper } from "@/types";
import style from "./AddPaperModal.module.css";

interface ResearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddPaperModal = ({ isOpen, onClose }: ResearchModalProps) => {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [abstract, setAbstract] = useState("");

  const userRole = user?.role;
  const userDepartment = user?.department;

  // For department admins, pre-populate the department field with their own department
  const [department, setDepartment] = useState(
    userRole === "DEPARTMENT_ADMIN" && userDepartment ? userDepartment.departmentName : "",
  );

  const [submissionDate, setSubmissionDate] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Create a new paper object
    const newPaper: Omit<ResearchPaper, "paperId" | "archivedAt"> = {
      title,
      authorName: author,
      abstractText: abstract,
      department: {
        departmentId:
          userRole === "DEPARTMENT_ADMIN" && userDepartment ? userDepartment.departmentId : 1,
        departmentName: department,
      },
      submissionDate,
    };

    console.log("New paper to be added:", newPaper);

    setTitle("");
    setAuthor("");
    setAbstract("");
    setDepartment(
      userRole === "DEPARTMENT_ADMIN" && userDepartment ? userDepartment.departmentName : "",
    );
    setSubmissionDate("");
    setSelectedFile(null);
    onClose();
  };

  return (
    <Modal className={style.modal} isOpen={isOpen} onClose={onClose}>
      <div className={style.modalContent}>
        <h2 className={style.modalTitle}>Add New Research Paper</h2>
        <form className={style.form} onSubmit={handleSubmit}>
          <div className={style.formContainer}>
            <div className={style.formRow}>
              <div className={style.formLeftSide}>
                <div className={style.formGroup}>
                  <label htmlFor="title" className={style.label}>
                    Paper Title *
                  </label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="Enter paper title"
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                    required
                  />
                </div>

                <div className={style.formGroup}>
                  <label htmlFor="author" className={style.label}>
                    Author Name *
                  </label>
                  <Input
                    id="author"
                    name="author"
                    placeholder="Enter author name"
                    value={author}
                    onChange={(e) => {
                      setAuthor(e.target.value);
                    }}
                    required
                  />
                </div>

                <div className={style.formGroup}>
                  <label htmlFor="submissionDate" className={style.label}>
                    Submission Date *
                  </label>
                  <Input
                    id="submissionDate"
                    name="submissionDate"
                    type="date"
                    value={submissionDate}
                    onChange={(e) => {
                      setSubmissionDate(e.target.value);
                    }}
                    required
                  />
                </div>

                <div className={style.formGroup}>
                  <label htmlFor="department" className={style.label}>
                    Department *
                  </label>
                  {userRole === "DEPARTMENT_ADMIN" ? (
                    <Input
                      id="department"
                      name="department"
                      value={department}
                      readOnly
                      disabled
                      placeholder="Your department"
                    />
                  ) : (
                    <select
                      id="department"
                      name="department"
                      className={style.select}
                      value={department}
                      onChange={(e) => {
                        setDepartment(e.target.value);
                      }}
                      required
                    >
                      <option value="">Select Department</option>
                      {MOCK_DEPARTMENTS.map((dept) => (
                        <option key={dept.departmentId} value={dept.departmentName}>
                          {dept.departmentName}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              </div>

              <div className={style.formRightSide}>
                <div className={style.formGroup}>
                  <label htmlFor="abstract" className={style.label}>
                    Abstract *
                  </label>
                  <Textarea
                    id="abstract"
                    name="abstract"
                    placeholder="Enter paper abstract"
                    value={abstract}
                    onChange={(e) => {
                      setAbstract(e.target.value);
                    }}
                    required
                    rows={4}
                  />
                </div>
                <div className={style.formGroup}>
                  <label htmlFor="file" className={style.label}>
                    Upload File *
                  </label>
                  <FileUpload
                    id="file"
                    name="file"
                    accept=".pdf,.doc,.docx"
                    required
                    value={selectedFile}
                    onChange={setSelectedFile}
                    placeholder="Click to upload or drag and drop"
                  />
                </div>
              </div>
            </div>

            <div className={style.modalActions}>
              <Button
                type="button"
                variant="secondary"
                className={style.cancelButton}
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button type="submit" variant="primary" className={style.submitButton}>
                Add Paper
              </Button>
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AddPaperModal;
