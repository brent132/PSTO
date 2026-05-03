import { ProjectRequirementsResponse } from "@/types/requirements";
import { useQuery } from "@tanstack/react-query";

export function useProjectRequirements(projectId: string) {
  return useQuery<ProjectRequirementsResponse>({
    queryKey: ["project-requirements", projectId],
    queryFn: async () => {
      const res = await fetch(`/api/projects/${projectId}/requirements`);

      if (!res.ok) {
        throw new Error("Failed to fetch project requirement");
      }

      return res.json();
    },
    enabled: !!projectId,
  });
}
