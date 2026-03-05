"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { Button } from "./ui/button";

async function logoutRequest() {
  const res = await fetch("/api/logout", {
    method: "POST",
  });
  const data = await res.json();
  if (!res.ok || !data.ok) throw new Error("Failed to logout");
}

export function LogoutButton() {
  const router = useRouter();

  const logoutMutation = useMutation({
    mutationFn: logoutRequest,
    onSuccess: () => {
      router.push("/login");
      router.refresh();
    },
  });

  return (
    <div
      onClick={() => logoutMutation.mutate()}
      className="text-xs text-destructive flex items-center justify-between w-full"
    >
      {logoutMutation.isPending ? "Logging out..." : "Logout"}
      <Button variant="ghost" size="icon-sm">
        <LogOut className="text-destructive" />
      </Button>
    </div>
  );
}
