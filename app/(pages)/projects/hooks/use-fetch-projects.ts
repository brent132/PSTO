import { Response } from "@/types/projects";
import { useQuery } from "@tanstack/react-query";

async function fetchProjects(page: number): Promise<Response> {
  const res = await fetch(`/api/projects/fetch-projects?page=${page}`);

  if (!res.ok) {
    throw new Error("Failed to fetch projects");
  }

  return res.json();
}

export function useProjects(page: number) {
  return useQuery({
    queryKey: ["projects", page],
    queryFn: () => fetchProjects(page),
  });
}
