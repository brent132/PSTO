import { useStickyActive } from "@/hooks/use-sticky-active";
import { AddProject } from "./add-project";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProjectHeaderProps } from "@/types/projects";
import { Layers2, Table2 } from "lucide-react";
import { SearchProjects } from "./search-projects";
import { SortProjects } from "./sort-projects";
import { FiscalYearFilter } from "./fiscal-year-filter";

export function ProjectHeader({
  onTabChange,
  search,
  onSearchChange,
  status,
  onStatusChange,
  fiscalYear,
  onFiscalYearChange,
}: ProjectHeaderProps) {
  const { ref, isStickyActive } = useStickyActive<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`sticky top-0 z-10 px-4 py-2 flex flex-col gap-2 transition-colors duration-100 ${
        isStickyActive ? "bg-background shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Projects</h1>
        <div className="flex items-center gap-2">
          <TabsList>
            <TabsTrigger value="list" onClick={() => onTabChange("list")}>
              <Layers2 />
            </TabsTrigger>
            <TabsTrigger value="table" onClick={() => onTabChange("table")}>
              <Table2 />
            </TabsTrigger>
          </TabsList>
          <AddProject />
        </div>
      </div>
      <div className="flex w-full gap-2">
        <SearchProjects value={search} onChange={onSearchChange} />
        <SortProjects value={status} onChange={onStatusChange} />
        <FiscalYearFilter value={fiscalYear} onChange={onFiscalYearChange} />
      </div>
    </div>
  );
}
