import { Eye } from "lucide-react";
import Button from "@/components/common/Button/Button";
import { type ResearchPaper } from "@/types";
import style from "./ResearchCard.module.css";

interface ResearchCardProps {
  researchPaper: ResearchPaper;
  onView: () => void;
}

const ResearchCard = ({ researchPaper, onView }: ResearchCardProps) => {
  const formattedDate = new Date(researchPaper.submissionDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const department = researchPaper.department.departmentName;

  return (
    <div className={style.card}>
      <div className={style.titleContainer}>
        <h1 className={style.title}>{researchPaper.title}</h1>
        <div className={style.authordateWrapper}>
          <p className={style.author}>{researchPaper.authorName}</p>
          <p className={style.date}>{formattedDate}</p>
        </div>
      </div>
      <div className={style.departmentArchivedContainer}>
        <div className={style.departmentContainer}>
          <p className={style.department}>{department}</p>
        </div>
        {researchPaper.archived && (
          <div className={style.archivedContainer}>
            <p className={style.archived}>Archived</p>
          </div>
        )}
      </div>
      <p className={style.abstract}>{researchPaper.abstractText}</p>
      <Button onClick={onView}>
        <Eye className={style.iconEye} />
        View Details
      </Button>
    </div>
  );
};

export default ResearchCard;
