import { UpdateProjectRequirementPayload } from "@/types/requirements";
import { useMutation, useQueryClient } from "@tanstack/react-query";

async function updateProjectRequirement({
  projectId,
  requirementId,
  is_compiled,
  remarks,
}: UpdateProjectRequirementPayload) {
  const res = await fetch(
    `/api/projects/${projectId}/requirements/${requirementId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        is_compiled,
        remarks,
      }),
    },
  );

  if (!res.ok) {
    throw new Error("Error to update project requirement");
  }
}

export function useUpdateProjectRequirement() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: updateProjectRequirement,
    onSuccess: (_data, variables) => {
      qc.invalidateQueries({
        queryKey: ["project-requirements", variables.projectId],
      });
    },
  });
}
