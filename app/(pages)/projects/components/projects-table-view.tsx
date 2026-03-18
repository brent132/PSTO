"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchProjects } from "../hooks/fetch-projects";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDateTime } from "@/hooks/date-format";
import { ProjectsListViewProps } from "@/types/projects";

export function ProjectsTableView({ search, status }: ProjectsListViewProps) {
  const { data } = useQuery({
    queryKey: ["projects", search, status],
    queryFn: () => fetchProjects({ search, status }),
  });

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Project Name</TableHead>
          <TableHead>Code</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Budget</TableHead>
          <TableHead>Fiscal Year</TableHead>
          <TableHead>Manager Name</TableHead>
          <TableHead>Start Date</TableHead>
          <TableHead>End Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((project) => (
          <TableRow key={project.id} className="text-muted-foreground">
            <TableCell>{project.project_name}</TableCell>
            <TableCell>{project.project_code}</TableCell>
            <TableCell>{project.status}</TableCell>
            <TableCell>{project.budget}</TableCell>
            <TableCell>{project.fiscal_year}</TableCell>
            <TableCell>{project.manager_name}</TableCell>
            <TableCell>{formatDateTime(project.start_date)}</TableCell>
            <TableCell>{formatDateTime(project.end_date)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
