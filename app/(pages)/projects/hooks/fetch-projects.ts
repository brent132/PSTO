import { ProjectProps, ProjectsListViewProps } from "@/types/projects";

export async function fetchProjects({
  search = "",
  status = "all",
}: ProjectsListViewProps): Promise<ProjectProps[]> {
  const params = new URLSearchParams();

  if (search.trim()) {
    params.set("q", search.trim());
  }

  if (status && status !== "all") {
    params.set("status", status);
  }

  const queryString = params.toString();
  const url = queryString
    ? `/api/projects/filter?${queryString}`
    : "/api/projects/get-project";

  const res = await fetch(url);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Failed to fetch projects");
  }

  return data;
}
