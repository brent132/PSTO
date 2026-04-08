import { NotificationHeader } from "./components/notification-header";
import { NotificationListView } from "./components/notifications-list-view";

export default function Notifications() {
  return (
    <div>
      <NotificationHeader />
      <NotificationListView />
    </div>
  );
}
