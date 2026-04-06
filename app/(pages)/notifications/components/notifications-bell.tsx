import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell, Trash } from "lucide-react";
import { useNotifications } from "../hooks/use-notifications";
import { useMarkNotificationAsRead } from "../hooks/use-mark-notification-as-read";
import { useDeleteNotification } from "../hooks/use-delete-notification";
import { useRouter } from "next/navigation";
import { NotificationItem } from "@/types/notifications";
import { formatDateTime } from "@/hooks/date-format";
import { Badge } from "@/components/ui/badge";

export function NotificationsBell() {
  const { data } = useNotifications();
  const markAsRead = useMarkNotificationAsRead();
  const deleteNotification = useDeleteNotification();
  const router = useRouter();

  const unreadCount = data?.filter((item) => !item.is_read).length ?? 0;

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

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="relative">
          <Button
            size="icon-sm"
            variant="ghost"
            className="text-primary hover:text-primary hover:bg-primary/20"
          >
            <Bell />
          </Button>
          {unreadCount > 0 && (
            <span className="bg-destructive text-brand-foreground text-xs rounded-full absolute min-w-4 h-4 text-center top-0 right-0">
              {unreadCount > 99 ? "99+" : unreadCount}
            </span>
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-80 h-100"
        style={{ scrollbarWidth: "thin" }}
        align="end"
      >
        <DropdownMenuGroup className="flex flex-col gap-2 h-full justify-between">
          <DropdownMenuLabel className="text-xs">
            Notifications
          </DropdownMenuLabel>
          {data?.slice(0, 3).map((item) => (
            <DropdownMenuItem
              key={item.id}
              className={`cursor-pointer flex flex-col gap-2 shadow-sm p-2 rounded-sm ${!item.is_read ? "border-primary border" : ""}`}
              onClick={() => handleClick(item)}
            >
              <div>
                <div className="flex items-center justify-between">
                  <Badge>{item.notification.priority}</Badge>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={(e) => handleDelete(e, item.id)}
                    className=" hover:text-destructive hover:bg-destructive/20"
                  >
                    <Trash className="w-4 h-4 text-destructive" />
                  </Button>
                </div>

                <div>
                  <h1 className="font-bold">{item.notification.title}</h1>
                  <p className="text-muted-foreground text-xs font-medium">
                    {item.notification.reference_type}
                  </p>
                </div>

                <p className="text-xs font-medium p-2 rounded-sm">
                  {item.notification.message}
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatDateTime(item.notification.created_at)}
                </p>
              </div>
            </DropdownMenuItem>
          ))}
          <DropdownMenuItem
            className="text-primary cursor-pointer"
            onClick={() => router.push("/notifications")}
          >
            See all notification
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
