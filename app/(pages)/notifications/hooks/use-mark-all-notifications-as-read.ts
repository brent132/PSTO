import { useMutation, useQueryClient } from "@tanstack/react-query";

async function markAllNotificationsAsRead() {
  const res = await fetch("/api/notifications/mark-all-as-read", {
    method: "PATCH",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Failed to mark all notifications as read");
  }

  return data;
}

export function useMarkAllNotificationsAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: markAllNotificationsAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
}
