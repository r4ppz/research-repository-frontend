import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Button from "@/components/common/Button/Button";
import LoadingSpinner from "@/components/common/LoadingSpinner/LoadingSpinner";
import Footer from "@/components/layout/Footer/Footer";
import Header from "@/components/layout/Header/Header";
import ResearchCard from "@/features/library/components/ResearchCard/ResearchCard";
import ResearchModal from "@/features/library/components/ResearchModal/ResearchModal";
import { type ResearchPaper } from "@/types";
import SearchNFilter from "../components/SearchNFilter/SearchNFilter";
import { usePapers } from "../hooks/apiCalls/usePapers";
import style from "./LibraryPage.module.css";

const LibraryPage = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [selectedResearch, setSelectedResearch] = useState<ResearchPaper | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch papers with current filters
  const {
    papers,
    loading: papersLoading,
    error: papersError,
    pagination,
  } = usePapers({
    search: searchQuery,
    departmentIds: selectedDepartment ? [parseInt(selectedDepartment)] : [],
    year: selectedYear ? parseInt(selectedYear) : null,
    page: currentPage,
    size: 12,
  });

  // Reset to page 0 when filters change
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
    setSelectedResearch(null);
    setIsModalOpen(false);
  };

  const handleNextPage = () => {
    if (pagination && currentPage < pagination.totalPages - 1) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Wait for data fetching states
  const hasError = papersError;
  const isInitialLoading = papersLoading;

  if (isInitialLoading) {
    return (
      <div className={style.page}>
        <Header />
        <main className={style.main}>
          <div className={style.loadingContainer}>
            <LoadingSpinner message="Loading library..." />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (hasError) {
    return (
      <div className={style.page}>
        <Header />
        <main className={style.main}>
          <div className={style.container}>
            <p className={style.errorMessage}>Error: {papersError}</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Render the library page layout
  return (
    <div className={style.page}>
      <Header />
      <main className={style.main}>
        <div className={style.container}>
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

          {/* Search and Filter Section */}
          <SearchNFilter
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            selectedYear={selectedYear}
            onYearChange={handleYearChange}
            selectedDepartment={selectedDepartment}
            onDepartmentChange={handleDepartmentChange}
          />

          {/* Research Section */}
          <section className={style.researchSection}>
            {papers.length === 0 ? (
              <p className={style.emptyMessage}>No papers found. Try adjusting your filters.</p>
            ) : (
              papers.map((research) => (
                <ResearchCard
                  key={research.paperId}
                  researchPaper={research}
                  onView={() => {
                    setSelectedResearch(research);
                    setIsModalOpen(true);
                  }}
                />
              ))
            )}
          </section>

          {/* Pagination */}
          {pagination && pagination.totalPages > 1 && (
            <section className={style.paginationSection}>
              <Button
                className={style.pagingButton}
                onClick={handlePrevPage}
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
                onClick={handleNextPage}
                disabled={currentPage >= pagination.totalPages - 1}
              >
                Next
                <ChevronRight className={style.iconChevron} />
              </Button>
            </section>
          )}
        </div>
      </main>

      {/* Research Modal */}
      {selectedResearch && (
        <ResearchModal
          researchPaper={selectedResearch}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}

      <Footer />
    </div>
  );
};

export default LibraryPage;
