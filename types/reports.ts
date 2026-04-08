export type ReportsHeaderProps = {
  tab: string;
  onTabChange: (value: string) => void;
};

// Quarterly Financial Report
export type QuarterNumber = 1 | 2 | 3 | 4;
export type QuarterLabel = "Q1" | "Q2" | "Q3" | "Q4";

export type ReportRow = {
  report_section: string;
  project_code: string;
  project_name: string;
  quarter: QuarterLabel;
  annual_budget: number;
  quarterly_budget: number;
  quarterly_disbursed: number;
  quarterly_obligated: number;
  budget_variance: number;
  utilization_percentage: number;
  disbursement_count: number;
  obligation_count: number;
  categories_used: string;
  previous_quarter_disbursed: number;
  qoq_growth_percentage: number;
};

export type WorkingRow = {
  report_section: string;
  project_code: string;
  project_name: string;
  quarter: QuarterLabel;
  annual_budget: number;
  quarterly_budget: number;
  quarterly_disbursed: number;
  quarterly_obligated: number;
  disbursement_count: number;
  obligation_count: number;
  categorySet: Set<string>;
};

export type QuarterlyFinancialReportRow = {
  report_section: string;
  project_code: string;
  project_name: string;
  quarter: QuarterLabel;
  annual_budget: number;
  quarterly_budget: number;
  quarterly_disbursed: number;
  quarterly_obligated: number;
  budget_variance: number;
  utilization_percentage: number;
  disbursement_count: number;
  obligation_count: number;
  categories_used: string;
  previous_quarter_disbursed: number;
  qoq_growth_percentage: number;
};

export type QuarterlyFinancialReportResponse = {
  message: string;
  filters: {
    fiscalYear: string;
    projectCode: string | null;
    quarter: number | null;
  };
  rows: QuarterlyFinancialReportRow[];
  generatedAt: string;
};
