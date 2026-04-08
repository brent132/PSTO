import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell, Trash2 } from "lucide-react";
import { useNotifications } from "../hooks/use-notifications";
import { useMarkNotificationAsRead } from "../hooks/use-mark-notification-as-read";
import { useDeleteNotification } from "../hooks/use-delete-notification";
import { useRouter } from "next/navigation";
import { NotificationItem } from "@/types/notifications";
import { formatDateTime } from "@/hooks/date-format";

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
            className="hover:bg-transparent cursor-pointer"
          >
            <Bell className="text-muted-foreground" />
          </Button>
          {unreadCount > 0 && (
            <span className="bg-primary rounded-full absolute min-w-2 h-2 top-1 right-1"></span>
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-80 h-100 flex flex-col justify-between"
        style={{ scrollbarWidth: "thin" }}
        align="end"
      >
        <div className="flex items-center">
          <DropdownMenuLabel className="text-xs">
            Notifications
          </DropdownMenuLabel>
          {unreadCount >= 0 && (
            <span className="text-xs text-center text-primary">
              {unreadCount > 99 ? "99+" : unreadCount}
            </span>
          )}
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="flex flex-col h-full">
          {data?.slice(0, 3).map((item) => (
            <DropdownMenuItem
              key={item.id}
              className={`cursor-pointer flex flex-col gap-2 shadow-sm p-2 rounded-sm ${!item.is_read ? "border-primary border" : ""}`}
              onClick={() => handleClick(item)}
            >
              <div className="w-full flex flex-col gap-2">
                <div>
                  <div className="flex items-center justify-between">
                    <h1 className="font-medium">{item.notification.title}</h1>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={(e) => handleDelete(e, item.id)}
                    >
                      <Trash2 className="w-4 h-4 text-muted-foreground" />
                    </Button>
                  </div>
                  <p className="text-muted-foreground text-xs">
                    {item.notification.reference_type}
                  </p>
                </div>

                <p className="text-xs rounded-sm">
                  {item.notification.message}
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatDateTime(item.notification.created_at)}
                </p>
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-primary cursor-pointer text-xs"
          onClick={() => router.push("/notifications")}
        >
          See all notification
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
