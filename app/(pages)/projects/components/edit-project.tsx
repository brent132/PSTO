import { Button } from "@/components/ui/button";
import { EditProjectProps } from "@/types/projects";
import { SquarePen } from "lucide-react";
import { ProjectDialogForm } from "./project-dialog-form";

export function EditProject({ project }: EditProjectProps) {
  return (
    <ProjectDialogForm
      key={project?.id}
      mode="edit"
      project={project}
      trigger={
        <Button variant="outline" size="icon">
          <SquarePen />
        </Button>
      }
    />
  );
}
