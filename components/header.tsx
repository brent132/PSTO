import { SidebarTrigger } from "./ui/sidebar";

export const Header = () => {
  return (
    <div className="h-12 flex items-center px-4 shadow">
      <SidebarTrigger variant="secondary"/>
    </div>
  );
};
