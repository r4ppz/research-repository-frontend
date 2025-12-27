import { useEffect, useState } from "react";
import * as Select from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";
import Button from "@/components/common/Button/Button";
import { Department } from "@/types";
import { getDepartments } from "../../api/filter";
import style from "./FilterDepartmentsButton.module.css";

interface FilterDepartmentButtonProps {
  selectedDepartment: string | null;
  onDepartmentChange: (departmentId: string | null) => void;
}

const FilterDepartmentButton = ({
  selectedDepartment,
  onDepartmentChange,
}: FilterDepartmentButtonProps) => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Fetch departments on mount
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        setLoading(true);
        const result = await getDepartments();
        setDepartments(result);
        setError(false);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    void fetchDepartments();
  }, []);

  // Map departments for use in the dropdown
  const options = departments.map((dept) => ({
    value: dept.departmentId.toString(),
    label: dept.departmentName,
  }));

  return loading ? (
    <Button className={style.triggerButton} disabled>
      Loading...
    </Button>
  ) : error ? (
    <Button className={style.triggerButton} disabled>
      Error loading departments
    </Button>
  ) : (
    <Select.Root
      value={selectedDepartment || "all"}
      onValueChange={(value) => {
        onDepartmentChange(value === "all" ? null : value);
      }}
    >
      {/* Trigger: Button style */}
      <Select.Trigger asChild>
        <Button className={style.triggerButton}>
          <span>
            {selectedDepartment
              ? options.find((opt) => opt.value === selectedDepartment)?.label || "All Departments"
              : "All Departments"}
          </span>
          <ChevronDown className={style.chevronIcon} />
        </Button>
      </Select.Trigger>

      {/* Dropdown Content */}
      <Select.Portal>
        <Select.Content className={style.dropdownContent} position="popper" sideOffset={4}>
          <Select.Viewport className={style.dropdownViewport}>
            {/* All Departments */}
            <Select.Item value="all" className={style.dropdownItem}>
              <Select.ItemText>All Departments</Select.ItemText>
              <Select.ItemIndicator className={style.dropdownIndicator}>
                <Check size={16} />
              </Select.ItemIndicator>
            </Select.Item>

            {/* Render Department Options */}
            {options.map((option) => (
              <Select.Item key={option.value} value={option.value} className={style.dropdownItem}>
                <Select.ItemText>{option.label}</Select.ItemText>
                <Select.ItemIndicator className={style.dropdownIndicator}>
                  <Check size={16} />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

export default FilterDepartmentButton;
