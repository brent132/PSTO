"use client";
import { useStickyActive } from "@/hooks/use-sticky-active";
import { AddTransactions } from "./add-transactions";

export function TransactionsHeader() {
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
    </div>
  );
}
