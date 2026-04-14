import { Response } from "@/types/projects";
import { useQuery } from "@tanstack/react-query";

async function fetchProjects(page: number, search: string): Promise<Response> {
  const res = await fetch(
    `/api/projects/fetch-projects?page=${page}&search=${encodeURIComponent(search)}`,
  );

  if (!res.ok) {
    throw new Error("Failed to fetch projects");
  }

  return res.json();
}

export function useProjects(page: number, search: string) {
  return useQuery({
    queryKey: ["projects", page, search],
    queryFn: () => fetchProjects(page, search),
  });
}
