import { CreateRequirementPayload, Requirement } from "@/types/requirements";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

async function createRequirement(
  payload: CreateRequirementPayload,
): Promise<Requirement> {
  const res = await fetch("/api/projects/insert-requirement", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Failed to create requirement");
  }

  return res.json();
}

export function useCreateRequirement() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createRequirement,
    onSuccess: () => {
      toast.success("requirement created");
      queryClient.invalidateQueries({ queryKey: ["requirements"] });
    },
    onError: () => {
      toast.error("Something went wrong, requirement already exist");
    },
  });
}
