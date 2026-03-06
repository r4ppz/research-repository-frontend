import { SearchIcon } from "lucide-react";
import style from "./SearchNFilter.module.css";
import { FilterDepartmentButton } from "@/components/common/FilterDepartmentsButton/FilterDepartmentsButton";
import { FilterYearsButton } from "@/components/common/FilterYearsButton/FilterYearsButton";
import { Input } from "@/components/common/Input/Input";

interface SearchNFilterProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  searchPlaceholder?: string;
  selectedYear: string | null;
  onYearChange: (year: string | null) => void;
  selectedDepartment: string | null;
  onDepartmentChange: (departmentId: string | null) => void;
}

export const SearchNFilter = ({
  searchQuery,
  onSearchChange,
  searchPlaceholder = "Search...",
  selectedYear,
  onYearChange,
  selectedDepartment,
  onDepartmentChange,
}: SearchNFilterProps) => {
  return (
    <section className={style.searchNfilterSection}>
      {/* Search Input */}
      <Input
        icon={SearchIcon}
        type="search"
        placeholder={searchPlaceholder}
        value={searchQuery}
        onChange={(e) => {
          onSearchChange(e.target.value);
        }}
      />

      <div className={style.filterButtonGroup}>
        {/* Filter by Department */}
        <FilterDepartmentButton
          selectedDepartment={selectedDepartment}
          onDepartmentChange={onDepartmentChange}
        />

        {/* Filter by Year */}
        <FilterYearsButton selectedYear={selectedYear} onYearChange={onYearChange} />
      </div>
    </section>
  );
};
