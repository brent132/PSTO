import { DeleteRequirementPayload } from "@/types/requirements";
import { useMutation, useQueryClient } from "@tanstack/react-query";

async function deleteRequirement({ id }: DeleteRequirementPayload) {
  const res = await fetch(`/api/projects/delete-requirements/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete requirement");
  }

  return res.json();
}

export function useDeleteRequirement() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteRequirement,
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
