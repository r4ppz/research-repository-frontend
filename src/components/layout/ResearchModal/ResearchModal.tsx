import clsx from "clsx";
import { Button } from "@/components/common/Button/Button";
import { Dialog, DialogContent, DialogTitle } from "@/components/common/Dialog/Dialog";
import { LoadingSpinner } from "@/components/common/LoadingSpinner/LoadingSpinner";
import { useAuth } from "@/features/auth/context/useAuth";
import { usePaperById } from "@/features/library/hooks/usePaperById";
import { formatDateLong } from "@/util/formatDate";
import { isUserStudent } from "@/util/roleBasedAccess";
import { usePaperRequest } from "./hook/usePaperRequest";
import style from "./ResearchModal.module.css";

interface ResearchModalProps {
  isOpen: boolean;
  paperId: number | null;
  onClose: () => void;
}

export const ResearchModal = ({ isOpen, paperId, onClose }: ResearchModalProps) => {
  const { paper, loading, error } = usePaperById(paperId);
  const { user } = useAuth();
  const { requestExists, isRequestLoading, requestDocument } = usePaperRequest(paperId, user);

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  if (loading) {
    return (
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogContent
          className={clsx(style.modalLoadingOrError, style.moda)}
          aria-describedby={undefined}
        >
          <LoadingSpinner message="Fetching details" />
        </DialogContent>
      </Dialog>
    );
  }

  if (error || !paper) {
    return (
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogContent
          className={clsx(style.modalLoadingOrError, style.modal)}
          aria-describedby={undefined}
        >
          <DialogTitle className={style.title}>Error</DialogTitle>
          <p>{error ?? "Paper not found"}</p>
          <Button onClick={onClose}>Close</Button>
        </DialogContent>
      </Dialog>
    );
  }

  const formattedDate = formatDateLong(paper.submissionDate);
  const department = paper.department.departmentName;

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className={style.modal} aria-describedby={undefined}>
        <div className={style.infoWrapper}>
          <DialogTitle className={style.title}>{paper.title}</DialogTitle>
          <div className={style.authordateWrapper}>
            <p className={style.author}>{paper.authorName}</p>
            <p className={style.date}>{formattedDate}</p>
          </div>
        </div>

        <div className={style.departmentArchivedContainer}>
          <div className={style.departmentContainer}>
            <p className={style.department}>{department}</p>
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

        {isUserStudent(user) && (
          <Button onClick={requestDocument} disabled={requestExists || isRequestLoading}>
            {requestExists ? "Request Submitted" : "Request Document"}
          </Button>
        )}
      </DialogContent>
    </Dialog>
  );
};
