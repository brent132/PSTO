"use client";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { formatDateTime } from "@/hooks/date-format";
import { formatMoney } from "@/hooks/number-format";
import { ProjectProps } from "@/types/projects";
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
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

async function fetchProjects(): Promise<ProjectProps[]> {
  const res = await fetch("/api/projects/get-project");
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Failed to fetch projects");
  }

  return data;
}

export function ProjectsList() {
  const { data } = useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });
  return (
    <div className="grid gap-4 p-4">
      {data?.map((project) => (
        <Card key={project.id} className="flex flex-col gap-4 h-full p-4">
          <div>
            <div className="flex items-center justify-between">
              <h1 className="font-bold text-lg">{project.project_name}</h1>
              <div className="flex items-center gap-2">
                <Badge className="text-xs bg-success/20 text-success">
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
              <HandCoins width={20} height={20} />
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
              <CalendarRange width={20} height={20} />
              <div>
                <label className="text-xs font-medium text-muted-foreground">
                  Fiscal Year
                </label>
                <p className="text-xs font-semibold">{project.fiscal_year}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-muted p-2 rounded-sm">
              <User width={20} height={20} />
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
              <Calendar1 width={20} height={20} />
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
              <MoveRight width={16} height={16} />
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

          <div>
            <label className="text-xs font-medium text-muted-foreground">
              Description
            </label>
            <p className="bg-muted p-2 max-h-30 h-30 rounded-sm text-muted-foreground text-xs">
              {project.description}
            </p>
          </div>

          <div className="text-muted-foreground text-xs flex gap-2 justify-center">
            <Clock width={16} height={16} />
            <p>{formatDateTime(project.created_at)}</p>
          </div>
        </Card>
      ))}
    </div>
  );
}
