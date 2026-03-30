import { prisma } from "@/lib/prisma";
import {
  QuarterLabel,
  QuarterNumber,
  ReportRow,
  WorkingRow,
} from "@/types/reports";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

function round(value: number) {
  return Number(value.toFixed(2));
}

function getQuarterFromDate(date: Date): QuarterNumber {
  const month = new Date(date).getUTCMonth();

  if (month <= 2) return 1;
  if (month <= 5) return 2;
  if (month <= 8) return 3;
  return 4;
}

function getQuarterLabel(quarter: QuarterNumber): QuarterLabel {
  return `Q${quarter}` as QuarterLabel;
}

function getQuarterOrder(label: QuarterLabel) {
  if (label === "Q1") return 1;
  if (label === "Q2") return 2;
  if (label === "Q3") return 3;
  return 4;
}

function classifyTransaction(transactionType: string) {
  const normalized = transactionType.trim().toLowerCase();

  if (
    normalized.includes("obligation") ||
    normalized.includes("obligated") ||
    normalized.includes("encumbered")
  ) {
    return "obligated";
  }

  if (
    normalized.includes("expense") ||
    normalized.includes("disbursement") ||
    normalized.includes("disbursed") ||
    normalized.includes("payment")
  ) {
    return "disbursed";
  }

  return "other";
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const fiscalYear =
      searchParams.get("fiscalYear")?.trim() ||
      String(new Date().getUTCFullYear());

    const projectCode = searchParams.get("projectCode")?.trim() || undefined;
    const quarterParam = searchParams.get("quarter")?.trim();

    let quarterFilter: QuarterNumber | undefined;

    if (quarterParam) {
      const parsedQuarter = Number(quarterParam);

      if (![1, 2, 3, 4].includes(parsedQuarter)) {
        return NextResponse.json(
          { message: "Invalid quarter. Use 1, 2, 3, or 4." },
          { status: 400 },
        );
      }

      quarterFilter = parsedQuarter as QuarterNumber;
    }

    const transactionWhere: Prisma.TransactionsWhereInput = {
      fiscal_year: fiscalYear,
      ...(projectCode ? { project_code: projectCode } : {}),
    };

    const projectWhere: Prisma.ProjectsWhereInput = {
      fiscal_year: fiscalYear,
      ...(projectCode ? { project_code: projectCode } : {}),
    };

    const [transactions, projects, categories] = await Promise.all([
      prisma.transactions.findMany({
        where: transactionWhere,
        orderBy: [{ project_code: "asc" }, { transaction_date: "asc" }],
      }),
      prisma.projects.findMany({
        where: projectWhere,
        select: {
          project_code: true,
          project_name: true,
          budget: true,
        },
      }),
      prisma.categories.findMany({
        select: {
          id: true,
          category_name: true,
        },
      }),
    ]);

    const projectMap = new Map(
      projects.map((project) => [
        project.project_code,
        {
          project_name: project.project_name,
          budget: Number(project.budget ?? 0),
        },
      ]),
    );

    const categoryMap = new Map(
      categories.map((category) => [category.id, category.category_name]),
    );

    const groupedRows = new Map<string, WorkingRow>();

    for (const tx of transactions) {
      const quarter = getQuarterFromDate(tx.transaction_date);
      const quarterLabel = getQuarterLabel(quarter);

      if (quarterFilter && quarter !== quarterFilter) {
        continue;
      }

      const projectInfo = projectMap.get(tx.project_code);

      const annualBudget = Number(projectInfo?.budget ?? 0);
      const quarterlyBudget = annualBudget > 0 ? annualBudget / 4 : 0;

      const key = `${tx.project_code}-${quarterLabel}`;

      if (!groupedRows.has(key)) {
        groupedRows.set(key, {
          report_section: "Project Quarterly Summary",
          project_code: tx.project_code,
          project_name: projectInfo?.project_name ?? tx.project_code,
          quarter: quarterLabel,
          annual_budget: annualBudget,
          quarterly_budget: quarterlyBudget,
          quarterly_disbursed: 0,
          quarterly_obligated: 0,
          disbursement_count: 0,
          obligation_count: 0,
          categorySet: new Set<string>(),
        });
      }

      const row = groupedRows.get(key)!;
      const kind = classifyTransaction(tx.transaction_type);
      const categoryName = categoryMap.get(tx.category_id);

      if (categoryName) {
        row.categorySet.add(categoryName);
      }

      if (kind === "disbursed") {
        row.quarterly_disbursed += Number(tx.amount);
        row.disbursement_count += 1;
      } else if (kind === "obligated") {
        row.quarterly_obligated += Number(tx.amount);
        row.obligation_count += 1;
      }
    }

    const sortedWorkingRows = Array.from(groupedRows.values()).sort((a, b) => {
      if (a.project_code !== b.project_code) {
        return a.project_code.localeCompare(b.project_code);
      }

      return getQuarterOrder(a.quarter) - getQuarterOrder(b.quarter);
    });

    const previousQuarterDisbursedMap = new Map<string, number>();

    const rows: ReportRow[] = sortedWorkingRows.map((row) => {
      const previousQuarterDisbursed =
        previousQuarterDisbursedMap.get(row.project_code) ?? 0;

      const totalSpentThisQuarter =
        row.quarterly_disbursed + row.quarterly_obligated;

      const budgetVariance = row.quarterly_budget - totalSpentThisQuarter;

      const utilizationPercentage =
        row.quarterly_budget > 0
          ? (totalSpentThisQuarter / row.quarterly_budget) * 100
          : 0;

      const qoqGrowthPercentage =
        previousQuarterDisbursed > 0
          ? ((row.quarterly_disbursed - previousQuarterDisbursed) /
              previousQuarterDisbursed) *
            100
          : 0;

      const finalRow: ReportRow = {
        report_section: row.report_section,
        project_code: row.project_code,
        project_name: row.project_name,
        quarter: row.quarter,
        annual_budget: round(row.annual_budget),
        quarterly_budget: round(row.quarterly_budget),
        quarterly_disbursed: round(row.quarterly_disbursed),
        quarterly_obligated: round(row.quarterly_obligated),
        budget_variance: round(budgetVariance),
        utilization_percentage: round(utilizationPercentage),
        disbursement_count: row.disbursement_count,
        obligation_count: row.obligation_count,
        categories_used: Array.from(row.categorySet).join(", "),
        previous_quarter_disbursed: round(previousQuarterDisbursed),
        qoq_growth_percentage: round(qoqGrowthPercentage),
      };

      previousQuarterDisbursedMap.set(
        row.project_code,
        row.quarterly_disbursed,
      );

      return finalRow;
    });

    return NextResponse.json(
      {
        message: "Quarterly financial report fetched successfully.",
        filters: {
          fiscalYear,
          projectCode: projectCode ?? null,
          quarter: quarterFilter ?? null,
        },
        rows,
        generatedAt: new Date().toISOString(),
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Failed to fetch quarterly financial report:", error);

    return NextResponse.json(
      { message: "Failed to fetch quarterly financial report." },
      { status: 500 },
    );
  }
}
