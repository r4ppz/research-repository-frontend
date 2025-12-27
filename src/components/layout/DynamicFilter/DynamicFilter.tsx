import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import Button from "@/components/common/Button/Button";
import style from "./DynamicFilter.module.css";
import { FilterConfig } from "./FilterTypes";

interface DynamicFilterProps {
  filters: FilterConfig[];
}

const DynamicFilter = ({ filters }: DynamicFilterProps) => {
  const [activeFilterIndex, setActiveFilterIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setActiveFilterIndex(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleFilter = (index: number) => {
    setActiveFilterIndex(activeFilterIndex === index ? null : index);
  };

  return (
    <div className={style.container} ref={containerRef}>
      {filters.map((filter, index) => (
        <div key={filter.type} className={style.filterGroup}>
          <Button
            className={style.filterButton}
            onClick={() => {
              toggleFilter(index);
            }}
          >
            {filter.label} <ChevronDown className={style.iconChevron} />
          </Button>

          {activeFilterIndex === index && (
            <div className={style.options}>
              <button
                onClick={() => {
                  filter.onChange(null);
                  setActiveFilterIndex(null);
                }}
              >
                All
              </button>
              {filter.options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    filter.onChange(option.value);
                    setActiveFilterIndex(null);
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default DynamicFilter;
