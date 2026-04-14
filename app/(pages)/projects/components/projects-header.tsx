"use client";
import { useStickyActive } from "@/hooks/use-sticky-active";
import CreateProjectDialogForm from "./create-project-dialog-form";

export default function ProjectsHeader() {
  const { ref, isStickyActive } = useStickyActive<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`sticky top-0 z-10 px-2 py-2 flex flex-col gap-2 transition-colors duration-100 ${
        isStickyActive ? "bg-background shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between">
        <p className="text-lg font-medium">Projects</p>
        <CreateProjectDialogForm />
      </div>
    </div>
  );
}
