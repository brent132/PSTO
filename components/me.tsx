import { Me } from "@/types/me";
import { useQuery } from "@tanstack/react-query";

async function fetchMe(): Promise<Me> {
  const res = await fetch("/api/me", {
    method: "GET",
    credentials: "include",
  });
  if (!res.ok) return { ok: false, me: null };

  return res.json();
}

export function CurrentUser() {
  const { data } = useQuery({
    queryKey: ["me"],
    queryFn: fetchMe,
  });

  return (
    <div>
      <h1 className="text-sm font-semibold truncate max-w-50">
        {data?.me?.firstName} {data?.me?.middleName ?? ""} {data?.me?.lastName}{" "}
        {data?.me?.suffix ?? ""}
      </h1>
      <p className="text-xs text-muted-foreground font-semibold">
        {data?.me?.username}
      </p>
    </div>
  );
}
