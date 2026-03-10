import style from "../../LibraryPage/LibraryPage.module.css";
import { LoadingSpinner } from "@/components/common/LoadingSpinner/LoadingSpinner";
import { ResearchCard } from "@/features/library/components/ResearchCard/ResearchCard";
import { ResearchPaper } from "@/types";

interface LibraryResultsProps {
  loading: boolean;
  error: string | null;
  papers: ResearchPaper[];
  searchQuery: string;
  selectedDepartment: string | null;
  selectedYear: string | null;
  onViewPaper: (id: number) => void;
}

export const LibraryResults = ({ loading, error, papers, onViewPaper }: LibraryResultsProps) => {
  if (error) {
    return <p className={style.errorMessage}>Error: {error}</p>;
  }

  if (loading) {
    return (
      <div className={style.loadingContainer}>
        <LoadingSpinner message="Loading papers..." />
      </div>
    );
  }

  if (papers.length === 0) {
    return (
      <div className={style.emptyState}>
        <p> This silence is the most accurate answer we can provide.</p>
      </div>
    );
  }

  return (
    <>
      {papers.map((research) => (
        <ResearchCard
          key={research.paperId}
          researchPaper={research}
          onView={() => {
            onViewPaper(research.paperId);
          }}
        />
      ))}
    </>
  );
};
