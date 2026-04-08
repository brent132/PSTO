import { prisma } from "@/lib/prisma";
import { transactionsListSelect } from "@/lib/transactions";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const transactions = await prisma.transactions.findMany({
      select: transactionsListSelect,
      orderBy: {
        created_at: "desc",
      },
    });

    return NextResponse.json(transactions, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch transactions", error);
    return NextResponse.json(
      { error: "Failed to fetch transaction" },
      { status: 500 },
    );
  }
}
