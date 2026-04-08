import {
  TransactionProps,
  TransactionsListViewProps,
} from "@/types/transactions";

export async function fetchTransactions({
  search = "",
  status = "all",
  fiscalYear = "all",
}: TransactionsListViewProps): Promise<TransactionProps[]> {
  const params = new URLSearchParams();

  if (search.trim()) {
    params.set("q", search.trim());
  }

  if (status && status !== "all") {
    params.set("status", status);
  }

  if (fiscalYear && fiscalYear !== "all") {
    params.set("fiscal_year", fiscalYear);
  }

  const queryString = params.toString();
  const url = queryString
    ? `/api/transactions/filter?${queryString}`
    : "/api/transactions/fetch-transactions";

  const res = await fetch(url);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Failed to fetch transactions");
  }

  return data;
}
