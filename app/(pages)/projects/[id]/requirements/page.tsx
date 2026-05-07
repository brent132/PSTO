"use client";
import { useParams } from "next/navigation";
import ProjectRequirementHeader from "./components/project-requirement-header";
import RequirementList from "./components/requirement-list";
import { useProjectRequirements } from "./hooks/use-fetch-project-requirements";

export default function ProjectRequirementPage() {
  const params = useParams();
  const projectId = String(params.id);
  const { data: requirements, isLoading } = useProjectRequirements(projectId);
  const rows = requirements?.data ?? [];
  const projectTitle =
    requirements?.project?.project_title ?? "Requirement list";

  return (
    <div className="flex flex-col gap-4">
      <ProjectRequirementHeader projectTitle={projectTitle} />
      <RequirementList
        projectId={projectId}
        rows={rows}
        isLoading={isLoading}
      />
    </div>
  );
}
