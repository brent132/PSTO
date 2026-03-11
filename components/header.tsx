import { useQuery } from "@tanstack/react-query";
import { SidebarTrigger } from "./ui/sidebar";
import { fetchMe } from "@/hooks/get-user-details";
import { Badge } from "./ui/badge";

export const Header = () => {
  const { data } = useQuery({
    queryKey: ["me"],
    queryFn: fetchMe,
  });

  return (
    <div className="bg-background h-12 flex items-center px-4 shadow justify-between">
      <SidebarTrigger variant="ghost" />{" "}
      <Badge className="text-primary font-bold" variant="ghost">
        {data?.me?.role}
      </Badge>
    </div>
  );
};
