import { Bell } from "lucide-react";
import HeaderProfileDropdown from "./header-profile-dropdown";
import { SidebarTrigger } from "./ui/sidebar";

export const Header = () => {
  return (
    <div className="bg-primary h-14 flex items-center px-4 border-b justify-between">
      <SidebarTrigger variant="ghost" className="text-brand-foreground" />
      <div className="flex items-center gap-4">
        <HeaderProfileDropdown />
        <span className="border-r border h-5"></span>
        <Bell className="w-4 h-4 text-brand-foreground" />
      </div>
    </div>
  );
};
