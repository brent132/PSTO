"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDateTime } from "@/hooks/date-format";
import { formatMoney } from "@/hooks/number-format";
import { statusTransactionsStyles, Transaction } from "@/types/transactions";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowLeftRight,
  Banknote,
  Calendar,
  CalendarRange,
  Clock,
  EllipsisVertical,
  Tags,
  User,
} from "lucide-react";

async function fetchTransactions(): Promise<Transaction[]> {
  const res = await fetch("/api/transactions/fetch-transactions");
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch transactions");
  }

  return data;
}

export function TransactionList() {
  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ["transactions"],
    queryFn: fetchTransactions,
  });

  if (isLoading) {
    return (
      <div className="grid gap-4 p-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={index} className="p-4">
            <div className="flex flex-col gap-4">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <Skeleton className="h-6 w-28" />
                  <Skeleton className="h-4 w-20" />
                </div>

                <div className="flex items-center gap-2">
                  <Skeleton className="h-6 w-20 rounded-full" />
                  <Skeleton className="h-8 w-8 rounded-md" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 rounded-sm bg-muted p-2"
                  >
                    <Skeleton className="h-4 w-4 rounded-sm" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-3 w-20" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-30 w-full rounded-sm" />
              </div>

              <div className="flex justify-center gap-2">
                <Skeleton className="h-4 w-4 rounded-sm" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-sm text-destructive">
        Failed to load transactions.
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex min-h-75 items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-lg font-semibold">No transactions found</h2>
          <p className="text-muted-foreground text-sm">
            Try changing your search or filter.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-4 p-4">
      {isFetching && (
        <p className="text-muted-foreground text-xs">
          Refreshing transactions...
        </p>
      )}

      {data?.map((transaction) => (
        <Card key={transaction.id} className="p-4">
          <div className="">
            <div className="flex justify-between items-center">
              <p className="text-xl font-bold">{transaction.project_code}</p>
              <div className="flex gap-2">
                <Badge
                  className={`text-xs ${statusTransactionsStyles[transaction.status] ?? "bg-muted text-muted-foreground"}`}
                >
                  {transaction.status}
                </Badge>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon-sm">
                      <EllipsisVertical />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-40" align="end">
                    <DropdownMenuGroup>
                      <div>actions</div>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <p className="text-muted-foreground text-xs font-medium">
              {transaction.voucher_no}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center gap-2 bg-muted p-2 rounded-sm">
              <Calendar className="w-4 h-4" />
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  Transaction date
                </p>
                <p className="text-xs font-semibold">
                  {formatDateTime(transaction.transaction_date)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-muted p-2 rounded-sm">
              <CalendarRange className="w-4 h-4" />
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  Fiscal Year
                </p>
                <p className="text-xs font-semibold">
                  {transaction.fiscal_year}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-muted p-2 rounded-sm">
              <Tags className="w-4 h-4" />
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  Category Name
                </p>
                <p className="text-xs font-semibold">
                  {transaction.category?.category_name ?? "No category"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-muted p-2 rounded-sm">
              <User className="w-4 h-4" />
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  Created By
                </p>
                <p className="text-xs font-semibold">
                  {transaction.creator
                    ? `${transaction.creator.firstName} ${transaction.creator.lastName}`
                    : "Unknown user"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-muted p-2 rounded-sm">
              <Banknote className="w-4 h-4" />
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  Amount
                </p>
                <p className="text-xs font-semibold">
                  {formatMoney(transaction.amount)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-muted p-2 rounded-sm">
              <ArrowLeftRight className="w-4 h-4" />
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  Transaction Type
                </p>
                <p className="text-xs font-semibold">
                  {transaction.transaction_type}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-xs font-semibold">Description</p>
            <p className="bg-muted p-2 max-h-30 h-30 rounded-sm text-muted-foreground text-xs font-medium">
              {transaction.particulars}
            </p>
          </div>

          <div className="text-muted-foreground text-xs font-medium flex gap-2 justify-center">
            <Clock className="w-4 h-4" />
            <p>{formatDateTime(transaction.created_at)}</p>
          </div>
        </Card>
      ))}
    </div>
  );
}
