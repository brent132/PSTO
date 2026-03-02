import { SidebarTrigger } from "./ui/sidebar";

export const Header = () => {
  return (
    <div className="bg-muted h-12 flex items-center px-4 shadow">
      <SidebarTrigger variant="ghost"/>
    </div>
  );
};
