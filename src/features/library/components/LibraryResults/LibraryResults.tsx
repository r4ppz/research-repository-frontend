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

export const LibraryResults = ({
  loading,
  error,
  papers,
  searchQuery,
  selectedDepartment,
  selectedYear,
  onViewPaper,
}: LibraryResultsProps) => {
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
    const isFiltering = searchQuery.trim().length > 0 || !!selectedDepartment || !!selectedYear;
    return (
      <div className={style.emptyState}>
        <p>
          {isFiltering
            ? "No papers found matching your search :("
            : "No research papers available at the moment."}
        </p>
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
