import { Button } from "@/components/ui/button";
import { TransactionsDialogForm } from "./transactions-dialog-form";
import { Plus } from "lucide-react";

export function AddTransactions() {
  return (
    <TransactionsDialogForm
      mode="create"
      trigger={
        <Button className="text-xs" size="icon-sm">
          <Plus className="w-4 h-4" />
        </Button>
      }
    />
  );
}
