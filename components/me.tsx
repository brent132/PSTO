import { fetchMe } from "@/hooks/get-user-details";
import { useQuery } from "@tanstack/react-query";

export function CurrentUser() {
  const { data } = useQuery({
    queryKey: ["me"],
    queryFn: fetchMe,
  });

  return (
    <div>
      <h1 className="text-xs font-medium truncate max-w-40 sm:max-w-30">
        {data?.me?.firstName} {data?.me?.middleName ?? ""} {data?.me?.lastName}{" "}
        {data?.me?.suffix ?? ""}
      </h1>
      <p className="text-xs text-muted-foreground">{data?.me?.username}</p>
    </div>
  );
}
