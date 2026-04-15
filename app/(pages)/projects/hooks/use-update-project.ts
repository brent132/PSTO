import { UpdateProjectProps } from "@/types/projects";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

async function updateProject(Payload: UpdateProjectProps) {
  const res = await fetch("/api/projects/update-projects", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(Payload),
  });

  if (!res.ok) {
    throw new Error("Failed to update project");
  }

  return res.json();
}

export function useUpdateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProject,
    onSuccess: () => {
      toast.success("Project updated");
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
    onError: () => {
      toast.error("Failed to update project");
    },
  });
}
