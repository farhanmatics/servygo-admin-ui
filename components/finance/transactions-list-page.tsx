"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, MetricCard } from "@/components/ui/card";
import { DataGrid } from "@/components/ui/data-grid";
import { ActiveFilters, FilterBar } from "@/components/ui/filter-bar";
import { Field, Input, Select } from "@/components/ui/input";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import {
  financeMetrics,
  getTransactions,
  transactionStatusTone,
  type TransactionRecord,
  type TransactionStatus,
} from "@/lib/mock/finance";

export function TransactionsListPage() {
  const [status, setStatus] = useState<TransactionStatus | "all">("all");
  const [query, setQuery] = useState("");
  const rows = getTransactions();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter((row) => {
      const statusMatch = status === "all" ? true : row.status === status;
      const queryMatch =
        q.length === 0
          ? true
          : [row.id, row.bookingId, row.customer, row.provider, row.territory].some((value) =>
              value.toLowerCase().includes(q),
            );
      return statusMatch && queryMatch;
    });
  }, [query, rows, status]);

  const columns = [
    {
      header: "Transaction",
      key: "id",
      render: (row: TransactionRecord) => (
        <>
          <Link className="font-medium text-ink hover:text-forest" href={`/finance/transactions/${row.id}`}>
            {row.id}
          </Link>
          <div className="mt-1 text-[12px] text-stone">{row.timestamp}</div>
        </>
      ),
    },
    {
      header: "Booking",
      key: "booking",
      render: (row: TransactionRecord) => <span className="text-[13px] text-body">{row.bookingId}</span>,
    },
    {
      header: "Parties",
      key: "parties",
      render: (row: TransactionRecord) => (
        <div className="text-[13px] leading-6 text-body">
          <div>{row.customer}</div>
          <div className="text-stone">{row.provider}</div>
        </div>
      ),
    },
    {
      header: "Amount",
      key: "amount",
      render: (row: TransactionRecord) => <span className="text-[13px] text-body">{row.amount}</span>,
    },
    {
      header: "Status",
      key: "status",
      render: (row: TransactionRecord) => <StatusBadge tone={transactionStatusTone[row.status]}>{row.status}</StatusBadge>,
    },
  ];

  return (
    <div className="admin-grid">
      <PageHeader
        actions={
          <Link href="/finance/exports">
            <Button size="md">Open export center</Button>
          </Link>
        }
        description="Financial lists should stay precise and audit-friendly: masked references, explicit status states, and clear drill-down links."
        eyebrow="Financial management"
        title="Transactions"
      />
      <section className="grid gap-4 xl:grid-cols-4">
        {financeMetrics.map((metric) => (
          <MetricCard key={metric.label} delta={metric.delta} label={metric.label} tone={metric.tone} value={metric.value} />
        ))}
      </section>
      <Card className="overflow-hidden p-0">
        <div className="border-b border-line px-4 py-3">
          <FilterBar>
            <Field label="Search">
              <Input onChange={(event) => setQuery(event.target.value)} placeholder="Transaction, booking, customer, provider" value={query} />
            </Field>
            <Field label="Status">
              <Select onChange={(event) => setStatus(event.target.value as TransactionStatus | "all")} value={status}>
                <option value="all">All statuses</option>
                <option value="captured">captured</option>
                <option value="authorized">authorized</option>
                <option value="refunded">refunded</option>
                <option value="failed">failed</option>
                <option value="pending-review">pending-review</option>
              </Select>
            </Field>
          </FilterBar>
          <div className="mt-3 px-4 pb-4">
            <ActiveFilters items={[status === "all" ? "All statuses" : `Status: ${status}`, query.trim() ? `Search: ${query.trim()}` : "No search query"]} />
          </div>
        </div>
        <DataGrid columns={columns} rows={filtered} />
      </Card>
    </div>
  );
}
