import { prisma } from "@/lib/prisma";
import { transactionsListSelect } from "@/lib/transactions";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const SESSION_COOKIE = "session";

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

    const session = req.cookies.get(SESSION_COOKIE)?.value;

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const parts = session.split(":");
    const prefix = parts[0];
    const userIdStr = parts[1];

    if (prefix !== "uid" || !userIdStr) {
      const res = NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      res.cookies.delete(SESSION_COOKIE);
      return res;
    }

    const userId = Number(userIdStr);

    if (!Number.isInteger(userId)) {
      const res = NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      res.cookies.delete(SESSION_COOKIE);
      return res;
    }

    const transaction = await prisma.$transaction(async (tx) => {
      let categoryId: number | null = body.category_id
        ? Number(body.category_id)
        : null;

      if (
        body.category_mode === "existing" &&
        (categoryId === null || Number.isNaN(categoryId))
      ) {
        throw new Error("Category is required");
      }

      if (body.category_mode === "new") {
        const categoryName = String(body.new_category_name ?? "").trim();

        if (!categoryName) {
          throw new Error("New category name is required");
        }

        const newCategory = await tx.categories.create({
          data: {
            category_name: categoryName,
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
          category_id: Number(categoryId),
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

    return NextResponse.json(transaction, { status: 200 });
  } catch (error) {
    console.error("Failed to update transaction", error);

    if (error instanceof Error) {
      if (error.message === "Category is required") {
        return NextResponse.json({ message: error.message }, { status: 400 });
      }

      if (error.message === "New category name is required") {
        return NextResponse.json({ message: error.message }, { status: 400 });
      }
    }

    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return NextResponse.json(
        { message: "Transaction not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { error: "Failed to update transaction" },
      { status: 500 },
    );
  }
}
