import { Button } from "@/components/ui/button";
import { ProjectDialogForm } from "./project-dialog-form";
import { Plus } from "lucide-react";

export function AddProject() {
  return (
    <ProjectDialogForm
      mode="create"
      trigger={
        <Button className="text-xs" size="icon-sm">
          <Plus />
        </Button>
      }
    />
  );
}
