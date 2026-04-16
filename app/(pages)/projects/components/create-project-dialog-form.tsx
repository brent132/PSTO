"use client";
import { FormEvent, useState } from "react";
import { useCreateProject } from "../hooks/use-create-project";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function CreateProjectDialogForm() {
  const [projectTitle, setProjectTitle] = useState("");
  const { mutate, isPending } = useCreateProject();
  const [open, setOpen] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    mutate(
      { project_title: projectTitle },
      {
        onSuccess: () => {
          setProjectTitle("");
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
            <Button size="icon-sm">
              <Plus className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Add a project</p>
          </TooltipContent>
        </Tooltip>
      </DialogTrigger>
      <DialogContent className="max-w-sm">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <DialogHeader>
            <DialogTitle>Create new project</DialogTitle>
            <DialogDescription>?</DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label>Project title</Label>
              <Input
                value={projectTitle}
                onChange={(e) => setProjectTitle(e.target.value)}
                placeholder="Project title"
                className="text-xs"
              />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Creating..." : "Create Project"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
