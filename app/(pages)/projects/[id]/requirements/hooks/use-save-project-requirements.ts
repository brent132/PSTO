import { SavePayload } from "@/types/requirements";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useSaveProjectRequirements() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ projectId, items }: SavePayload) => {
      const res = await fetch(`/api/projects/${projectId}/requirements`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items }),
      });

      if (!res.ok) {
        throw new Error("Failed to save requirements");
      }

      return res.json();
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["project-requirements", variables.projectId],
      });
    },
  });
}
