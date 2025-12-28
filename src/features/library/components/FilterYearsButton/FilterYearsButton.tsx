import { useEffect, useState } from "react";
import * as Select from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";
import { getYears } from "@/api/filter";
import Button from "@/components/common/Button/Button";
import style from "./FilterYearsButton.module.css";

interface FilterYearsButtonProps {
  selectedYear: string | null;
  onYearChange: (year: string | null) => void;
}

function useYears() {
  const [years, set] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchYears = async () => {
      try {
        setLoading(true);
        const result = await getYears();
        set(result.map((y) => y.toString()));
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    void fetchYears();
  }, []);
  return { years, loading, error };
}

const FilterYearsButton = ({ selectedYear, onYearChange }: FilterYearsButtonProps) => {
  const { years, loading, error } = useYears();

  if (loading) return <Button disabled>Loading...</Button>;
  if (error) return <Button disabled>Error loading years</Button>;

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
            {selectedYear && <span className={style.dotIndicator}></span>}
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

            {years.map((y) => (
              <Select.Item key={y} value={y} className={style.dropdownItem}>
                <Select.ItemText>{y}</Select.ItemText>
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
