import Input from "@/components/common/Input/Input";
import FilterDepartmentButton from "../FilterDepartmentsButton/FilterDepartmentsButton";
import FilterYearsButton from "../FilterYearsButton/FilterYearsButton";
import style from "./SearchNFilter.module.css";

interface SearchNFilterProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  searchPlaceholder?: string;
  selectedYear: string | null;
  onYearChange: (year: string | null) => void;
  selectedDepartment: string | null;
  onDepartmentChange: (departmentId: string | null) => void;
}

const SearchNFilter = ({
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

export default SearchNFilter;
