import { useQuery } from "@tanstack/react-query";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { fetchMe } from "@/hooks/get-user-details";
import { Settings } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import { LogoutButton } from "./logout-btn";
import { useRouter } from "next/navigation";

export default function HeaderProfileDropdown() {
  const { data } = useQuery({
    queryKey: ["me"],
    queryFn: fetchMe,
  });
  const route = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar size="sm" className="cursor-pointer">
          <AvatarImage
            src={`/api/me/get-avatar?v=${data?.me?.updated_at ?? ""}`}
            alt="profile"
            className="object-cover"
          />
          <AvatarFallback>DT</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-60" align="end">
        <DropdownMenuGroup>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => {
              route.push("/settings/profile");
            }}
          >
            <div className="flex flex-col">
              <p className="text-xs font-medium capitalize max-w-55 min-w-55 truncate">
                {data?.me?.firstName} {data?.me?.middleName}{" "}
                {data?.me?.lastName} {data?.me?.suffix}
              </p>
              <p className="text-xs text-muted-foreground">{data?.me?.role}</p>
            </div>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="flex justify-between"
            onClick={() => {
              route.push("/settings");
            }}
          >
            <p className="text-xs">Settings</p>
            <Settings className="w-4 h-4" />
          </DropdownMenuItem>
          <DropdownMenuItem>
            <ModeToggle />
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <LogoutButton />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
