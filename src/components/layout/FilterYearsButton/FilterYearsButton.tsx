import * as Select from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";
import Button from "@/components/common/Button/Button";
import { useYears } from "@/features/library/hooks/useYears";
import style from "./FilterYearsButton.module.css";

interface FilterYearsButtonProps {
  selectedYear: string | null;
  onYearChange: (year: string | null) => void;
}

const FilterYearsButton = ({ selectedYear, onYearChange }: FilterYearsButtonProps) => {
  const { years } = useYears();

  return (
    <Select.Root
      value={selectedYear ?? "all"}
      onValueChange={(v) => {
        onYearChange(v === "all" ? null : v);
      }}
    >
      <Select.Trigger asChild>
        <Button>
          <div className={style.buttonContent}>
            {selectedYear && <span className={style.dotIndicator} />}
            <span>Year</span>
          </div>
          <ChevronDown className={style.chevronIcon} />
        </Button>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content className={style.dropdownContent} position="popper" sideOffset={4}>
          <Select.Viewport className={style.dropdownViewport}>
            <Select.Item value="all" className={style.dropdownItem}>
              <Select.ItemText>All Years</Select.ItemText>
              <Select.ItemIndicator className={style.dropdownIndicator}>
                <Check size={16} />
              </Select.ItemIndicator>
            </Select.Item>

            {years.map((year) => (
              <Select.Item key={year} value={year} className={style.dropdownItem}>
                <Select.ItemText>{year}</Select.ItemText>
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

export default FilterYearsButton;
