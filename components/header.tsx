import { useQuery } from "@tanstack/react-query";
import { SidebarTrigger } from "./ui/sidebar";
import { fetchMe } from "@/hooks/get-user-details";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { NotificationsBell } from "@/app/(pages)/notifications/components/notifications-bell";

export const Header = () => {
  const { data } = useQuery({
    queryKey: ["me"],
    queryFn: fetchMe,
  });

  return (
    <div className="bg-background h-14 flex items-center px-4 border-b justify-between">
      <SidebarTrigger variant="ghost" />
      <div className="flex items-center gap-4">
        <div className="flex gap-4">
          <Avatar>
            <AvatarImage
              src={`/api/me/get-avatar?v=${data?.me?.updated_at ?? ""}`}
              alt="profile"
              className="object-cover"
            />
            <AvatarFallback>DT</AvatarFallback>
          </Avatar>
          <div className="flex flex-col max-w-15 min-w-15 truncate">
            <p className="text-xs font-medium capitalize">
              {data?.me?.firstName}
            </p>
            <p className="text-xs lowercase text-muted-foreground">
              {data?.me?.role}
            </p>
          </div>
        </div>
        <span className="border-r h-5"></span>
        <NotificationsBell />
      </div>
    </div>
  );
};
