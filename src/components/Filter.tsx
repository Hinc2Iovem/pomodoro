import { useState } from "react";
import { TaskStatusTypes } from "../types/TaskTypes";
import { FilterButton } from "./ui/Button";

type FilterTypes = {
  onFilterChange: React.Dispatch<React.SetStateAction<TaskStatusTypes | "all">>;
};

export default function Filter({ onFilterChange }: FilterTypes) {
  const [activeFilter, setActiveFilter] = useState<TaskStatusTypes | "all">("all");

  const handleFilterClick = (filter: TaskStatusTypes | "all") => {
    setActiveFilter(filter);
    onFilterChange(filter);
  };

  return (
    <div
      style={{
        display: "flex",
        gap: 5,
        marginTop: 20,
      }}
    >
      <FilterButton $active={activeFilter === "all"} onClick={() => handleFilterClick("all")}>
        Все
      </FilterButton>
      <FilterButton $active={activeFilter === "doing"} onClick={() => handleFilterClick("doing")}>
        В процессе
      </FilterButton>
      <FilterButton $active={activeFilter === "done"} onClick={() => handleFilterClick("done")}>
        Законченные
      </FilterButton>
    </div>
  );
}
