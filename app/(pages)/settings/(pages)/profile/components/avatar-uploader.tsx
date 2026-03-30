import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import Image from "next/image";
import { ImageDown } from "lucide-react";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";

async function uploadAvatar(file: File) {
  // make form data
  const formData = new FormData();

  // must match: form.get("file") in your route
  formData.append("file", file);

  const res = await fetch("/api/me/avatar", {
    method: "POST",
    body: formData,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Upload failed");
  }

  return data;
}

type AvatarUploaderProps = {
  onClose: () => void;
};

export function AvatarUploader({ onClose }: AvatarUploaderProps) {
  const qc = useQueryClient();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const objecturlRef = useRef<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isdragging, setIsDragging] = useState(false);

  const mutation = useMutation({
    mutationFn: uploadAvatar,
    onSuccess: async () => {
      // refetch current user data if you have a "me" query
      await qc.invalidateQueries({ queryKey: ["me"] });
      toast(<p>Avatar uploaded successfully</p>);
      setFile(null);
      setPreviewUrl(null);
      onClose();
    },
    onError: () => {
      toast(<p>Upload Failed</p>);
    },
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // stop if no file
    if (!file) {
      toast(<p>Please select an Image first</p>);
      return;
    }

    mutation.mutate(file);
  }

  function handleFile(selected: File | null) {
    if (!selected) return;

    //simple client check
    const allowed = ["image/png", "image/jpeg", "image/webp"];
    if (!allowed.includes(selected.type)) {
      toast(<p>Only PNG, JPEG, and WebP are allowed</p>);
      return;
    }

    // clean old preview first
    if (objecturlRef.current) {
      URL.revokeObjectURL(objecturlRef.current);
    }

    // create new preview URL
    const url = URL.createObjectURL(selected);
    objecturlRef.current = url;

    setFile(selected);
    setPreviewUrl(url);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-center items-center gap-8"
    >
      <div>
        <input
          ref={inputRef}
          id="avatar"
          type="file"
          accept="image/png,image/jpeg,image/webp"
          className="hidden"
          onChange={(e) => {
            // get first selected file
            const selected = e.target.files?.[0] ?? null;
            handleFile(selected);
          }}
        />
        <div
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => {
            // allow dropping
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => {
            setIsDragging(false);
          }}
          onDrop={(e) => {
            // stop browser from opening file
            e.preventDefault();
            setIsDragging(false);

            const dropped = e.dataTransfer.files?.[0] ?? null;
            handleFile(dropped);
          }}
          className={`border-2 rounded-full overflow-hidden border-muted-foreground ${isdragging ? "border border-primary" : ""}`}
        >
          {previewUrl ? (
            <div className="w-30 h-30 aspect-square flex items-center justify-center relative self-center">
              <Image
                src={previewUrl}
                alt="Avatar preview"
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="w-30 h-30 flex flex-col items-center justify-center text-center gap-2">
              <ImageDown className="text-muted-foreground" />
              <p className="text-xs text-muted-foreground font-medium">
                Maximum (2mb)
              </p>
            </div>
          )}
        </div>
      </div>
      <DialogFooter className="w-full">
        <div className="flex justify-between">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            type="submit"
            disabled={mutation.isPending}
            className="w-fit cursor-pointer"
          >
            {mutation.isPending ? "Saving..." : "Save Avatar"}
          </Button>
        </div>
      </DialogFooter>
    </form>
  );
}
