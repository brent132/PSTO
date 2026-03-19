import { Button } from "@/components/ui/button";
import { EditProjectProps } from "@/types/projects";
import { SquarePen } from "lucide-react";
import { ProjectsDialogForm } from "./projects-dialog-form";

export function EditProject({ project }: EditProjectProps) {
  return (
    <ProjectsDialogForm
      key={project?.id}
      mode="edit"
      project={project}
      trigger={
        <Button variant="ghost" className="flex justify-between text-xs">
          <h1>Edit project</h1> <SquarePen />
        </Button>
      }
    />
  );
}
