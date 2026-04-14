"use client";
import { useState } from "react";
import ProjectList from "./components/project-list";
import ProjectsHeader from "./components/projects-header";

export default function ProjectsPage() {
  const [search, setSearch] = useState("");

  return (
    <div>
      <ProjectsHeader value={search} action={setSearch} />
      <ProjectList search={search} />
    </div>
  );
}
