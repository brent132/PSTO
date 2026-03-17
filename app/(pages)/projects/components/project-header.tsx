"use client";
import { useStickyActive } from "@/hooks/use-sticky-active";
import { AddProject } from "./add-project";

export function ProjectHeader() {
  const { ref, isStickyActive } = useStickyActive<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`sticky top-0 z-10 flex items-center justify-between px-4 py-2 transition-colors duration-100 ${
        isStickyActive ? "bg-background shadow-sm" : "bg-transparent"
      }`}
    >
      <h1 className="text-xl font-bold">Projects</h1>
      <AddProject />
    </div>
  );
}
