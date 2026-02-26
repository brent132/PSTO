import { ChevronsUpDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { ModeToggle } from "./mode-toggle";
import { useTheme } from "next-themes";
import React from "react";

export const Footer = () => {
    const { resolvedTheme, setTheme } = useTheme()

  const toggleTheme = React.useCallback(() => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }, [resolvedTheme, setTheme])
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
              <h1 className="font-bold text-sm">John Doe</h1>
              <p className="text-xs font-medium text-muted-foreground">John_Doe@gmail.com</p>
            </div>
          </div>
          <ChevronsUpDown
            className="text-muted-foreground"
            width={20}
            height={20}
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={toggleTheme}>
            Toggle Theme <ModeToggle/>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
