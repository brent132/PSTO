"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

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
      className="text-xs text-destructive flex items-center w-full justify-between"
    >
      {logoutMutation.isPending ? "Logging out..." : "Logout"}
      <LogOut className="text-destructive w-4 h-4" />
    </div>
  );
}
