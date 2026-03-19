import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { formatMoneyOnBlur, formatWithCommas } from "@/hooks/number-format";
import { Category } from "@/types/categories";
import { ProjectForm } from "@/types/projects";
import { TransactionForm } from "@/types/transactions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { Calendar1, Plus } from "lucide-react";
import React from "react";
import { toast } from "sonner";

const initialForm: TransactionForm = {
  transaction_date: "",
  project_code: "",
  category_mode: "existing",
  category_id: "",
  new_category_name: "",
  voucher_no: "",
  particulars: "",
  amount: "",
  status: "",
  transaction_type: "",
  fiscal_year: "",
};

async function fetchCategories(): Promise<Category[]> {
  const res = await fetch("/api/categories/fetch-categories", {
    method: "GET",
    cache: "no-store",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Failed to fetch catogories");
  }

  return data;
}

async function fetchProjects(): Promise<ProjectForm[]> {
  const res = await fetch("/api/projects/get-project", {
    method: "GET",
    cache: "no-store",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || data.message || "Failed to fetch projects");
  }

  return data;
}

async function createTransaction(form: TransactionForm) {
  const payload = {
    transaction_date: form.transaction_date,
    project_code: form.project_code,
    category_mode: form.category_mode,
    category_id:
      form.category_mode === "existing" ? Number(form.category_id) : null,
    new_category_name:
      form.category_mode === "new" ? form.new_category_name : "",
    voucher_no: form.voucher_no,
    particulars: form.particulars,
    amount: form.amount,
    status: form.status,
    transaction_type: form.transaction_type,
    fiscal_year: form.fiscal_year,
  };

  const res = await fetch("/api/transactions/insert-transactions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Failed to create transaction");
  }

  return data;
}

export function TransactionsDialogForm() {
  const queryClient = useQueryClient();
  const [open, setOpen] = React.useState(false);
  const [form, setForm] = React.useState<TransactionForm>(initialForm);
  const transactionDate = form.transaction_date
    ? new Date(form.transaction_date)
    : undefined;

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const { data: projects } = useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });

  const mutation = useMutation({
    mutationFn: createTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["categories"] });

      toast.success("Transaction created successfully");
      setForm(initialForm);
      setOpen(false);
    },
    onError: () => {
      toast.error("Failed to create transaction");
    },
  });

  function handleOpenChange(value: boolean) {
    setOpen(value);

    if (!value) {
      setForm(initialForm);
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    mutation.mutate(form);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button size="icon-sm">
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add Transaction</DialogTitle>
          <DialogDescription>
            Fill in the Transaction details below
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <div>
              <label className="text-xs font-medium text-muted-foreground">
                Transaction Date
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    data-empty={!transactionDate}
                    className="w-full justify-between text-left font-normal data-[empty=true]:text-muted-foreground"
                  >
                    {transactionDate ? (
                      format(transactionDate, "PPP")
                    ) : (
                      <span></span>
                    )}
                    <Calendar1 />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="center">
                  <Calendar
                    mode="single"
                    selected={transactionDate}
                    onSelect={(date) => {
                      setForm((prev) => ({
                        ...prev,
                        transaction_date: date ? date.toISOString() : "",
                      }));
                    }}
                    defaultMonth={transactionDate}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs font-medium text-muted-foreground">
                  Project Code
                </label>
                <Select
                  value={form.project_code}
                  onValueChange={(value) =>
                    setForm((prev) => ({
                      ...prev,
                      project_code: value,
                    }))
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {projects?.map((project) => (
                      <SelectItem key={project.id} value={project.project_code}>
                        {project.project_code}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-xs font-medium text-muted-foreground">
                  Voucher No.
                </label>
                <Input
                  value={form.voucher_no}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      voucher_no: e.target.value,
                    }))
                  }
                />
              </div>

              <div>
                <label className="text-xs font-medium text-muted-foreground">
                  Amount
                </label>
                <Input
                  value={form.amount}
                  type="text"
                  className="text-sm"
                  inputMode="decimal"
                  onChange={(e) => {
                    const raw = e.target.value.replace(/,/g, "");

                    if (/^\d*\.?\d{0,2}$/.test(raw)) {
                      setForm((p) => ({
                        ...p,
                        amount: formatWithCommas(raw),
                      }));
                    }
                  }}
                  onBlur={() => {
                    if (form.amount === "") return;

                    setForm((p) => ({
                      ...p,
                      amount: formatMoneyOnBlur(p.amount),
                    }));
                  }}
                  required
                />
              </div>

              <div>
                <label className="text-xs font-medium text-muted-foreground">
                  Fiscal Year
                </label>
                <Input
                  value={form.fiscal_year}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      fiscal_year: e.target.value,
                    }))
                  }
                />
              </div>

              <div>
                <label className="text-xs font-medium text-muted-foreground">
                  Status
                </label>
                <Select
                  value={form.status}
                  onValueChange={(value) =>
                    setForm((prev) => ({
                      ...prev,
                      status: value,
                    }))
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Approved">Approved</SelectItem>
                    <SelectItem value="Paid">Paid</SelectItem>
                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                    <SelectItem value="Planned">Planned</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-xs font-medium text-muted-foreground">
                  Transaction Type
                </label>
                <Select
                  value={form.transaction_type}
                  onValueChange={(value) =>
                    setForm((prev) => ({
                      ...prev,
                      transaction_type: value,
                    }))
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Expense">Expense</SelectItem>
                    <SelectItem value="Income">Income</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <label className="text-xs font-medium text-muted-foreground">
                  Category Option
                </label>

                <RadioGroup
                  value={form.category_mode}
                  onValueChange={(value: "existing" | "new") =>
                    setForm((prev) => ({
                      ...prev,
                      category_mode: value,
                      category_id: "",
                      new_category_name: "",
                    }))
                  }
                  className="flex gap-6"
                >
                  <div className="flex items-center gap-2 text-xs">
                    <RadioGroupItem value="existing" id="category-existing" />
                    <label>Select Existing</label>
                  </div>

                  <div className="flex items-center gap-2 text-xs">
                    <RadioGroupItem value="new" id="category-new" />
                    <label>Create New</label>
                  </div>
                </RadioGroup>
              </div>
              {form.category_mode === "existing" ? (
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-medium text-muted-foreground">
                    Category
                  </label>
                  <Select
                    value={form.category_id}
                    onValueChange={(value) =>
                      setForm((prev) => ({
                        ...prev,
                        category_id: value,
                      }))
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories?.map((category) => (
                        <SelectItem
                          key={category.id}
                          value={String(category.id)}
                        >
                          {category.category_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-medium text-muted-foreground">
                    New Category Name
                  </label>
                  <Input
                    placeholder="Enter category name"
                    className="text-xs"
                    value={form.new_category_name}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        new_category_name: e.target.value,
                      }))
                    }
                  />
                </div>
              )}
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">
                Particulars
              </label>
              <Textarea
                className="max-h-30 text-xs"
                style={{ scrollbarWidth: "thin" }}
                value={form.particulars}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    particulars: e.target.value,
                  }))
                }
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={mutation.isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? "Saving..." : "Save Transaction"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
