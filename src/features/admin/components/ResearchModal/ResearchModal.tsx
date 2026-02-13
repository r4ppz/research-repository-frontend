import style from "./ResearchModal.module.css";
import { Dialog, DialogContent, DialogTitle } from "@/components/common/Dialog/Dialog";
import type { ResearchPaper } from "@/types";
import { formatDateLong } from "@/util/formatDate";

interface ResearchModalProps {
  isOpen: boolean;
  paper: ResearchPaper | null;
  onClose: () => void;
}

export const ResearchModal = ({ isOpen, paper, onClose }: ResearchModalProps) => {
  if (!paper) {
    return null;
  }

  const formattedDate = formatDateLong(paper.submissionDate);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent className={style.modal}>
        <div className={style.infoWrapper}>
          <DialogTitle className={style.title}>{paper.title}</DialogTitle>
          <div className={style.authordateWrapper}>
            <p className={style.author}>{paper.authorName}</p>
            <p className={style.date}>{formattedDate}</p>
          </div>
        </div>

        <div className={style.departmentArchivedContainer}>
          <div className={style.departmentContainer}>
            <p className={style.department}>{paper.department.departmentName}</p>
          </div>
          {paper.archived && (
            <div className={style.archivedContainer}>
              <p className={style.archived}>Archived</p>
            </div>
          )}
        </div>

        <div className={style.abstractWrapper}>
          <h3 className={style.abtractHeader}>Abstract</h3>
          <p className={style.abstractText}>{paper.abstractText}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
