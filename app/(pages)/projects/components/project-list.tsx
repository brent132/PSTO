"use client";
import { useProjects } from "../hooks/use-fetch-projects";
import { formatDateTime } from "@/hooks/date-format";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import EditProjectDialog from "./edit-project-dialog";
import DeleteProjectButton from "./delete-project-button";

export default function ProjectList({
  search,
  sort,
}: {
  search: string;
  sort: string;
}) {
  const [page, setPage] = useState(1);
  const { data: projects, isLoading } = useProjects(page, search, sort);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col gap-4 p-4 bg-brand-foreground">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Project title</TableHead>
            <TableHead className="flex items-center gap-2">
              Created at
            </TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects?.data?.map((project) => (
            <TableRow key={project.id}>
              <TableCell className="uppercase">
                {project.project_title}
              </TableCell>
              <TableCell>{formatDateTime(project.created_at)}</TableCell>
              <TableCell className="flex gap-2">
                <EditProjectDialog
                  id={project.id}
                  project_title={project.project_title}
                />
                <DeleteProjectButton id={project.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              size="icon-sm"
            />
          </PaginationItem>
          <PaginationItem>
            <span className="text-sm">
              Page {projects?.page} of {projects?.lastPage}
            </span>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              onClick={() =>
                setPage((p) => (projects && p < projects.lastPage ? p + 1 : p))
              }
              size="icon-sm"
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
