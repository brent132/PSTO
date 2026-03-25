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
import { Badge } from "@/components/ui/badge";

export function NotificationListView() {
  const { data, isPending, error } = useNotifications();
  const markAsRead = useMarkNotificationAsRead();
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
    <div className="p-4">
      {data.map((item) => (
        <Card
          key={item.id}
          className={`cursor-pointer p-4 ${!item.is_read ? "border-primary" : ""}`}
          onClick={() => handleClick(item)}
        >
          <div className="flex flex-col gap-4">
            <div>
              <div className="flex items-center justify-between">
                <p className="text-xl font-bold">{item.notification.title}</p>
                <div className="flex items-center gap-2">
                  <Badge>{item.notification.priority}</Badge>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={(e) => handleDelete(e, item.id)}
                    className="text-destructive hover:text-destructive hover:bg-destructive/20"
                  >
                    <Trash className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <p className="text-xs text-muted-foreground font-medium">
                {item.notification.reference_type}
              </p>
            </div>
            <p className="p-2 bg-muted text-xs font-semibold">
              {item.notification.message}
            </p>
            <p className="text-xs font-medium">
              From: {item.notification.creator?.firstName}{" "}
              {item.notification.creator?.middleName}{" "}
              {item.notification.creator?.lastName}{" "}
              {item.notification.creator?.suffix}
            </p>
            <div className="flex justify-between text-muted-foreground text-xs">
              <p>{item.notification.type}</p>
              <p>{formatDateTime(item.notification.created_at)}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
