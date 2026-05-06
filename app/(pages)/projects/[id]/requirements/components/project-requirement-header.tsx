import { useStickyActive } from "@/hooks/use-sticky-active";
import CreateRequirementForm from "./create-requirement-form";
import { ProjectRequirementHeaderProps } from "@/types/requirements";
import { Button } from "@/components/ui/button";
import { ListChecks } from "lucide-react";

export default function ProjectRequirementHeader({
  projectTitle,
  isEditing,
  isSaving,
  onEdit,
  onCancel,
  onSave,
}: ProjectRequirementHeaderProps) {
  const { ref, isStickyActive } = useStickyActive<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`sticky top-0 z-10 px-2 py-2 flex flex-col gap-2 transition-colors duration-100 ${
        isStickyActive ? "bg-background shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-lg font-medium capitalize">{projectTitle}</h1>
          <p className="text-sm text-muted-foreground">Requirement list</p>
        </div>

        <div className="flex items-center gap-2">
          {!isEditing ? (
            <>
              <Button size="icon-sm" onClick={onEdit}>
                <ListChecks className="w-4 h-4" />
              </Button>
            </>
          ) : (
            <>
              <Button size="sm" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
              <Button size="sm" onClick={onSave} disabled={isSaving}>
                {isSaving ? "Saving..." : "Save"}
              </Button>
            </>
          )}
          <CreateRequirementForm />
        </div>
      </div>
    </div>
  );
}
