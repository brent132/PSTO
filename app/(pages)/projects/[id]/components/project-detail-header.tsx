"use client";
import { useStickyActive } from "@/hooks/use-sticky-active";
import { useProject } from "../../hooks/use-project";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function ProjectDetailHeader({ id }: { id: string }) {
  const { data: project, isLoading } = useProject(id);
  const { ref, isStickyActive } = useStickyActive<HTMLDivElement>();
  const router = useRouter();

  return (
    <div
      ref={ref}
      className={`sticky top-0 z-10 px-2 py-2 flex flex-col gap-2 transition-colors duration-100 ${
        isStickyActive ? "bg-background shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between">
        <p className="text-lg font-medium capitalize">
          {isLoading
            ? "Loading..."
            : (project?.project_title ?? "No project found")}
        </p>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon-sm"
              onClick={() =>
                router.push(`/projects/${project?.id}/requirements`)
              }
              className="cursor-pointer"
            >
              <FileText className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>View requirements</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}
