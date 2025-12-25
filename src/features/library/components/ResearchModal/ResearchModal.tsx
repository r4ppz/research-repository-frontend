import Button from "@/components/common/Button/Button";
import Modal from "@/components/common/Modal/Modal";
import { type ResearchPaper } from "@/types";
import { formatDateLong } from "@/util/formatDate";
import style from "./ResearchModal.module.css";

interface ResearchModalProps {
  isOpen: boolean;
  researchPaper: ResearchPaper;
  onClose: () => void;
}

const ResearchModal = ({ isOpen, researchPaper, onClose }: ResearchModalProps) => {
  const formattedDate = formatDateLong(researchPaper.submissionDate);
  const department = researchPaper.department.departmentName;

  const handleRequestDocument = () => {
    alert(`TODO: add api call in here`);
  };

  return (
    <Modal className={style.modal} isOpen={isOpen} onClose={onClose}>
      <div className={style.infoWrapper}>
        <h1 className={style.title}>{researchPaper.title}</h1>
        <div className={style.authordateWrapper}>
          <p className={style.author}>{researchPaper.authorName}</p>
          <p className={style.date}>{formattedDate}</p>
        </div>
      </div>
      <div className={style.departmentContainer}>
        <p className={style.department}>{department}</p>
      </div>
      <div className={style.abstractWrapper}>
        <h3 className={style.abtractHeader}>Abstract</h3>
        <p className={style.abstractText}>{researchPaper.abstractText}</p>
      </div>
      <Button onClick={handleRequestDocument}>Request Document</Button>
    </Modal>
  );
};

export default ResearchModal;
