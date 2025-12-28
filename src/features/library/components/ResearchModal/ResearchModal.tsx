import Button from "@/components/common/Button/Button";
import LoadingSpinner from "@/components/common/LoadingSpinner/LoadingSpinner";
import Modal from "@/components/common/Modal/Modal";
import { formatDateLong } from "@/util/formatDate";
import { usePaperById } from "../../hooks/usePaperById";
import style from "./ResearchModal.module.css";

interface ResearchModalProps {
  isOpen: boolean;
  paperId: number | null;
  onClose: () => void;
}

const ResearchModal = ({ isOpen, paperId, onClose }: ResearchModalProps) => {
  const { paper, loading, error } = usePaperById(paperId);

  const handleRequestDocument = () => {
    alert(`TODO: add api call in here`);
  };

  if (loading) {
    return (
      <Modal className={style.modal} isOpen={isOpen} onClose={onClose}>
        <LoadingSpinner message="Loading..." />
      </Modal>
    );
  }

  if (error || !paper) {
    return (
      <Modal className={style.modal} isOpen={isOpen} onClose={onClose}>
        <p>{error || "Paper not found"}</p>
        <Button onClick={onClose}>Close</Button>
      </Modal>
    );
  }

  const formattedDate = formatDateLong(paper.submissionDate);
  const department = paper.department.departmentName;

  return (
    <Modal className={style.modal} isOpen={isOpen} onClose={onClose}>
      <div className={style.infoWrapper}>
        <h1 className={style.title}>{paper.title}</h1>
        <div className={style.authordateWrapper}>
          <p className={style.author}>{paper.authorName}</p>
          <p className={style.date}>{formattedDate}</p>
        </div>
      </div>
      <div className={style.departmentContainer}>
        <p className={style.department}>{department}</p>
      </div>
      <div className={style.abstractWrapper}>
        <h3 className={style.abtractHeader}>Abstract</h3>
        <p className={style.abstractText}>{paper.abstractText}</p>
      </div>
      <Button onClick={handleRequestDocument}>Request Document</Button>
    </Modal>
  );
};

export default ResearchModal;
