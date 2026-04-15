import { DeleteProjectProps } from "@/types/projects";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

async function deleteProject(payload: DeleteProjectProps) {
  const res = await fetch("/api/projects/delete-projects", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Failed to delete project");
  }

  return res.json();
}

export function useDeleteProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProject,
    onSuccess: () => {
      toast.success("Project deleted");
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
    onError: () => {
      toast.error("Failed to delete project");
    },
  });
}
