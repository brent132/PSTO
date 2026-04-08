"use client";

import { EditCredentialsPayload } from "@/types/me";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useEditCredentials() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: EditCredentialsPayload) => {
      const res = await fetch("/api/settings/update-credentials", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to update profile");
      }

      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
      toast.success(data.message || "Profile updated successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update profile");
    },
  });
}
