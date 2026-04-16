"use client";
import { useState } from "react";
import ProjectList from "./components/project-list";
import ProjectsHeader from "./components/projects-header";

export default function ProjectsPage() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("latest");

  return (
    <div className="flex flex-col gap-4">
      <ProjectsHeader
        value={search}
        action={setSearch}
        sort={sort}
        sortAction={setSort}
      />
      <ProjectList search={search} sort={sort} />
    </div>
  );
}
