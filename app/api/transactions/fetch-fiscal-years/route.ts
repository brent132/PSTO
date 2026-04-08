import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const years = await prisma.transactions.findMany({
      select: {
        fiscal_year: true,
      },
      distinct: ["fiscal_year"],
    });

    const formattedYears = years
      .map((item) => item.fiscal_year)
      .filter(Boolean)
      .sort((a, b) => Number(b) - Number(a));

    return NextResponse.json(formattedYears, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch fiscal years:", error);

    return NextResponse.json(
      { error: "Failed to fetch fiscal years" },
      { status: 500 },
    );
  }
}
