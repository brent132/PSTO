"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuarterlyFinancialReport } from "../hooks/use-quarterly-financial-report";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Funnel } from "lucide-react";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 2,
  }).format(value);
}

function formatPercent(value: number) {
  return `${value.toFixed(2)}%`;
}

export function QuarterlyFinancialReport() {
  const [filter, setFilter] = useState("");
  const [dropdownValue, setDropdownValue] = useState("all");
  const [fiscalYear] = useState("2025");

  const {
    data: report,
    isFetching,
    isFetched,
    refetch,
  } = useQuarterlyFinancialReport(fiscalYear);

  const filteredRows = useMemo(() => {
    if (!report?.rows) return [];

    const search = filter.trim().toLowerCase();
    if (!search) return report.rows;

    return report.rows.filter((row) => {
      return (
        row.report_section.toLowerCase().includes(search) ||
        row.project_code.toLowerCase().includes(search) ||
        row.project_name.toLowerCase().includes(search) ||
        row.quarter.toLowerCase().includes(search) ||
        row.categories_used.toLowerCase().includes(search)
      );
    });
  }, [report, filter]);

  return (
    <div className="flex flex-col gap-4 p-4">
      <div>
        <h1 className="text-lg font-semibold">Quarterly Financial Report</h1>
        <p className="text-sm text-muted-foreground">
          Quarter-by-quarter budget utilization, spending analysis, and
          comparisons
        </p>
      </div>

      <div className="flex gap-2">
        <div className="flex-1">
          <Select>
            <SelectTrigger
              value={dropdownValue}
              onChange={(e) => setDropdownValue(e.target.value)}
              className="w-full"
            >
              <SelectValue placeholder="select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="project-summary">
                Project Quarterly Summary
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button
          onClick={() => refetch()}
          disabled={isFetching}
          className="text-xs"
        >
          {isFetching ? "Generating..." : "Generate Report"}
        </Button>
      </div>

      {report ? (
        <Card className="p-4">
          <div className="flex flex-col gap-2">
            <div>
              <h2 className="text-lg font-medium">Report Table</h2>
              <p className="text-sm text-muted-foreground">
                Fiscal Year: {report.filters.fiscalYear} • Rows:{" "}
                {report.rows.length}
              </p>
            </div>

            <InputGroup>
              <InputGroupInput
                placeholder="Filter by code, name, quarter, or category"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="text-sm"
              />
              <InputGroupAddon>
                <Funnel className="w-4 h-4" />
              </InputGroupAddon>
            </InputGroup>
          </div>

          <div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Report Section</TableHead>
                  <TableHead>Project Code</TableHead>
                  <TableHead>Project Name</TableHead>
                  <TableHead>Quarter</TableHead>
                  <TableHead>Annual Budget</TableHead>
                  <TableHead>Quarterly Budget</TableHead>
                  <TableHead>Quarterly Disbursed</TableHead>
                  <TableHead>Quarterly Obligated</TableHead>
                  <TableHead>Budget Variance</TableHead>
                  <TableHead>Utilization %</TableHead>
                  <TableHead>Disbursement Count</TableHead>
                  <TableHead>Obligation Count</TableHead>
                  <TableHead>Categories Used</TableHead>
                  <TableHead>Previous Quarter Disbursed</TableHead>
                  <TableHead>QoQ Growth %</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredRows.length > 0 ? (
                  filteredRows.map((row, index) => (
                    <TableRow
                      key={`${row.project_code}-${row.quarter}-${index}`}
                    >
                      <TableCell>{row.report_section}</TableCell>
                      <TableCell>{row.project_code}</TableCell>
                      <TableCell>{row.project_name}</TableCell>
                      <TableCell>{row.quarter}</TableCell>
                      <TableCell>{formatCurrency(row.annual_budget)}</TableCell>
                      <TableCell>
                        {formatCurrency(row.quarterly_budget)}
                      </TableCell>
                      <TableCell>
                        {formatCurrency(row.quarterly_disbursed)}
                      </TableCell>
                      <TableCell>
                        {formatCurrency(row.quarterly_obligated)}
                      </TableCell>
                      <TableCell>
                        {formatCurrency(row.budget_variance)}
                      </TableCell>
                      <TableCell>
                        {formatPercent(row.utilization_percentage)}
                      </TableCell>
                      <TableCell>{row.disbursement_count}</TableCell>
                      <TableCell>{row.obligation_count}</TableCell>
                      <TableCell>{row.categories_used || "—"}</TableCell>
                      <TableCell>
                        {formatCurrency(row.previous_quarter_disbursed)}
                      </TableCell>
                      <TableCell>
                        {formatPercent(row.qoq_growth_percentage)}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={15}>No report rows found.</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </Card>
      ) : isFetched && !isFetching ? (
        <Card>
          <p>No report data available.</p>
        </Card>
      ) : (
        <Card className="p-4 text-sm text-center text-muted-foreground">
          <p>Click Generate Report to show the report table.</p>
        </Card>
      )}
    </div>
  );
}
