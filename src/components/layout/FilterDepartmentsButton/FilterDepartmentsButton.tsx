import * as Select from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";

import Button from "@/components/common/Button/Button";
import { useDepartments } from "@/features/library/hooks/useDepartments";

import style from "./FilterDepartmentsButton.module.css";

interface FilterDepartmentButtonProps {
  selectedDepartment: string | null;
  onDepartmentChange: (departmentId: string | null) => void;
}

const FilterDepartmentButton = ({
  selectedDepartment,
  onDepartmentChange,
}: FilterDepartmentButtonProps) => {
  const { departments } = useDepartments();

  const options = departments.map((department) => ({
    value: department.departmentId.toString(),
    label: department.departmentName,
  }));

  return (
    <Select.Root
      value={selectedDepartment ?? "all"}
      onValueChange={(v) => {
        onDepartmentChange(v === "all" ? null : v);
      }}
    >
      <Select.Trigger asChild>
        <Button>
          <div className={style.buttonContent}>
            {selectedDepartment && <span className={style.dotIndicator}></span>}
            <span>Department</span>
          </div>
          <ChevronDown className={style.chevronIcon} />
        </Button>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content className={style.dropdownContent} position="popper" sideOffset={4}>
          <Select.Viewport className={style.dropdownViewport}>
            <Select.Item value="all" className={style.dropdownItem}>
              <Select.ItemText>All Departments</Select.ItemText>
              <Select.ItemIndicator className={style.dropdownIndicator}>
                <Check size={16} />
              </Select.ItemIndicator>
            </Select.Item>

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
