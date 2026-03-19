import { Prisma } from "@prisma/client";

export const transactionsListSelect = {
  id: true,
  transaction_date: true,
  project_code: true,
  category_id: true,
  voucher_no: true,
  particulars: true,
  amount: true,
  status: true,
  transaction_type: true,
  created_by: true,
  fiscal_year: true,
  created_at: true,
  updated_at: true,
} satisfies Prisma.TransactionsSelect;
