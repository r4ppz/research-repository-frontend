import { useState } from "react";
import { Archive, FilePlus2, RotateCcw } from "lucide-react";
import Button from "@/components/common/Button/Button";
import LoadingSpinner from "@/components/common/LoadingSpinner/LoadingSpinner";
import { FilterConfig } from "@/components/layout/DynamicFilter/FilterTypes";
import Footer from "@/components/layout/Footer/Footer";
import Header from "@/components/layout/Header/Header";
import SearchAndFilter from "@/components/layout/SearchAndFilter/SearchAndFilter";
import AddPaperModal from "@/features/admin/components/AddPaperModal/AddPaperModal";
import ResearchPaperTable from "@/features/admin/components/ResearchPaperTable/ResearchPaperTable";
import { useActivePaperFilter } from "@/features/admin/hooks/useActivePaperFilter";
import { useArchivedPaperFilter } from "@/features/admin/hooks/useArchivedPaperFilter";
import { useLoadingDelay } from "@/hooks/useLoadingDelay";
import { useModalBodyClass } from "@/hooks/useModalBodyClass";
import { MOCK_DEPARTMENTS, MOCK_YEARS } from "@/mocks/filterMocks";
import { MOCK_PAPERS } from "@/mocks/paperMocks";
import { type ResearchPaper } from "@/types";
import style from "./ResearchPage.module.css";

const ResearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"active" | "archived">("active");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useModalBodyClass(isModalOpen);

  const allPapers = MOCK_PAPERS;

  const activePapers = useActivePaperFilter(
    searchQuery,
    selectedDepartment,
    selectedYear,
    allPapers,
  );

  const archivedPapers = useArchivedPaperFilter(
    searchQuery,
    selectedDepartment,
    selectedYear,
    allPapers,
  );

  const handleCreate = () => {
    setIsModalOpen(true);
  };

  const handleEdit = (paperId: number) => {
    // TODO: Implement edit paper logic
    console.log(`Editing paper with ID: ${String(paperId)}`);
  };

  const handleArchive = (paperId: number) => {
    // TODO: Implement archive paper logic
    console.log(`Toggling archive status for paper with ID: ${String(paperId)}`);
  };

  const handleDelete = (paperId: number) => {
    // TODO: Implement delete paper logic
    console.log(`Deleting paper with ID: ${String(paperId)}`);
  };

  const handlePreview = (paper: ResearchPaper) => {
    // TODO: Implement preview paper logic
    console.log(`Previewing paper: ${paper.title}`);
  };

  const loading = useLoadingDelay();

  if (loading) {
    return (
      <div className={style.loadingContainer}>
        <LoadingSpinner message="Loading research papers..." />
      </div>
    );
  }

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
        <div className={style.mainContainer}>
          <div className={style.headerSection}>
            <h1 className={style.titleHeader}>Manage All Research Papers (Super Admin)</h1>
            <Button onClick={handleCreate} className={style.createButton}>
              <FilePlus2 className={style.iconTab} />
              Add Paper
            </Button>
          </div>

          <AddPaperModal
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
            }}
          />

          <div className={style.tabsContainer}>
            <Button
              variant={activeTab === "active" ? "primary" : "secondary"}
              className={style.tabButton}
              onClick={() => {
                setActiveTab("active");
              }}
            >
              <Archive className={style.iconTab} />
              Active Papers
            </Button>
            <Button
              variant={activeTab === "archived" ? "primary" : "secondary"}
              className={style.tabButton}
              onClick={() => {
                setActiveTab("archived");
              }}
            >
              <RotateCcw className={style.iconTab} />
              Archived Papers
            </Button>
          </div>

          <SearchAndFilter
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            filters={filters}
            searchPlaceholder="Search paper title"
          />

          <div className={style.tableSection}>
            <ResearchPaperTable
              papers={activeTab === "active" ? activePapers : archivedPapers}
              onEdit={handleEdit}
              onArchive={handleArchive}
              onDelete={handleDelete}
              onPreview={handlePreview}
              showDepartmentColumn={true}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ResearchPage;
