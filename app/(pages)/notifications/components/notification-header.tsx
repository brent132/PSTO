"use client";
import { Button } from "@/components/ui/button";
import { useMarkAllNotificationsAsRead } from "../hooks/use-mark-all-notifications-as-read";
import { useStickyActive } from "@/hooks/use-sticky-active";

export function NotificationHeader() {
  const markAllAsRead = useMarkAllNotificationsAsRead();
  const { ref, isStickyActive } = useStickyActive<HTMLDivElement>();
  async function handleMarkAllAsRead() {
    try {
      await markAllAsRead.mutateAsync();
    } catch (error) {
      console.error("Failed to mark all notifications as read:", error);
    }
  }

  return (
    <div
      ref={ref}
      className={`sticky top-0 z-10 px-2 py-2 flex flex-col gap-2 transition-colors duration-100 ${
        isStickyActive ? "bg-background shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Notifications</h1>
        <Button
          onClick={handleMarkAllAsRead}
          disabled={markAllAsRead.isPending}
          className="text-xs"
        >
          {markAllAsRead.isPending ? "Marking..." : "Mark all as read"}
        </Button>
      </div>
    </div>
  );
}
