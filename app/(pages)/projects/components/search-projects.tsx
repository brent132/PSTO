import { Input } from "@/components/ui/input";
import { SearchProjectsProps } from "@/types/projects";

export function SearchProjects({ value, onChange }: SearchProjectsProps) {
  return (
    <div className="flex-1">
      <Input
        value={value}
        type="search"
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search project name"
        className="text-sm"
      />
    </div>
  );
}
