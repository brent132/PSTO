"use client";
import { useStickyActive } from "@/hooks/use-sticky-active";
import CreateProjectDialogForm from "./create-project-dialog-form";
import { Input } from "@/components/ui/input";
import { ProjectSearchProps } from "@/types/projects";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ProjectsHeader({
  value,
  action,
  sort,
  sortAction,
}: ProjectSearchProps) {
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
      <div className="flex gap-2">
        <Input
          placeholder="Search projects..."
          value={value}
          onChange={(e) => action(e.target.value)}
          className="text-sm"
        />
        <Select value={sort} onValueChange={sortAction}>
          <SelectTrigger className="min-w-25">
            <SelectValue placeholder="Select date" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="latest">Latest</SelectItem>
              <SelectItem value="old">Old</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
