import { CreateProjectPayload, Project } from "@/types/projects";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

async function createProject(payload: CreateProjectPayload): Promise<Project> {
  const res = await fetch("/api/projects/insert-projects", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Failed to create project");
  }

  return res.json();
}

export function useCreateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      toast.success("Project created");
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
    onError: () => {
      toast.error("Something went wrong, try again later");
    },
  });
}
