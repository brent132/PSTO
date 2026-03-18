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
import { Skeleton } from "@/components/ui/skeleton";

export function ProjectsTableView({
  search,
  status,
  fiscalYear,
}: ProjectsListViewProps) {
  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ["projects", search, status, fiscalYear],
    queryFn: () => fetchProjects({ search, status, fiscalYear }),
  });

  if (isLoading) {
    return (
      <div className="p-4">
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
            {Array.from({ length: 5 }).map((_, index) => (
              <TableRow key={index}>
                {Array.from({ length: 8 }).map((__, cellIndex) => (
                  <TableCell key={cellIndex}>
                    <Skeleton className="h-4 w-full max-w-30" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-sm text-destructive">
        Failed to load projects.
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex min-h-75 items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-lg font-semibold">No projects found</h2>
          <p className="text-muted-foreground text-sm">
            Try changing your search or filter.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background py-4">
      {isFetching && (
        <p className="text-muted-foreground mb-2 text-xs">
          Refreshing projects...
        </p>
      )}

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
    </div>
  );
}
