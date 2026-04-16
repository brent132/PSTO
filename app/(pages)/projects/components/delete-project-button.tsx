"use client";
import { DeleteProjectProps } from "@/types/projects";
import { useDeleteProject } from "../hooks/use-delete-project";
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
import { Trash2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function DeleteProjectButton({ id }: DeleteProjectProps) {
  const { mutate, isPending } = useDeleteProject();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="icon-sm">
              <Trash2 className="w-4 h-4 text-destructive" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Delete project</p>
          </TooltipContent>
        </Tooltip>
      </AlertDialogTrigger>

      <AlertDialogContent className="max-w-sm">
        <AlertDialogHeader>
          <AlertDialogTitle>Delete project?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone.
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
