import ProjectRequirementHeader from "./components/project-requirement-header";
import RequirementList from "./components/requirement-list";

export default function ProjectRequirementPage() {
  return (
    <div className="flex flex-col gap-4">
      <ProjectRequirementHeader />
      <RequirementList />
    </div>
  );
}
