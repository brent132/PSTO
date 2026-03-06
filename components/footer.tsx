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

export const Footer = () => {
  const route = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex justify-between items-center bg-muted p-2 rounded-sm">
          <div className="flex gap-2 items-center">
            <Avatar>
              <AvatarImage src="/LOGO.png" alt="profile" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <CurrentUser />
            </div>
          </div>
          <ChevronsUpDown
            className="text-muted-foreground"
            width={20}
            height={20}
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-50" align="end">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <button
              className="flex items-center gap-2 w-full text-xs"
              onClick={() => {
                route.push("/settings");
                route.refresh();
              }}
            >
              <Settings />
              <p>Settings</p>
            </button>
          </DropdownMenuItem>
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
