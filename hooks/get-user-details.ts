import { Me } from "@/types/me";

export async function fetchMe(): Promise<Me> {
  const res = await fetch("/api/me", {
    method: "GET",
    credentials: "include",
  });
  if (!res.ok) return { ok: false, me: null };

  return res.json();
}
