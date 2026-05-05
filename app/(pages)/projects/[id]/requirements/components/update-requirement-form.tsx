import { Button } from "@/components/ui/button";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { UpdateRequirementFormProps } from "@/types/requirements";
import { Pen } from "lucide-react";
import { useState } from "react";
import { useUpdateRequirement } from "../hooks/use-update-requirement";

export default function UpdateRequirementForm({
  requirementId,
  initialRequirement,
}: UpdateRequirementFormProps) {
  const [open, setOpen] = useState(false);
  const [requirement, setRequirement] = useState(initialRequirement);
  const { mutate, isPending } = useUpdateRequirement();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    mutate(
      {
        requirementId,
        requirement,
      },
      {
        onSuccess: () => {
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
            <Button size="icon-sm" variant="outline">
              <Pen className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
        </DialogTrigger>
        <TooltipContent>
          <p>Edit requirement</p>
        </TooltipContent>
      </Tooltip>

      <DialogContent className="max-w-sm">
        <form onSubmit={handleSubmit} className="flex min-w-0 flex-col gap-4">
          <DialogHeader>
            <DialogTitle>Edit requirement</DialogTitle>
            <DialogDescription>?</DialogDescription>
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
              {isPending ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
