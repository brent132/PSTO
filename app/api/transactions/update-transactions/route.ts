import { prisma } from "@/lib/prisma";
import { transactionsListSelect } from "@/lib/transactions";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();

    const transactionId = Number(body.id);

    if (!transactionId || Number.isNaN(transactionId)) {
      return NextResponse.json(
        { message: "Valid transaction id is required" },
        { status: 400 },
      );
    }

    const cleanAmount = Number(String(body.amount).replace(/,/g, ""));

    if (Number.isNaN(cleanAmount)) {
      return NextResponse.json(
        { message: "Invalid amount value" },
        { status: 400 },
      );
    }

    const session = req.cookies.get("sessions")?.value;

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const parts = session.split(":");
    const prefix = parts[0];
    const userIdStr = parts[1];

    if (prefix !== "uid" || !userIdStr) {
      const res = NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      res.cookies.delete("session");
      return res;
    }

    const userId = Number(userIdStr);

    if (!Number.isInteger(userId)) {
      const res = NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      res.cookies.delete("session");
      return res;
    }

    const transaction = await prisma.$transaction(async (tx) => {
      let categoryId = body.category_id;

      if (body.category_mode === "new") {
        const newCategory = await tx.categories.create({
          data: {
            category_name: body.new_category_name.trim(),
          },
        });

        categoryId = newCategory.id;
      }

      return tx.transactions.update({
        where: {
          id: transactionId,
        },
        data: {
          transaction_date: body.transaction_date,
          project_code: body.project_code,
          category_id: categoryId,
          voucher_no: body.voucher_no,
          particulars: body.particulars,
          amount: cleanAmount,
          status: body.status,
          transaction_type: body.transaction_type,
          created_by: userId,
          fiscal_year: body.fiscal_year,
        },
        select: transactionsListSelect,
      });
    });
    return NextResponse.json(transaction, { status: 201 });
  } catch (error) {
    console.error("Failed to add transaction:", error);
    return NextResponse.json(
      { error: "Failed to create transaction" },
      { status: 500 },
    );
  }
}
