import { useMutation, useQueryClient } from "@tanstack/react-query";

async function markNotificationAsRead(recipientId: number) {
  const res = await fetch("/api/notifications/mark-as-read", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ recipientId }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Failed to mark notification as read");
  }

  return data;
}

export function useMarkNotificationAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: markNotificationAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
}
