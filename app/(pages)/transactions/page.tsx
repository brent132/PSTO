"use client";
import { useState } from "react";
import { TransactionsHeader } from "./components/transactions-header";
import { TransactionListView } from "./components/transactions-list-view";

export default function Transactions() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [fiscalYear, setFiscalYear] = useState("all");

  return (
    <div className="flex flex-col">
      <TransactionsHeader
        search={search}
        onSearchChange={setSearch}
        status={status}
        onStatusChange={setStatus}
        fiscalYear={fiscalYear}
        onFiscalYearChange={setFiscalYear}
      />
      <TransactionListView
        search={search}
        status={status}
        fiscalYear={fiscalYear}
      />
    </div>
  );
}
