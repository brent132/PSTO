"use client";
import { UserPen } from "lucide-react";
import { useRouter } from "next/navigation";

const Sets = [
  { name: "Profile", href: "/settings/profile", icon: <UserPen /> },
];

export default function Settings() {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold">Settings</h1>
      {Sets.map((set, index) => (
        <div
          key={index}
          onClick={() => {
            router.push(set.href);
          }}
          className="cursor-pointer flex gap-2 border-b p-2"
        >
          {set.icon} <p>{set.name}</p>
        </div>
      ))}
    </div>
  );
}
