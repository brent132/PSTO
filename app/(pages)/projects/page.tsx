import { AddNewProject } from "./components/add-new-project";

export default function ProjectsPage() {
  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Projects</h1>
        <AddNewProject />
      </div>
    </div>
  );
}
