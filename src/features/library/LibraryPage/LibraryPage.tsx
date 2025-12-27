import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import Button from "@/components/common/Button/Button";
import LoadingSpinner from "@/components/common/LoadingSpinner/LoadingSpinner";
import { FilterConfig } from "@/components/layout/DynamicFilter/FilterTypes";
import Footer from "@/components/layout/Footer/Footer";
import Header from "@/components/layout/Header/Header";
import SearchAndFilter from "@/components/layout/SearchAndFilter/SearchAndFilter";
import ResearchCard from "@/features/library/components/ResearchCard/ResearchCard";
import ResearchModal from "@/features/library/components/ResearchModal/ResearchModal";
import { usePagination } from "@/features/library/hooks/usePagination";
import { usePaperFilter } from "@/features/library/hooks/usePaperFilter";
import { MOCK_DEPARTMENTS, MOCK_YEARS } from "@/mocks/filterMocks";
import { MOCK_PAPERS } from "@/mocks/paperMocks";
import { type ResearchPaper } from "@/types";
import { extractApiError } from "@/util/errorHandler";
import style from "./LibraryPage.module.css";
import { getDepartments, getYears } from "../api/filter";
import { getPapers } from "../api/paper";

const LibraryPage = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(12); // Fixed items per page

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);

  const [selectedResearch, setSelectedResearch] = useState<ResearchPaper | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isLoading, setIsloading] = useState(false);

  const filteredPapers = usePaperFilter(MOCK_PAPERS, {
    searchQuery,
    selectedDepartment,
    selectedYear,
  });
  const pageData = usePagination(filteredPapers, currentPage, itemsPerPage);

  // testing api
  useEffect(() => {
    getYears()
      .then((years) => {
        console.log("API /api/filters/years result:", years);
      })
      .catch((error: unknown) => {
        const apiError = extractApiError(error);
        console.error("API /api/filters/years error:", apiError);
      });

    getDepartments()
      .then((departments) => {
        console.log("API /api/filters/departments result:", departments);
      })
      .catch((error: unknown) => {
        const apiError = extractApiError(error);
        console.error("API /api/filters/departments error:", apiError);
      });
  }, []);

  useEffect(() => {
    getPapers({
      search: "D",
    })
      .then((data) => {
        console.log("API /api/papers result:", data);
      })
      .catch((error: unknown) => {
        const apiError = extractApiError(error);
        console.error("API /api/papers error:", apiError);
      });
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const handleCloseModal = () => {
    setSelectedResearch(null);
    setIsModalOpen(false);
  };

  const handleNextPage = () => {
    if (pageData && currentPage < pageData.totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (isLoading) {
    return (
      <div className={style.loadingContainer}>
        <LoadingSpinner message="Loading research papers..." />
      </div>
    );
  }

  if (!pageData) {
    return (
      <div className={style.page}>
        <Header />
        <main className={style.main}>
          <p>Error loading research papers</p>
        </main>
        <Footer />
      </div>
    );
  }

  // Define filters for the search and filter component
  const filters: FilterConfig[] = [
    {
      type: "department",
      label: "Department",
      options: MOCK_DEPARTMENTS.map((dept) => ({
        value: dept.departmentName,
        label: dept.departmentName,
      })),
      value: selectedDepartment,
      onChange: setSelectedDepartment,
    },
    {
      type: "year",
      label: "Year",
      options: MOCK_YEARS.map((year) => ({
        value: year,
        label: year,
      })),
      value: selectedYear,
      onChange: setSelectedYear,
    },
  ];

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

          <SearchAndFilter
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            filters={filters}
            searchPlaceholder="Search paper title"
          />

          <section className={style.researchSection}>
            {pageData.content.length === 0 ? (
              <div className={style.emptyState}>
                <p>No research papers found</p>
              </div>
            ) : (
              pageData.content.map((research) => (
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

            {selectedResearch && (
              <ResearchModal
                researchPaper={selectedResearch}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
              />
            )}
          </section>

          {pageData.totalPages > 1 && (
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
                Page {currentPage + 1} of {pageData.totalPages}
              </p>

              <Button
                className={style.pagingButton}
                onClick={handleNextPage}
                disabled={currentPage >= pageData.totalPages - 1}
              >
                Next
                <ChevronRight className={style.iconChevron} />
              </Button>
            </section>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LibraryPage;
