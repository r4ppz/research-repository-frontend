import { useMemo } from "react";
import { useAuth } from "@/features/auth/context/useAuth";
import { type ResearchPaper } from "@/types";

/**
 * Custom hook for filtering active (non-archived) research papers based on search query, department, and year
 * Department admins will only see papers from their department regardless of the selectedDepartment parameter
 * @param searchQuery The search query to filter papers by title
 * @param selectedDepartment The department to filter papers by (ignored for department admins)
 * @param selectedYear The year to filter papers by
 * @param papers The array of papers to filter
 * @returns Filtered array of active (non-archived) research papers
 */
export function useActivePaperFilter(
  searchQuery: string,
  selectedDepartment: string | null,
  selectedYear: string | null,
  papers: ResearchPaper[],
): ResearchPaper[] {
  const { user } = useAuth();

  return useMemo(() => {
    return papers.filter((paper) => {
      const matchesSearch = paper.title.toLowerCase().includes(searchQuery.toLowerCase());
      // Department admins only see papers from their department
      const matchesDepartment =
        !selectedDepartment ||
        (user?.role === "DEPARTMENT_ADMIN"
          ? paper.department.departmentName === user.department?.departmentName
          : paper.department.departmentName === selectedDepartment);
      const matchesYear = !selectedYear || paper.submissionDate.startsWith(selectedYear);

      // Only show non-archived papers for this filter by default
      return matchesSearch && matchesDepartment && matchesYear && !paper.archived;
    });
  }, [papers, searchQuery, selectedDepartment, selectedYear, user]);
}
