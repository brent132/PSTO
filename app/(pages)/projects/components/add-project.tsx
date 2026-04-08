import { Button } from "@/components/ui/button";
import { ProjectsDialogForm } from "./projects-dialog-form";
import { Plus } from "lucide-react";

export function AddProject() {
  return (
    <ProjectsDialogForm
      mode="create"
      trigger={
        <Button className="text-xs" size="icon-sm">
          <Plus />
        </Button>
      }
    />
  );
}
