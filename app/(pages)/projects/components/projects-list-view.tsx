"use client";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { formatDateTime } from "@/hooks/date-format";
import { formatMoney } from "@/hooks/number-format";
import { useQuery } from "@tanstack/react-query";
import {
  Calendar1,
  CalendarRange,
  Clock,
  EllipsisVertical,
  HandCoins,
  MoveRight,
  User,
} from "lucide-react";
import { EditProject } from "./edit-project";
import { DeleteProjectDialog } from "./delete-project-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { fetchProjects } from "../hooks/fetch-projects";
import { ProjectsListViewProps, statusProjectsStyles } from "@/types/projects";
import { Skeleton } from "@/components/ui/skeleton";

export function ProjectsListView({
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
      <div className="grid gap-4 p-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={index} className="flex flex-col gap-4 p-4">
            <div className="space-y-2">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-4 w-24" />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Skeleton className="h-14 w-full rounded-sm" />
              <Skeleton className="h-14 w-full rounded-sm" />
              <Skeleton className="h-14 w-full rounded-sm" />
            </div>

            <div className="space-y-2">
              <Skeleton className="h-4 w-28" />
              <div className="flex gap-2">
                <Skeleton className="h-14 flex-1 rounded-sm" />
                <Skeleton className="h-4 w-4 self-center" />
                <Skeleton className="h-14 flex-1 rounded-sm" />
              </div>
            </div>

            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-24 w-full rounded-sm" />
            </div>

            <Skeleton className="h-4 w-32 self-center" />
          </Card>
        ))}
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
    <div className="grid gap-4 p-4">
      {isFetching && (
        <p className="text-muted-foreground text-xs">Refreshing projects...</p>
      )}

      {data?.map((project) => (
        <Card key={project.id} className="flex flex-col gap-4 h-full p-4">
          <div>
            <div className="flex items-center justify-between">
              <h1 className="font-bold text-lg">{project.project_name}</h1>
              <div className="flex items-center gap-2">
                <Badge
                  className={`text-xs ${statusProjectsStyles[project.status] ?? "bg-muted text-muted-foreground"}`}
                >
                  {project.status}
                </Badge>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon-sm">
                      <EllipsisVertical />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-40" align="end">
                    <DropdownMenuGroup>
                      <div className="flex flex-col">
                        <EditProject project={project} />
                        <DeleteProjectDialog projectId={project.id} />
                      </div>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <p className="uppercase text-xs font-medium text-muted-foreground">
              {project.project_code}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center gap-2 bg-muted p-2 rounded-sm">
              <HandCoins className="w-4 h-4" />
              <div>
                <label className="text-xs font-medium text-muted-foreground">
                  Budget
                </label>
                <p className="text-xs font-semibold">
                  {formatMoney(project.budget)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-muted p-2 rounded-sm">
              <CalendarRange className="w-4 h-4" />
              <div>
                <label className="text-xs font-medium text-muted-foreground">
                  Fiscal Year
                </label>
                <p className="text-xs font-semibold">{project.fiscal_year}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-muted p-2 rounded-sm">
              <User className="w-4 h-4" />
              <div>
                <label className="text-xs font-medium text-muted-foreground">
                  Manager Name
                </label>
                <p className="text-xs font-semibold">{project.manager_name}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 w-full">
            <div className="flex gap-2 items-center">
              <Calendar1 className="w-4 h-4" />
              <h1 className="text-xs font-medium">Project Timeline</h1>
            </div>
            <div className="flex w-full gap-2 items-center">
              <div className="bg-muted flex-1 p-2 rounded-sm">
                <label className="text-xs font-medium text-muted-foreground">
                  Start Date
                </label>
                <p className="text-xs font-semibold">
                  {formatDateTime(project.start_date)}
                </p>
              </div>
              <MoveRight className="w-4 h-4" />
              <div className="bg-muted flex-1 p-2 rounded-sm">
                <label className="text-xs font-medium text-muted-foreground">
                  End Date
                </label>
                <p className="text-xs font-semibold">
                  {formatDateTime(project.end_date)}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-muted-foreground">
              Description
            </label>
            <p className="bg-muted p-2 max-h-30 h-30 rounded-sm text-muted-foreground text-xs">
              {project.description}
            </p>
          </div>

          <div className="text-muted-foreground text-xs font-medium flex gap-2 justify-center">
            <Clock className="w-4 h-4" />
            <p>{formatDateTime(project.created_at)}</p>
          </div>
        </Card>
      ))}
    </div>
  );
}
