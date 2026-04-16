"use client";
import { useStickyActive } from "@/hooks/use-sticky-active";
import { useProject } from "../hooks/use-project";

export default function ProjectDetailHeader({ id }: { id: string }) {
  const { data: project, isLoading } = useProject(id);
  const { ref, isStickyActive } = useStickyActive<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`sticky top-0 z-10 px-2 py-2 flex flex-col gap-2 transition-colors duration-100 ${
        isStickyActive ? "bg-background shadow-sm" : "bg-transparent"
      }`}
    >
      <p className="text-lg font-medium capitalize">
        {isLoading
          ? "Loading..."
          : (project?.project_title ?? "No project found")}
      </p>
    </div>
  );
}
