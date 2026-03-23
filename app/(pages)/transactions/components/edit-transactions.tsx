import { EditTransactionProps } from "@/types/transactions";
import { TransactionsDialogForm } from "./transactions-dialog-form";
import { Button } from "@/components/ui/button";
import { SquarePen } from "lucide-react";

export function EditTransactions({ transaction }: EditTransactionProps) {
  return (
    <TransactionsDialogForm
      key={transaction?.id}
      mode="edit"
      transaction={transaction}
      trigger={
        <Button variant="ghost" className="flex justify-between text-xs">
          <h1>Edit project</h1> <SquarePen />
        </Button>
      }
    />
  );
}
