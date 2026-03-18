import { fetchMe } from "@/hooks/get-user-details";
import { useQuery } from "@tanstack/react-query";

export function CurrentUser() {
  const { data } = useQuery({
    queryKey: ["me"],
    queryFn: fetchMe,
  });

  return (
    <div>
      <h1 className="text-sm font-semibold truncate max-w-50 sm:max-w-40">
        {data?.me?.firstName} {data?.me?.middleName ?? ""} {data?.me?.lastName}{" "}
        {data?.me?.suffix ?? ""}
      </h1>
      <p className="text-xs text-muted-foreground font-medium">
        {data?.me?.username}
      </p>
    </div>
  );
}
