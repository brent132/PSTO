import { ChevronsUpDown } from "lucide-react";
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
import { CurrentUser } from "@/app/(pages)/dashboard/me";

export const Footer = () => {
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
