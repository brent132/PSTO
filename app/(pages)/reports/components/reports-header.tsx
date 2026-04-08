import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useStickyActive } from "@/hooks/use-sticky-active";
import { ReportsHeaderProps } from "@/types/reports";
import { FileText, SlidersHorizontal } from "lucide-react";

export function ReportsHeader({ onTabChange }: ReportsHeaderProps) {
  const { ref, isStickyActive } = useStickyActive<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`sticky top-0 z-10 px-2 py-2 flex flex-col gap-2 transition-colors duration-100 ${
        isStickyActive ? "bg-background shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Reports</h1>
        <TabsList variant="line">
          <TabsTrigger
            value="pre-built-reports"
            onClick={() => onTabChange("pre-built-reports")}
          >
            <FileText className="w-4 h-4" />{" "}
            <p className="text-xs">pre built reports</p>
          </TabsTrigger>
          <TabsTrigger
            value="custom-reports"
            onClick={() => onTabChange("custom-reports")}
          >
            <SlidersHorizontal className="w-4 h-4" />{" "}
            <p className="text-xs">custom reports</p>
          </TabsTrigger>
        </TabsList>
      </div>
    </div>
  );
}
