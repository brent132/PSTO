import { useMutation, useQueryClient } from "@tanstack/react-query";

async function deleteNotification(recipientId: number) {
  const res = await fetch("/api/notifications/delete", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ recipientId }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Failed to delete notification");
  }

  return data;
}

export function useDeleteNotification() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteNotification,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
}
