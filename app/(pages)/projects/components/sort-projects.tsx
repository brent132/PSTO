import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SearchProjectsProps } from "@/types/projects";

export function SortProjects({ value, onChange }: SearchProjectsProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder="Filter status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Status</SelectItem>
        <SelectItem value="Planning">Planning</SelectItem>
        <SelectItem value="Active">Active</SelectItem>
        <SelectItem value="On hold">On hold</SelectItem>
        <SelectItem value="Completed">Completed</SelectItem>
        <SelectItem value="Cancelled">Cancelled</SelectItem>
      </SelectContent>
    </Select>
  );
}
