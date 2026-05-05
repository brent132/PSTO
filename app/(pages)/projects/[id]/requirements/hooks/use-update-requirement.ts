import { updateRequirementPayload } from "@/types/requirements";
import { useMutation, useQueryClient } from "@tanstack/react-query";

async function updateRequirement({
  requirementId,
  requirement,
}: updateRequirementPayload) {
  const res = await fetch(
    `/api/projects/update-requirements/${requirementId}`,
    {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        requirement,
      }),
    },
  );

  if (!res.ok) {
    throw new Error("Failed to update requirement");
  }

  return res.json();
}

export function useUpdateRequirement() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateRequirement,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["requirement"],
      });
      queryClient.invalidateQueries({
        queryKey: ["project-requirements"],
      });
    },
  });
}
