"use client";
import { TransactionsHeader } from "./components/transactions-header";
import { TransactionListView } from "./components/transactions-list-view";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Transactions() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const search = searchParams.get("q") ?? "";
  const status = searchParams.get("status") ?? "all";
  const fiscalYear = searchParams.get("fiscal_year") ?? "all";

  function updateParams(updates: Record<string, string>) {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (!value || value === "all") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname);
  }

  return (
    <div className="flex flex-col">
      <TransactionsHeader
        search={search}
        onSearchChange={(value) => updateParams({ q: value })}
        status={status}
        onStatusChange={(value) => updateParams({ status: value })}
        fiscalYear={fiscalYear}
        onFiscalYearChange={(value) => updateParams({ fiscal_year: value })}
      />
      <TransactionListView />
    </div>
  );
}
