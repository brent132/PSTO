"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useQuery } from "@tanstack/react-query";
import { fetchMe } from "@/hooks/get-user-details";
import { EditCredentialsDialog } from "./components/edit-credentials-dialog";
import { AvatarUploader } from "./components/avatar-uploader";

export default function ProfilePage() {
  const { data } = useQuery({
    queryKey: ["me"],
    queryFn: fetchMe,
  });

  const avatarSrc = data?.me?.updated_at
    ? `/api/me/get-avatar?v=${encodeURIComponent(data.me.updated_at)}`
    : "/api/me/get-avatar";

  return (
    <div>
      <div className="flex flex-col text-center items-center gap-18">
        <div className="bg-primary/20 w-full h-50 relative">
          <div className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-1/2 bg-brand-foreground w-fit shadow rounded-full">
            <div className="relative">
              <Avatar className=" w-35 h-35 relative">
                <AvatarImage
                  key={avatarSrc}
                  src={avatarSrc}
                  alt="Profile Picture"
                  className="object-cover"
                />
              </Avatar>
              <AvatarUploader />
            </div>
          </div>
        </div>
        <div className="w-full px-4 flex flex-col gap-4">
          <div className="border-b w-full py-4 text-start">
            <h1 className="text-2xl font-medium capitalize">
              {data?.me?.firstName} {data?.me?.middleName} {data?.me?.lastName}
              {data?.me?.suffix}
            </h1>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col text-start">
              <label className="text-xs font-medium text-muted-foreground">
                Username
              </label>
              <p className="text-sm font-medium">{data?.me?.username}</p>
            </div>
            <div className="flex flex-col text-start">
              <label className="text-xs font-medium text-muted-foreground">
                Asigned as
              </label>
              <p className="text-sm font-medium">{data?.me?.role}</p>
            </div>
          </div>
          <EditCredentialsDialog
            user={{
              username: data?.me?.username,
              firstName: data?.me?.firstName,
              lastName: data?.me?.lastName,
              middleName: data?.me?.middleName,
              suffix: data?.me?.suffix,
            }}
          />
        </div>
      </div>
    </div>
  );
}
