import { Project } from "@/types/projects";
import { useQuery } from "@tanstack/react-query";

async function fetchProject(id: string): Promise<Project> {
  const res = await fetch(`/api/projects/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch project");
  }

  return res.json();
}

export function useProject(id: string) {
  return useQuery({
    queryKey: ["project", id],
    queryFn: () => fetchProject(id),
    enabled: !!id && id !== "undefined",
  });
}
