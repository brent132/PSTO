import { useQuery } from "@tanstack/react-query";
import { SidebarTrigger } from "./ui/sidebar";
import { fetchMe } from "@/hooks/get-user-details";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { NotificationsBell } from "@/app/(pages)/notifications/components/notifications-bell";

export const Header = () => {
  const { data } = useQuery({
    queryKey: ["me"],
    queryFn: fetchMe,
  });

  return (
    <div className="bg-background h-12 flex items-center px-4 shadow justify-between">
      <SidebarTrigger variant="ghost" />{" "}
      <div className="flex items-center gap-2">
        <Badge className="text-primary font-bold" variant="ghost">
          {data?.me?.role}
        </Badge>

        <Avatar>
          <AvatarImage
            src={`/api/me/get-avatar?v=${data?.me?.updated_at ?? ""}`}
            alt="profile"
            className="object-cover"
          />
          <AvatarFallback>DT</AvatarFallback>
        </Avatar>

        <NotificationsBell />
      </div>
    </div>
  );
};
