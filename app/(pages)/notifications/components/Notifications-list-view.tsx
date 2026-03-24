"use client";
import { Card } from "@/components/ui/card";
import { useNotifications } from "../hooks/use-notifications";
import { formatDateTime } from "@/hooks/date-format";
import { useRouter } from "next/navigation";
import { useMarkNotificationAsRead } from "../hooks/use-mark-notification-as-read";
import { NotificationItem } from "@/types/notifications";
import { useDeleteNotification } from "../hooks/use-delete-notification";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useMarkAllNotificationsAsRead } from "../hooks/use-mark-all-notifications-as-read";

export function NotificationListView() {
  const { data, isPending, error } = useNotifications();
  const markAsRead = useMarkNotificationAsRead();
  const markAllAsRead = useMarkAllNotificationsAsRead();
  const deleteNotification = useDeleteNotification();
  const router = useRouter();

  async function handleClick(item: NotificationItem) {
    try {
      if (!item.is_read) {
        await markAsRead.mutateAsync(item.id);
      }

      router.push(item.notification.action_url ?? "/projects");
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
      router.push(item.notification.action_url ?? "/projects");
    }
  }

  async function handleDelete(
    e: React.MouseEvent<HTMLButtonElement>,
    recipientId: number,
  ) {
    e.stopPropagation();

    try {
      await deleteNotification.mutateAsync(recipientId);
    } catch (error) {
      console.error("Failed to delete notification:", error);
    }
  }

  async function handleMarkAllAsRead() {
    try {
      await markAllAsRead.mutateAsync();
    } catch (error) {
      console.error("Failed to mark all notifications as read:", error);
    }
  }

  if (isPending) return <p>Loading...</p>;
  if (error) return <p>Failed to load notifications.</p>;

  if (!data || data.length === 0) {
    return (
      <div className="flex min-h-75 items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-lg font-semibold">No notifications found</h2>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Button onClick={handleMarkAllAsRead} disabled={markAllAsRead.isPending}>
        {markAllAsRead.isPending ? "Marking..." : "Mark all as read"}
      </Button>

      {data.map((item) => (
        <Card
          key={item.id}
          className={`cursor-pointer p-4 ${!item.is_read ? "border-primary bg-muted/40" : ""}`}
          onClick={() => handleClick(item)}
        >
          <div>
            <Button onClick={(e) => handleDelete(e, item.id)}>
              <Trash className="w-4 h-4" />
            </Button>
            <p>{item.notification.title}</p>
            <p>{item.notification.message}</p>
            <p>
              {item.notification.creator?.firstName}{" "}
              {item.notification.creator?.middleName}{" "}
              {item.notification.creator?.lastName}{" "}
              {item.notification.creator?.suffix}
            </p>
            <p>{item.notification.type}</p>
            <p>{item.notification.reference_type}</p>
            <p>{item.notification.priority}</p>
            <p>{formatDateTime(item.notification.created_at)}</p>
          </div>
        </Card>
      ))}
    </div>
  );
}
