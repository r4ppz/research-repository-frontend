import { useEffect, useState } from "react";

import { getMyPaperRequest } from "@/api/paper";
import { createRequest } from "@/api/request";
import Button from "@/components/common/Button/Button";
import LoadingSpinner from "@/components/common/LoadingSpinner/LoadingSpinner";
import Modal from "@/components/common/Modal/Modal";
import { useAuth } from "@/features/auth/context/useAuth";
import { usePaperById } from "@/features/library/hooks/usePaperById";
import { extractApiError, getUserErrorMessage } from "@/util/errorHandler";
import { formatDateLong } from "@/util/formatDate";
import { isUserAdmin, isUserStudentOrTeacher } from "@/util/roleBasedAccess";

import style from "./ResearchModal.module.css";

interface ResearchModalProps {
  isOpen: boolean;
  paperId: number | null;
  onClose: () => void;
}

const ResearchModal = ({ isOpen, paperId, onClose }: ResearchModalProps) => {
  const [requestExists, setRequestExists] = useState<boolean>(false);
  const [isRequestLoading, setIsRequestLoading] = useState<boolean>(false);

  const { paper, loading, error } = usePaperById(paperId);
  const { user } = useAuth();

  useEffect(() => {
    if (isUserAdmin(user)) {
      return;
    }

    const checkRequestExists = async () => {
      if (paperId !== null) {
        try {
          await getMyPaperRequest(paperId);
          setRequestExists(true);
        } catch (error: unknown) {
          const apiError = extractApiError(error);
          console.log(getUserErrorMessage(apiError));
          setRequestExists(false);
        }
      } else {
        setRequestExists(false);
      }
    };

    void checkRequestExists();
  }, [paperId, user]);

  const requestDocument = async () => {
    if (isUserAdmin(user)) {
      return;
    }

    if (requestExists || isRequestLoading || !paperId) return;

    setIsRequestLoading(true);

    try {
      await createRequest({ paperId });
      setRequestExists(true);
    } catch (err: unknown) {
      console.error("Error creating request:", err);
    } finally {
      setIsRequestLoading(false);
    }
  };

  const handleRequestDocument = () => {
    void requestDocument();
  };

  if (loading) {
    return (
      <Modal className={style.modalLoadingOrError} isOpen={isOpen} onClose={onClose}>
        <LoadingSpinner message="Loading..." />
      </Modal>
    );
  }

  if (error || !paper) {
    return (
      <Modal className={style.modalLoadingOrError} isOpen={isOpen} onClose={onClose}>
        <p>{error ?? "Paper not found"}</p>
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
      {isUserStudentOrTeacher(user) && (
        <Button onClick={handleRequestDocument} disabled={requestExists || isRequestLoading}>
          {requestExists ? "Request Submitted" : "Request Document"}
        </Button>
      )}
    </Modal>
  );
};

export default ResearchModal;
