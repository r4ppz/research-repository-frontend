import { useState } from "react";
import * as Checkbox from "@radix-ui/react-checkbox";
import * as Popover from "@radix-ui/react-popover";
import * as Select from "@radix-ui/react-select";
import { Check, ChevronDown, Search } from "lucide-react";
import Button from "@/components/common/Button/Button";
import Input from "@/components/common/Input/Input";
import style from "./SearchNFilter.module.css";

interface Department {
  departmentId: number;
  departmentName: string;
}

interface SearchNFilterProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  searchPlaceholder?: string;
  selectedDepartmentIds: number[];
  onDepartmentChange: (departmentIds: number[]) => void;
  selectedYear: number | null;
  onYearChange: (year: number | null) => void;
  departments: Department[];
  availableYears: number[];
}

const SearchNFilter = ({
  searchQuery,
  onSearchChange,
  searchPlaceholder,
  selectedDepartmentIds,
  onDepartmentChange,
  selectedYear,
  onYearChange,
  departments,
  availableYears,
}: SearchNFilterProps) => {
  const [departmentPopoverOpen, setDepartmentPopoverOpen] = useState(false);

  const handleDepartmentToggle = (departmentId: number, checked: boolean) => {
    if (checked) {
      onDepartmentChange([...selectedDepartmentIds, departmentId]);
    } else {
      onDepartmentChange(selectedDepartmentIds.filter((id) => id !== departmentId));
    }
  };

  const clearAllDepartments = () => {
    onDepartmentChange([]);
  };

  const getSelectedDepartmentLabel = (): string => {
    if (selectedDepartmentIds.length === 0) return "Departments";
    if (selectedDepartmentIds.length === 1) {
      const dept = departments.find((d) => d.departmentId === selectedDepartmentIds[0]);
      return dept ? dept.departmentName : "Departments";
    }
    return `${String(selectedDepartmentIds.length)} Departments`;
  };

  return (
    <section className={style.searchNfilterSection}>
      <Input
        type="search"
        icon={Search}
        placeholder={searchPlaceholder}
        value={searchQuery}
        onChange={(e) => {
          onSearchChange(e.target.value);
        }}
      />

      <div className={style.filterButtonWrapper}>
        {/* Department Filter */}
        <Popover.Root open={departmentPopoverOpen} onOpenChange={setDepartmentPopoverOpen}>
          <Popover.Trigger asChild>
            <Button
              className={`${style.filterButtons} ${selectedDepartmentIds.length > 0 ? style.hasSelection : ""}`}
              aria-label="Filter by departments"
            >
              {getSelectedDepartmentLabel()}
              {selectedDepartmentIds.length > 0 && <span className={style.selectionDot}>•</span>}
              <ChevronDown
                className={`${style.iconChevron} ${departmentPopoverOpen ? style.rotated : ""}`}
              />
            </Button>
          </Popover.Trigger>

          <Popover.Portal>
            <Popover.Content className={style.dropdownMenu} sideOffset={4} align="start">
              <div className={style.dropdownScrollArea}>
                <button
                  className={`${style.dropdownItem} ${selectedDepartmentIds.length === 0 ? style.selected : ""}`}
                  onClick={clearAllDepartments}
                >
                  All Departments
                </button>

                {departments.map((dept) => {
                  const isChecked = selectedDepartmentIds.includes(dept.departmentId);
                  return (
                    <label key={dept.departmentId} className={style.checkboxLabel}>
                      <Checkbox.Root
                        className={style.checkboxRoot}
                        checked={isChecked}
                        onCheckedChange={(checked) => {
                          handleDepartmentToggle(dept.departmentId, checked === true);
                        }}
                      >
                        <Checkbox.Indicator className={style.checkboxIndicator}>
                          <Check size={14} />
                        </Checkbox.Indicator>
                      </Checkbox.Root>
                      <span className={style.checkboxText}>{dept.departmentName}</span>
                    </label>
                  );
                })}
              </div>
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>

        {/* Year Filter */}
        <Select.Root
          value={selectedYear?.toString() || "all"}
          onValueChange={(value) => {
            onYearChange(value === "all" ? null : parseInt(value));
          }}
        >
          <Select.Trigger asChild>
            <Button
              className={`${style.filterButtons} ${selectedYear ? style.hasSelection : ""}`}
              aria-label="Filter by year"
            >
              <Select.Value placeholder="Year" />
              {selectedYear && <span className={style.selectionDot}>•</span>}
              <Select.Icon>
                <ChevronDown className={style.iconChevron} />
              </Select.Icon>
            </Button>
          </Select.Trigger>

          <Select.Portal>
            <Select.Content className={style.dropdownMenu} position="popper" sideOffset={4}>
              <Select.Viewport className={style.dropdownScrollArea}>
                <Select.Item value="all" className={style.dropdownItem}>
                  <Select.ItemText>All Years</Select.ItemText>
                  <Select.ItemIndicator className={style.selectIndicator}>
                    <Check size={16} />
                  </Select.ItemIndicator>
                </Select.Item>

                {availableYears.map((year) => (
                  <Select.Item key={year} value={year.toString()} className={style.dropdownItem}>
                    <Select.ItemText>{year}</Select.ItemText>
                    <Select.ItemIndicator className={style.selectIndicator}>
                      <Check size={16} />
                    </Select.ItemIndicator>
                  </Select.Item>
                ))}
              </Select.Viewport>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
      </div>
    </section>
  );
};

export default SearchNFilter;
