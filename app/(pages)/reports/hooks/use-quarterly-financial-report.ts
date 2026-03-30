import { QuarterlyFinancialReportResponse } from "@/types/reports";
import { useQuery } from "@tanstack/react-query";

async function fetchQuarterlyFinancialReport(
  fiscalYear: string,
): Promise<QuarterlyFinancialReportResponse> {
  const res = await fetch(
    `/api/reports/quarterly-financial?fiscalYear=${fiscalYear}`,
    {
      method: "GET",
      cache: "no-store",
    },
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(
      data.message || "Failed to generate quarterly financial report.",
    );
  }

  return data;
}

export function useQuarterlyFinancialReport(fiscalYear: string) {
  return useQuery({
    queryKey: ["quarterly-financial-report", fiscalYear],
    queryFn: () => fetchQuarterlyFinancialReport(fiscalYear),
    enabled: false,
  });
}
