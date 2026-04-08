import { NotificationItem } from "@/types/notifications";
import { useQuery } from "@tanstack/react-query";

async function fetchNotifications(): Promise<NotificationItem[]> {
  const res = await fetch("/api/notifications/fetch-notifications", {
    method: "GET",
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Failed to fetch notifications");
  }

  return data;
}

export function useNotifications() {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: fetchNotifications,
  });
}
