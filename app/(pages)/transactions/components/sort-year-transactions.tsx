import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SearchProjectsProps } from "@/types/projects";
import { useQuery } from "@tanstack/react-query";

async function fetchFiscalYears(): Promise<string[]> {
  const res = await fetch("/api/transactions/fetch-fiscal-years");
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Failed to fetch fiscal years");
  }

  return data;
}

export function SortYearTransactions({ value, onChange }: SearchProjectsProps) {
  const { data } = useQuery({
    queryKey: ["transaction-fiscal"],
    queryFn: fetchFiscalYears,
  });

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder="Fiscal year" />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="all">All years</SelectItem>
        {data?.map((year) => (
          <SelectItem key={year} value={year}>
            {year}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
