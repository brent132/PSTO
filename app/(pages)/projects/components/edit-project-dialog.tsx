"use client";
import { useState } from "react";
import { useUpdateProject } from "../hooks/use-update-project";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Pen } from "lucide-react";
import { Input } from "@/components/ui/input";
import { UpdateProjectProps } from "@/types/projects";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function EditProjectDialog({
  id,
  project_title,
}: UpdateProjectProps) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(project_title);

  const { mutate, isPending } = useUpdateProject();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    mutate(
      { id, project_title: title },
      {
        onSuccess: () => {
          setOpen(false);
        },
      },
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="icon-sm">
              <Pen className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Edit project</p>
          </TooltipContent>
        </Tooltip>
      </DialogTrigger>
      <DialogContent className="max-w-sm">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <DialogHeader>
            <DialogTitle>Edit Project</DialogTitle>
          </DialogHeader>

          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="uppercase text-sm"
          />

          <DialogFooter>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
