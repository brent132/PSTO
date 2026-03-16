import { ProjectHeader } from "./components/project-header";
import { ProjectsList } from "./components/projects-list";

export default function ProjectsPage() {
  return (
    <div className="flex flex-col">
      <ProjectHeader />
      <ProjectsList />
    </div>
  );
}
