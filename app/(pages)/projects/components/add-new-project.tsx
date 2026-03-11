"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ProjectForm } from "@/types/projects";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { formatDate } from "date-fns";
import { ChevronDownIcon, Plus } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

async function createProject(payload: ProjectForm) {
  const res = await fetch("/api/projects/insert-project", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed adding new project");
  return res.json();
}

export function AddNewProject() {
  const qc = useQueryClient();
  const [startDate, setStartDate] = React.useState<Date>();
  const [endDate, setEndDate] = React.useState<Date>();
  const [form, setForm] = useState<ProjectForm>({
    project_code: "",
    project_name: "",
    fiscal_year: "",
    budget: "",
    start_date: "",
    end_date: "",
    status: "",
    description: "",
    manager_name: "",
  });
  const mutation = useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["projects"],
      });
      setForm({
        project_code: "",
        project_name: "",
        fiscal_year: "",
        budget: "",
        start_date: "",
        end_date: "",
        status: "",
        description: "",
        manager_name: "",
      });
      setStartDate(undefined);
      setEndDate(undefined);
      toast.success(
        <p className="text-success">Project created succesfully</p>,
      );
    },
    onError: () => {
      toast.error(<p className="text-destructive">Something went wrong</p>);
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="text-xs">
          <Plus />
          Create project
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Create a new Project</DialogTitle>
          <DialogDescription className="text-xs">
            Set up a new project by filling in its basic information, budget,
            timeline, status, and manager details.
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
              <label className="text-xs text-muted-foreground">
                Project Name
              </label>
              <Input
                value={form.project_name}
                onChange={(e) =>
                  setForm((p) => ({ ...p, project_name: e.target.value }))
                }
                type="text"
                required
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">
                Project Code
              </label>
              <Input
                value={form.project_code}
                onChange={(e) =>
                  setForm((p) => ({ ...p, project_code: e.target.value }))
                }
                type="text"
                required
                className="uppercase"
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">
                Allocated Budget
              </label>
              <Input
                value={form.budget}
                onChange={(e) =>
                  setForm((p) => ({
                    ...p,
                    budget: e.target.value === "" ? "" : Number(e.target.value),
                  }))
                }
                type="number"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col">
                <label className="text-xs text-muted-foreground">
                  Start Date
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      data-empty={!startDate}
                      className="w-full justify-between text-left font-normal data-[empty=true]:text-muted-foreground"
                    >
                      {startDate ? (
                        formatDate(startDate, "PPP")
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
                        setStartDate(date);
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
              <div className="flex flex-col">
                <label className="text-xs text-muted-foreground">
                  End Date
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      data-empty={!endDate}
                      className="w-full justify-between text-left font-normal data-[empty=true]:text-muted-foreground"
                    >
                      {endDate ? (
                        formatDate(endDate, "PPP")
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
                        setEndDate(date);
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
                <label className="text-xs text-muted-foreground">
                  Fiscal Year
                </label>
                <Input
                  value={form.fiscal_year}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, fiscal_year: e.target.value }))
                  }
                  type="text"
                  className="uppercase"
                  required
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Status</label>
                <Select
                  value={form.status}
                  onValueChange={(value) =>
                    setForm((prev) => ({ ...prev, status: value }))
                  }
                >
                  <SelectTrigger className="w-full max-w-53">
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
              <label className="text-xs text-muted-foreground">Manager</label>
              <Input
                value={form.manager_name}
                onChange={(e) =>
                  setForm((p) => ({ ...p, manager_name: e.target.value }))
                }
                type="text"
                required
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">
                Description
              </label>
              <Textarea
                value={form.description}
                onChange={(e) =>
                  setForm((p) => ({ ...p, description: e.target.value }))
                }
                rows={4}
                required
                className="max-h-40"
                style={{ scrollbarWidth: "none" }}
              />
            </div>
          </div>
          <DialogFooter>
            <div className="flex w-full justify-between">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Create Project</Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
