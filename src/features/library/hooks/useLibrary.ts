import { useState } from "react";
import { usePapers } from "@/features/library/hooks/usePapers";
import { useDebounce } from "@/hooks/useDebounce";

export const useLibrary = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const queryResults = usePapers({
    search: debouncedSearchQuery,
    departmentId: selectedDepartment ?? undefined,
    year: selectedYear ?? undefined,
    page: currentPage,
    size: 12,
  });

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

  const goToNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };
  const goToPrevPage = () => {
    setCurrentPage((prev) => Math.max(0, prev - 1));
  };

  return {
    state: { searchQuery, selectedDepartment, selectedYear, currentPage },
    handlers: {
      handleSearchChange,
      handleYearChange,
      handleDepartmentChange,
      goToNextPage,
      goToPrevPage,
    },
    ...queryResults,
  };
};
