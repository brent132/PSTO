import { ChevronsUpDown, Settings } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { ModeToggle } from "./mode-toggle";
import { LogoutButton } from "./logout-btn";
import { CurrentUser } from "@/components/me";
import { useRouter } from "next/navigation";
import { useSidebar } from "./ui/sidebar";
import { HandleItemClick } from "@/hooks/handle-item-click";

const DropItems1 = [
  { name: "Settings", icon: <Settings />, href: "/settings" },
];

export const Footer = () => {
  const route = useRouter();
  const { isMobile, setOpenMobile } = useSidebar();

  return (
    <DropdownMenu>
      <div className="mx-4 py-2 border-t">
        <DropdownMenuTrigger asChild>
          <div className="flex justify-between items-center hover:bg-muted cursor-pointer p-2 rounded-sm">
            <div className="flex gap-2 items-center">
              <Avatar>
                <AvatarImage
                  src="/api/me/get-avatar"
                  alt="profile"
                  className="object-cover"
                />
                <AvatarFallback>DT</AvatarFallback>
              </Avatar>
              <div>
                <CurrentUser />
              </div>
            </div>
            <ChevronsUpDown className="text-muted-foreground w-4 h-4" />
          </div>
        </DropdownMenuTrigger>
      </div>
      <DropdownMenuContent className="w-50" align="end">
        <DropdownMenuGroup>
          {DropItems1.map((DropItem) => (
            <DropdownMenuItem
              key={DropItem.name}
              onClick={() => {
                route.push(DropItem.href);
                HandleItemClick(isMobile, setOpenMobile);
              }}
            >
              <div className="justify-between flex w-full">
                <p className="text-xs">{DropItem.name}</p>
                {DropItem.icon}
              </div>
            </DropdownMenuItem>
          ))}
          <DropdownMenuItem>
            <ModeToggle />
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <LogoutButton />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
