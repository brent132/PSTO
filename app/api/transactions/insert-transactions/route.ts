import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const cleanAmount = Number(String(body.amount).replace(/,/g, ""));

    if (Number.isNaN(cleanAmount)) {
      return NextResponse.json(
        { message: "Invalid amount value" },
        { status: 400 },
      );
    }

    const session = req.cookies.get("session")?.value;

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

    if (body.category_mode === "existing" && !body.category_id) {
      return NextResponse.json(
        { message: "Category is required" },
        { status: 400 },
      );
    }

    if (
      body.category_mode === "new" &&
      !String(body.new_category_name || "").trim()
    ) {
      return NextResponse.json(
        { message: "New category name is required" },
        { status: 400 },
      );
    }

    const transaction = await prisma.$transaction(async (tx) => {
      let categoryId = Number(body.category_id);

      if (body.category_mode === "new") {
        const newCategory = await tx.categories.create({
          data: {
            category_name: body.new_category_name.trim(),
          },
        });

        categoryId = newCategory.id;
      }

      const createdTransaction = await tx.transactions.create({
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
      });

      const recipients = await tx.user.findMany({
        where: {
          id: {
            not: userId,
          },
        },
        select: {
          id: true,
        },
      });

      const notification = await tx.notifications.create({
        data: {
          title: "New Transaction Created",
          message: `${createdTransaction.particulars} was added under ${createdTransaction.project_code}.`,
          type: "TRANSACTION_CREATED",
          priority: "MEDIUM",
          created_by: userId,
          reference_type: "TRANSACTION",
          reference_id: createdTransaction.id,
          action_url: `/transactions?q=${encodeURIComponent(
            createdTransaction.voucher_no || createdTransaction.project_code,
          )}`,
        },
      });

      if (recipients.length > 0) {
        await tx.notification_recipients.createMany({
          data: recipients.map((recipients) => ({
            notification_id: notification.id,
            user_id: recipients.id,
          })),
        });
      }

      return createdTransaction;
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
