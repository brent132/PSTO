import React, { useState } from "react";
import { useCreateRequirement } from "../hooks/use-create-requirement";
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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

export default function CreateRequirementForm() {
  const [requirement, setRequirement] = useState("");
  const { mutate, isPending } = useCreateRequirement();
  const [open, setOpen] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    mutate(
      { requirement: requirement },
      {
        onSuccess: () => {
          setRequirement("");
          setOpen(false);
        },
      },
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Tooltip>
        <DialogTrigger asChild>
          <TooltipTrigger asChild>
            <Button size="icon-sm">
              <Plus className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
        </DialogTrigger>
        <TooltipContent>
          <p>Add a requirement</p>
        </TooltipContent>
      </Tooltip>

      <DialogContent className="max-w-sm">
        <form onSubmit={handleSubmit} className="flex min-w-0 flex-col gap-4">
          <DialogHeader>
            <DialogTitle>Create new requirement</DialogTitle>
            <DialogDescription>
              Create an iFund application requirements checklist
            </DialogDescription>
          </DialogHeader>

          <Textarea
            value={requirement}
            onChange={(e) => setRequirement(e.target.value)}
            placeholder="Enter Requirement"
            className="text-xs"
            required
          />

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Creating..." : "Create Requirement"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
