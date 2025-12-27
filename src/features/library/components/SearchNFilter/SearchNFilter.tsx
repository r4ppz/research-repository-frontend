import { ChevronDown, Search } from "lucide-react";
import Button from "@/components/common/Button/Button";
import Input from "@/components/common/Input/Input";
import style from "./SearchNFilter.module.css";

interface SearchNFilterProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  searchPlaceholder?: string;
}

const SearchNFilter = ({ searchQuery, onSearchChange, searchPlaceholder }: SearchNFilterProps) => {
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
      ></Input>

      <div className={style.filterButtonWrapper}>
        <Button className={style.filterButtons}>
          Departments
          <ChevronDown className={style.iconChevron} />
        </Button>
        <Button className={style.filterButtons}>
          Year
          <ChevronDown className={style.iconChevron} />
        </Button>
      </div>
    </section>
  );
};

export default SearchNFilter;
