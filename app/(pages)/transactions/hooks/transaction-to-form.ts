import { TransactionForm, TransactionProps } from "@/types/transactions";

export const EMPTY_TRANSACTION_FORM: TransactionForm = {
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

export function transactionToForm(
  transaction?: TransactionProps,
): TransactionForm {
  if (!transaction) return EMPTY_TRANSACTION_FORM;

  const categoryMode: "existing" | "new" =
    transaction.category_mode ?? (transaction.category_id ? "existing" : "new");

  return {
    transaction_date: transaction.transaction_date ?? "",
    project_code: transaction.project_code ?? "",
    category_mode: categoryMode,
    category_id:
      categoryMode === "existing" ? String(transaction.category_id ?? "") : "",
    new_category_name:
      categoryMode === "new" ? (transaction.new_category_name ?? "") : "",
    voucher_no: transaction.voucher_no ?? "",
    particulars: transaction.particulars ?? "",
    amount: transaction.amount ?? "",
    status: transaction.status ?? "",
    transaction_type: transaction.transaction_type ?? "",
    fiscal_year: transaction.fiscal_year ?? "",
  };
}
