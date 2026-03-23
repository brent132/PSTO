import { useStickyActive } from "@/hooks/use-sticky-active";
import { AddTransactions } from "./add-transactions";
import { TransactionHeaderProps } from "@/types/transactions";
import { SearchTransactions } from "./search-transactions";
import { SortStatusTransactions } from "./sort-status-transactions";
import { SortYearTransactions } from "./sort-year-transactions";

export function TransactionsHeader({
  search,
  onSearchChange,
  status,
  onStatusChange,
  fiscalYear,
  onFiscalYearChange,
}: TransactionHeaderProps) {
  const { ref, isStickyActive } = useStickyActive<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`sticky top-0 z-10 px-2 py-2 flex flex-col gap-2 transition-colors duration-100 ${
        isStickyActive ? "bg-background shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="flex justify-between">
        <h1 className="font-bold text-xl">Transactions</h1>
        <AddTransactions />
      </div>
      <div className="flex flex-col w-full gap-2">
        <SearchTransactions value={search} onChange={onSearchChange} />
        <div className="flex gap-2">
          <SortStatusTransactions value={status} onChange={onStatusChange} />
          <SortYearTransactions
            value={fiscalYear}
            onChange={onFiscalYearChange}
          />
        </div>
      </div>
    </div>
  );
}
