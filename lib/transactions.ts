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

  category: {
    select: {
      id: true,
      category_name: true,
    },
  },

  creator: {
    select: {
      id: true,
      firstName: true,
      middleName: true,
      lastName: true,
      suffix: true,
    },
  },
} satisfies Prisma.TransactionsSelect;
