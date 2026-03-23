import { TransactionsHeader } from "./components/transactions-header";
import { TransactionList } from "./components/transactions-list";

export default function Transactions() {
  return (
    <div className="flex flex-col">
      <TransactionsHeader />
      <TransactionList />
    </div>
  );
}
