import { useStickyActive } from "@/hooks/use-sticky-active";
import CreateRequirementForm from "./create-requirement-form";
import { ProjectRequirementHeaderProps } from "@/types/requirements";

export default function ProjectRequirementHeader({
  projectTitle,
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

        <CreateRequirementForm />
      </div>
    </div>
  );
}
