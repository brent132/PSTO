import { Input } from "@/components/ui/input";
import { SearchTransactionsProps } from "@/types/transactions";

export function SearchTransactions({
  value,
  onChange,
}: SearchTransactionsProps) {
  return (
    <div className="flex-1">
      <Input
        value={value}
        type="search"
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search project name"
        className="text-sm"
      />
    </div>
  );
}
