export type TransactionForm = {
  transaction_date: string;
  project_code: string;
  category_mode: "existing" | "new";
  category_id: string;
  new_category_name: string;
  voucher_no: string;
  particulars: string;
  amount: string;
  status: string;
  transaction_type: string;
  fiscal_year: string;
};

export type TransactionProps = {
  id: number;
  transaction_date: string;
  project_code: string;
  category_mode: "existing" | "new";
  category_id: string;
  new_category_name: string;
  voucher_no: string;
  particulars: string;
  amount: string;
  status: string;
  transaction_type: string;
  created_by: number;
  fiscal_year: string;
  created_at: string;
  updated_at: string;
  category?: {
    id: number;
    category_name: string;
  };
  creator?: {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
  };
};

export const statusTransactionsStyles: Record<string, string> = {
  Pending: "bg-status-planning-bg text-status-planning",
  Approved: "bg-status-active-bg text-status-active",
  Planned: "bg-status-on-hold-bg text-status-on-hold",
  Paid: "bg-status-completed-bg text-status-completed",
  Cancelled: "bg-status-cancelled-bg text-status-cancelled",
};

export type TransactionDialogFormProps = {
  mode: "create" | "edit";
  transaction?: TransactionProps;
  trigger: React.ReactNode;
};

export type EditTransactionProps = {
  transaction: TransactionProps;
};

export type DeleteTransactionDialogProps = {
  transactionId: number;
};

export type SearchTransactionsProps = {
  value: string;
  onChange: (value: string) => void;
};

export type TransactionHeaderProps = {
  search: string;
  onSearchChange: (value: string) => void;
  status: string;
  onStatusChange: (value: string) => void;
  fiscalYear: string;
  onFiscalYearChange: (value: string) => void;
};
