"use client";

import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Trash2 } from "lucide-react";
import { useDeleteRequirement } from "../hooks/use-delete-requirement";
import { DeleteRequirementButtonProps } from "@/types/requirements";

export default function DeleteRequirementButton({
  id,
}: DeleteRequirementButtonProps) {
  const { mutate, isPending } = useDeleteRequirement();

  return (
    <AlertDialog>
      <Tooltip>
        <AlertDialogTrigger asChild>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon-sm">
              <Trash2 className="w-4 h-4 text-destructive" />
            </Button>
          </TooltipTrigger>
        </AlertDialogTrigger>

        <TooltipContent>
          <p>Delete requirement</p>
        </TooltipContent>
      </Tooltip>

      <AlertDialogContent className="max-w-xs">
        <AlertDialogHeader>
          <AlertDialogTitle>Delete requirement?</AlertDialogTitle>
          <AlertDialogDescription>
            This will remove this requirement from the requirement list.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <AlertDialogAction
            onClick={() => mutate({ id })}
            disabled={isPending}
            variant="destructive"
          >
            {isPending ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
