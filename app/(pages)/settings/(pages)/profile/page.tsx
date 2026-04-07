"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useQuery } from "@tanstack/react-query";
import { Pen } from "lucide-react";
import { AvatarUploader } from "./components/avatar-uploader";
import { useState } from "react";
import { fetchMe } from "@/hooks/get-user-details";

export default function ProfilePage() {
  const [open, setOpen] = useState(false);
  const { data } = useQuery({
    queryKey: ["me"],
    queryFn: fetchMe,
  });

  const avatarSrc = data?.me?.updated_at
    ? `/api/me/get-avatar?v=${encodeURIComponent(data.me.updated_at)}`
    : "/api/me/get-avatar";

  return (
    <div>
      <div className="flex flex-col text-center items-center gap-4">
        <div className="relative">
          <Avatar className="bg-primary/20 w-50 h-50 relative">
            <AvatarImage
              key={avatarSrc}
              src={avatarSrc}
              alt="Profile Picture"
              className="object-contain"
            />
          </Avatar>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="absolute bottom-0 right-0" asChild>
              <Button variant="outline" size="icon-sm">
                <Pen />
              </Button>
            </DialogTrigger>
            <DialogContent className="w-sm flex flex-col gap-8">
              <DialogTitle>Upload profile picture</DialogTitle>
              <AvatarUploader onClose={() => setOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
        <div>
          <h1 className="text-2xl font-bold capitalize">
            {data?.me?.firstName} {data?.me?.middleName} {data?.me?.lastName}
            {data?.me?.suffix}
          </h1>
          <div className="">
            <div>
              <label className="text-xs font-medium text-muted-foreground">
                Username
              </label>
              <p className="text-sm font-medium">{data?.me?.username}</p>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">
                Asigned as
              </label>
              <p className="text-sm font-medium">{data?.me?.role}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
