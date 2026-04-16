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
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function ProjectList({
  search,
  sort,
}: {
  search: string;
  sort: string;
}) {
  const [page, setPage] = useState(1);
  const { data: projects, isLoading } = useProjects(page, search, sort);
  const router = useRouter();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col gap-4 p-4 bg-background">
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
            <TableRow
              key={project.id}
              onClick={() => router.push(`/projects/${project.id}`)}
              className="cursor-pointer"
            >
              <TableCell className="uppercase">
                {project.project_title}
              </TableCell>
              <TableCell>{formatDateTime(project.created_at)}</TableCell>
              <TableCell
                onClick={(e) => e.stopPropagation()}
                className="flex gap-2"
              >
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="icon-sm"
                      variant="outline"
                      onClick={() =>
                        router.push(`/projects/${project.id}/requirements`)
                      }
                    >
                      <FileText className="w-4 h-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>View requirements</p>
                  </TooltipContent>
                </Tooltip>

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
