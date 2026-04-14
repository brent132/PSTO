import { Project } from "@/types/projects";
import { useQuery } from "@tanstack/react-query";

async function fetchProjects(): Promise<Project[]> {
  const res = await fetch("/api/projects/fetch-projects");

  if (!res.ok) {
    throw new Error("Failed to fetch projects");
  }

  return res.json();
}

export function useProjects() {
  return useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });
}
