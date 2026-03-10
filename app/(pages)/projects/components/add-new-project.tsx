import { ProjectProps } from "@/types/projects";
import { useState } from "react";

async function createProject(payload: ProjectProps) {
  const res = await fetch("/api/projects/insert-project", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  })
  if (!res.ok) throw new Error("Failed adding new project")
  return res.json();
}

export function AddNewProject() {
  const [form, setForm] = useState<ProjectProps>({
    project_code: "",
    project_name: "",
    fiscal_year: "",
    budget: ,
    start_date: "",
    end_date: "",
    status: "",
    description: "",
    manager_name: "",
  })
  return (

  );
}
