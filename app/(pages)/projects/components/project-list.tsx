"use client";
import { useProjects } from "../hooks/use-fetch-projects";
import { formatDateTime } from "@/hooks/date-format";
import { Calendar } from "lucide-react";
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

export default function ProjectList() {
  const [page, setPage] = useState(1);
  const { data: projects, isLoading } = useProjects(page);

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
              <Calendar className="w-4 h-4" />
              Created on
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
              <TableCell>actions</TableCell>
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
