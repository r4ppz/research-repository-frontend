import { useEffect, useState } from "react";
import * as Select from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";
import Button from "@/components/common/Button/Button"; // Your reusable button
import { getYears } from "../../api/filter"; // Year-fetching API
import style from "./FilterYearsButton.module.css";

interface FilterYearsButtonProps {
  selectedYear: string | null; // Current selected year
  onYearChange: (year: string | null) => void; // Callback for updates
}

const FilterYearsButton = ({ selectedYear, onYearChange }: FilterYearsButtonProps) => {
  const [years, setYears] = useState<string[]>([]); // Store years as strings
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Fetch years on mount
  useEffect(() => {
    const fetchYears = async () => {
      try {
        setLoading(true);
        const result = await getYears();
        setYears(result.map((year) => year.toString())); // Convert to string
        setError(false);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    void fetchYears();
  }, []);

  return loading ? (
    <Button className={style.triggerButton} disabled>
      Loading...
    </Button>
  ) : error ? (
    <Button className={style.triggerButton} disabled>
      Error loading years
    </Button>
  ) : (
    <Select.Root
      value={selectedYear || "all"}
      onValueChange={(value) => {
        onYearChange(value === "all" ? null : value);
      }}
    >
      {/* Trigger: Button style */}
      <Select.Trigger asChild>
        <Button className={style.triggerButton}>
          <span>{selectedYear || "All Years"}</span>
          <ChevronDown className={style.chevronIcon} />
        </Button>
      </Select.Trigger>

      {/* Dropdown Content */}
      <Select.Portal>
        <Select.Content className={style.dropdownContent} position="popper" sideOffset={4}>
          <Select.Viewport className={style.dropdownViewport}>
            {/* All Years */}
            <Select.Item value="all" className={style.dropdownItem}>
              <Select.ItemText>All Years</Select.ItemText>
              <Select.ItemIndicator className={style.dropdownIndicator}>
                <Check size={16} />
              </Select.ItemIndicator>
            </Select.Item>

            {/* Render Year Options */}
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
