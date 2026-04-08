import HeaderProfileDropdown from "./header-profile-dropdown";
import { SidebarTrigger } from "./ui/sidebar";
import { NotificationsBell } from "@/app/(pages)/notifications/components/notifications-bell";

export const Header = () => {
  return (
    <div className="bg-background h-14 flex items-center px-4 border-b justify-between">
      <SidebarTrigger variant="ghost" />
      <div className="flex items-center gap-4">
        <HeaderProfileDropdown />
        <span className="border-r h-5"></span>
        <NotificationsBell />
      </div>
    </div>
  );
};
