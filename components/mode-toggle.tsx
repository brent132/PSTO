"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";

export function ModeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  const toggleTheme = React.useCallback(() => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }, [resolvedTheme, setTheme]);

  return (
    <Button
      className="flex items-center w-full relative justify-between"
      onClick={toggleTheme}
      variant="ghost"
    >
      <p className="text-xs">Change theme</p>
      <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90 text-muted-foreground" />
      <Moon className="absolute right-3 h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0 text-muted-foreground" />
    </Button>
  );
}
