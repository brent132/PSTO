"use client";
import { UserPen } from "lucide-react";
import { useRouter } from "next/navigation";

const Sets = [{ name: "Profile", href: "/settings/profile", icon: UserPen }];

export default function Settings() {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-3xl font-bold">Settings</h1>
      {Sets.map((set, index) => {
        const Icon = set.icon;

        return (
          <div
            key={index}
            onClick={() => router.push(set.href)}
            className="cursor-pointer flex items-center gap-2 border-b p-2"
          >
            <Icon className="w-4 h-4" />
            <p className="text-sm font-medium">{set.name}</p>
          </div>
        );
      })}
    </div>
  );
}
