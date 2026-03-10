"use client";
import { fetchMe } from "@/components/me";
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
import { AvatarUploader } from "../../components/avatar-uploader";

export default function ProfilePage() {
  const { data } = useQuery({
    queryKey: ["me"],
    queryFn: fetchMe,
  });

  return (
    <div>
      <div className="flex flex-col text-center items-center gap-4">
        <div className="relative">
          <Avatar className="bg-primary/20 w-50 h-50 relative">
            <AvatarImage
              src="/api/me/get-avatar"
              alt="Profile Picture"
              className="object-contain"
            />
          </Avatar>
          <Dialog>
            <DialogTrigger className="absolute bottom-0 right-0" asChild>
              <Button variant="outline" size="icon">
                <Pen />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>Upload profile picture</DialogTitle>
              <AvatarUploader />
            </DialogContent>
          </Dialog>
        </div>
        <div>
          <h1 className="text-2xl font-bold capitalize">
            {data?.me?.firstName} {data?.me?.middleName} {data?.me?.lastName}
            {data?.me?.suffix}
          </h1>
          <p className="text-muted-foreground">{data?.me?.username}</p>
        </div>
      </div>
    </div>
  );
}
