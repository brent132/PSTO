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
