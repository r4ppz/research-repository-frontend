import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "@/components/common/Button/Button";
import { Footer } from "@/components/layout/Footer/Footer";
import { Header } from "@/components/layout/Header/Header";
import { ResearchModal } from "@/components/layout/ResearchModal/ResearchModal";
import { SearchNFilter } from "@/features/library/components/SearchNFilter/SearchNFilter";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { useLibrary } from "../hooks/useLibrary";
import { LibraryResults } from "../components/LibraryResults/LibraryResults";
import style from "./LibraryPage.module.css";

export const LibraryPage = () => {
  const { state, handlers, papers, loading, error, pagination } = useLibrary();
  const [selectedPaperId, setSelectedPaperId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const pageRef = useRef<HTMLDivElement>(null);
  useScrollToTop(pageRef, [state.currentPage]);

  const handleOpenModal = (id: number) => {
    setSelectedPaperId(id);
    setIsModalOpen(true);
  };

  return (
    <div className={style.page} ref={pageRef}>
      <Header />
      <main className={style.main}>
        <div className={style.mainContainer}>
          <section>
            <h1 className={style.heroHeader}>Discover Academic Research</h1>
            <p className={style.mobileHeroText}>
              Explore a growing collection of academic research papers...
            </p>
            <p className={style.desktopHeroText}>
              Explore a growing collection of academic research papers and publications...
            </p>
          </section>

          <SearchNFilter
            searchQuery={state.searchQuery}
            onSearchChange={handlers.handleSearchChange}
            selectedYear={state.selectedYear}
            onYearChange={handlers.handleYearChange}
            selectedDepartment={state.selectedDepartment}
            onDepartmentChange={handlers.handleDepartmentChange}
          />

          <section className={style.researchSection}>
            <LibraryResults
              loading={loading}
              error={error}
              papers={papers}
              searchQuery={state.searchQuery}
              selectedDepartment={state.selectedDepartment}
              selectedYear={state.selectedYear}
              onViewPaper={handleOpenModal}
            />
          </section>

          {!loading && !error && pagination && pagination.totalPages > 1 && (
            <section className={style.paginationSection}>
              <Button
                className={style.pagingButton}
                onClick={handlers.goToPrevPage}
                disabled={state.currentPage === 0}
              >
                <ChevronLeft className={style.iconChevron} />
                Previous
              </Button>

              <p className={style.pagingIndicator}>
                Page {state.currentPage + 1} of {pagination.totalPages}
              </p>

              <Button
                className={style.pagingButton}
                onClick={handlers.goToNextPage}
                disabled={state.currentPage >= pagination.totalPages - 1}
              >
                Next
                <ChevronRight className={style.iconChevron} />
              </Button>
            </section>
          )}
        </div>
      </main>

      <ResearchModal
        paperId={selectedPaperId}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
      />
      <Footer />
    </div>
  );
};
