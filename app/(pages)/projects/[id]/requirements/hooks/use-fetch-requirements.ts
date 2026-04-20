import { RequirementsResponse } from "@/types/requirements";
import { useQuery } from "@tanstack/react-query";

async function fetchRequirements(): Promise<RequirementsResponse> {
  const res = await fetch("/api/projects/fetch-requirements");

  if (!res.ok) {
    throw new Error("Failed to fetch projects");
  }

  return res.json();
}

export function useRequirements() {
  return useQuery({
    queryKey: ["requirement"],
    queryFn: fetchRequirements,
  });
}
