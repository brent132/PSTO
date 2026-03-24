import { ProjectDialogFormProps, ProjectForm } from "@/types/projects";
import { format } from "date-fns";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { EMPTY_PROJECT_FORM, projectToForm } from "../hooks/project-to-form";
import { toast } from "sonner";
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
import { Input } from "@/components/ui/input";
import { formatMoneyOnBlur, formatWithCommas } from "@/hooks/number-format";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ChevronDownIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";

async function createProject(payload: ProjectForm) {
  const res = await fetch("/api/projects/insert-project", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("Failed adding new project");
  return res.json();
}

async function updateProject(id: number, payload: ProjectForm) {
  const res = await fetch("/api/projects/update-project", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, ...payload }),
  });
  if (!res.ok) throw new Error("Failed updating project");
  return res.json();
}

export function ProjectsDialogForm({
  mode,
  project,
  trigger,
}: ProjectDialogFormProps) {
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<ProjectForm>(() =>
    mode === "edit" && project ? projectToForm(project) : EMPTY_PROJECT_FORM,
  );

  const startDate = useMemo(
    () => (form.start_date ? new Date(form.start_date) : undefined),
    [form.start_date],
  );

  const endDate = useMemo(
    () => (form.end_date ? new Date(form.end_date) : undefined),
    [form.end_date],
  );

  function resetForm() {
    setForm(
      mode === "edit" && project ? projectToForm(project) : EMPTY_PROJECT_FORM,
    );
  }

  function handleOpenChanges(nextOpen: boolean) {
    setOpen(nextOpen);

    if (nextOpen) {
      resetForm();
    }

    if (!nextOpen) {
      mutation.reset();
    }
  }

  const mutation = useMutation({
    mutationFn: async (payload: ProjectForm) => {
      if (mode === "edit" && project) {
        return updateProject(project.id, payload);
      }

      return createProject(payload);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["projects"] });

      toast.success(
        <p className="text-success">
          {mode === "create"
            ? "Project created successfully"
            : "Project updated successfully"}
        </p>,
      );
      setOpen(false);
      resetForm();
    },
    onError: () => {
      toast.error(<p className="text-destructive">Something went wrong</p>);
    },
  });

  return (
    <Dialog open={open} onOpenChange={handleOpenChanges}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Create a new Project" : "Edit Project"}
          </DialogTitle>
          <DialogDescription className="text-xs">
            {mode === "create"
              ? "Set up a new project by filling in its basic information, budget, timeline, status, and manager details."
              : "Update the project information, budget, timeline, status, and manager details."}
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            mutation.mutate(form);
          }}
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col gap-2">
            <div>
              <label className="text-xs font-medium text-muted-foreground">
                Project Name
              </label>
              <Input
                value={form.project_name}
                onChange={(e) =>
                  setForm((p) => ({ ...p, project_name: e.target.value }))
                }
                type="text"
                className="text-xs"
                required
              />
            </div>

            <div className="flex gap-2">
              <div className="flex-1">
                <label className="text-xs font-medium text-muted-foreground">
                  Project Code
                </label>
                <Input
                  value={form.project_code}
                  onChange={(e) =>
                    setForm((p) => ({
                      ...p,
                      project_code: e.target.value.toUpperCase(),
                    }))
                  }
                  type="text"
                  required
                  className="uppercase text-xs"
                />
              </div>

              <div className="flex-1">
                <label className="text-xs font-medium text-muted-foreground">
                  Allocated Budget
                </label>
                <Input
                  value={form.budget}
                  type="text"
                  className="text-xs"
                  inputMode="decimal"
                  onChange={(e) => {
                    const raw = e.target.value.replace(/,/g, "");

                    if (/^\d*\.?\d{0,2}$/.test(raw)) {
                      setForm((p) => ({
                        ...p,
                        budget: formatWithCommas(raw),
                      }));
                    }
                  }}
                  onBlur={() => {
                    if (form.budget === "") return;

                    setForm((p) => ({
                      ...p,
                      budget: formatMoneyOnBlur(p.budget),
                    }));
                  }}
                  required
                />
              </div>
            </div>

            <div className="flex gap-2">
              <div className="flex flex-col flex-1">
                <label className="text-xs font-medium text-muted-foreground">
                  Start Date
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      data-empty={!startDate}
                      className="w-full justify-between text-left font-normal data-[empty=true]:text-muted-foreground text-xs"
                    >
                      {startDate ? (
                        format(startDate, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <ChevronDownIcon />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="center">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={(date) => {
                        setForm((prev) => ({
                          ...prev,
                          start_date: date ? date.toISOString() : "",
                        }));
                      }}
                      defaultMonth={startDate}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="flex flex-col flex-1">
                <label className="text-xs font-medium text-muted-foreground">
                  End Date
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      data-empty={!endDate}
                      className="w-full justify-between text-left font-normal data-[empty=true]:text-muted-foreground text-xs"
                    >
                      {endDate ? (
                        format(endDate, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <ChevronDownIcon />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="center">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={(date) => {
                        setForm((prev) => ({
                          ...prev,
                          end_date: date ? date.toISOString() : "",
                        }));
                      }}
                      defaultMonth={endDate}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs font-medium text-muted-foreground">
                  Fiscal Year
                </label>
                <Input
                  value={form.fiscal_year}
                  onChange={(e) =>
                    setForm((p) => ({
                      ...p,
                      fiscal_year: e.target.value.toUpperCase(),
                    }))
                  }
                  type="text"
                  className="uppercase text-xs"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-medium text-muted-foreground">
                  Status
                </label>
                <Select
                  value={form.status}
                  onValueChange={(value) =>
                    setForm((prev) => ({ ...prev, status: value }))
                  }
                >
                  <SelectTrigger className="w-full text-xs">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="Planning">Planning</SelectItem>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="On hold">On hold</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                      <SelectItem value="Cancelled">Cancelled</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-muted-foreground">
                Manager
              </label>
              <Input
                value={form.manager_name}
                onChange={(e) =>
                  setForm((p) => ({ ...p, manager_name: e.target.value }))
                }
                type="text"
                className="text-xs"
                required
              />
            </div>

            <div>
              <label className="text-xs font-medium text-muted-foreground">
                Description
              </label>
              <Textarea
                value={form.description}
                onChange={(e) =>
                  setForm((p) => ({ ...p, description: e.target.value }))
                }
                rows={4}
                required
                className="max-h-40 text-xs"
                style={{ scrollbarWidth: "none" }}
              />
            </div>
          </div>

          <DialogFooter>
            <div className="flex w-full justify-between">
              <DialogClose asChild>
                <Button type="button" variant="outline" className="text-xs">
                  Cancel
                </Button>
              </DialogClose>

              <Button
                type="submit"
                disabled={mutation.isPending}
                className="text-xs"
              >
                {mutation.isPending
                  ? mode === "create"
                    ? "Creating..."
                    : "Saving..."
                  : mode === "create"
                    ? "Create Project"
                    : "Save Changes"}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
