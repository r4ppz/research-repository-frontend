import { ChevronLeft, ChevronRight } from "lucide-react";
import { type ReactNode, useRef, useState } from "react";
import { Button } from "@/components/common/Button/Button";
import { LoadingSpinner } from "@/components/common/LoadingSpinner/LoadingSpinner";
import { Footer } from "@/components/layout/Footer/Footer";
import { Header } from "@/components/layout/Header/Header";
import { ResearchModal } from "@/components/layout/ResearchModal/ResearchModal";
import { ResearchCard } from "@/features/library/components/ResearchCard/ResearchCard";
import { useDebounce } from "@/hooks/useDebounce";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { SearchNFilter } from "../../components/SearchNFilter/SearchNFilter";
import { usePapers } from "../../hooks/usePapers";
import style from "./LibraryPage.module.css";

export const LibraryPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [selectedPaperId, setSelectedPaperId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Lifted page state to handle reset logic
  const [currentPage, setCurrentPage] = useState(0);

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  // Using tanstack query yay :)
  const { papers, error, pagination, loading } = usePapers({
    search: debouncedSearchQuery,
    departmentId: selectedDepartment ?? undefined,
    year: selectedYear ?? undefined,
    page: currentPage,
    size: 12,
  });

  const pageRef = useRef<HTMLDivElement>(null);
  useScrollToTop(pageRef, { trigger: currentPage, isLoading: loading });

  // Handlers updated to reset page
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(0);
  };

  const handleYearChange = (year: string | null) => {
    setSelectedYear(year);
    setCurrentPage(0);
  };

  const handleDepartmentChange = (departmentId: string | null) => {
    setSelectedDepartment(departmentId);
    setCurrentPage(0);
  };

  const handleCloseModal = () => {
    setSelectedPaperId(null);
    setIsModalOpen(false);
  };

  // Pagination triggers
  const goToNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };
  const goToPrevPage = () => {
    setCurrentPage((prev) => Math.max(0, prev - 1));
  };

  if (error) {
    return (
      <div className={style.page} ref={pageRef}>
        <Header />
        <main className={style.main}>
          <div className={style.mainContainer}>
            <p className={style.errorMessage}>Error: {error}</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  let researchContent: ReactNode;
  if (loading) {
    researchContent = (
      <div className={style.loadingContainer}>
        <LoadingSpinner message="Loading papers..." />
      </div>
    );
  } else if (papers.length === 0) {
    researchContent = (
      <div className={style.emptyState}>
        <p>No papers found matching your search :(</p>
      </div>
    );
  } else {
    researchContent = papers.map((research) => (
      <ResearchCard
        key={research.paperId}
        researchPaper={research}
        onView={() => {
          setSelectedPaperId(research.paperId);
          setIsModalOpen(true);
        }}
      />
    ));
  }

  return (
    <div className={style.page} ref={pageRef}>
      <Header />
      <main className={style.main}>
        <div className={style.mainContainer}>
          <section>
            <h1 className={style.heroHeader}>Discover Academic Research</h1>
            <p className={style.mobileHeroText}>
              Explore a growing collection of academic research papers and publications. Our library
              highlights the innovative work of students and faculty across departments.
            </p>
            <p className={style.desktopHeroText}>
              Explore a growing collection of academic research papers and publications. Our library
              highlights the innovative work of students and faculty across departments — advancing
              knowledge and inspiring new ideas
            </p>
          </section>

          <SearchNFilter
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            selectedYear={selectedYear}
            onYearChange={handleYearChange}
            selectedDepartment={selectedDepartment}
            onDepartmentChange={handleDepartmentChange}
          />

          <section className={style.researchSection}>{researchContent}</section>

          {!loading && pagination && pagination.totalPages > 1 && (
            <section className={style.paginationSection}>
              <Button
                className={style.pagingButton}
                onClick={goToPrevPage}
                disabled={currentPage === 0}
              >
                <ChevronLeft className={style.iconChevron} />
                Previous
              </Button>

              <p className={style.pagingIndicator}>
                Page {currentPage + 1} of {pagination.totalPages}
              </p>

              <Button
                className={style.pagingButton}
                onClick={goToNextPage}
                disabled={currentPage >= pagination.totalPages - 1}
              >
                Next
                <ChevronRight className={style.iconChevron} />
              </Button>
            </section>
          )}
        </div>
      </main>

      <ResearchModal paperId={selectedPaperId} isOpen={isModalOpen} onClose={handleCloseModal} />
      <Footer />
    </div>
  );
};
