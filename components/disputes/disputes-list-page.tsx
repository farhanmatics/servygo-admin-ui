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
  disputeMetrics,
  disputePriorityTone,
  disputeStatusTone,
  getDisputes,
  type DisputePriority,
  type DisputeRecord,
  type DisputeStatus,
} from "@/lib/mock/disputes";

export function DisputesListPage() {
  const [status, setStatus] = useState<DisputeStatus | "all">("all");
  const [priority, setPriority] = useState<DisputePriority | "all">("all");
  const [query, setQuery] = useState("");
  const rows = getDisputes();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter((row) => {
      const statusMatch = status === "all" ? true : row.status === status;
      const priorityMatch = priority === "all" ? true : row.priority === priority;
      const queryMatch =
        q.length === 0
          ? true
          : [row.id, row.bookingId, row.customer, row.provider, row.territory, row.reason].some((value) =>
              value.toLowerCase().includes(q),
            );
      return statusMatch && priorityMatch && queryMatch;
    });
  }, [priority, query, rows, status]);

  const columns = [
    {
      header: "Dispute",
      key: "id",
      render: (row: DisputeRecord) => (
        <>
          <Link className="font-medium text-ink hover:text-forest" href={`/disputes/${row.id}`}>
            {row.id}
          </Link>
          <div className="mt-1 text-[12px] text-stone">{row.createdAt}</div>
        </>
      ),
    },
    {
      header: "Booking",
      key: "booking",
      render: (row: DisputeRecord) => <span className="text-[13px] text-body">{row.bookingId}</span>,
    },
    {
      header: "Customer / Provider",
      key: "party",
      render: (row: DisputeRecord) => (
        <div className="text-[13px] leading-6 text-body">
          <div>{row.customer}</div>
          <div className="text-stone">{row.provider}</div>
        </div>
      ),
    },
    {
      header: "Reason",
      key: "reason",
      render: (row: DisputeRecord) => <span className="text-[13px] text-body">{row.reason}</span>,
    },
    {
      header: "Status",
      key: "status",
      render: (row: DisputeRecord) => (
        <div className="flex flex-wrap gap-2">
          <StatusBadge tone={disputeStatusTone[row.status]}>{row.status}</StatusBadge>
          <StatusBadge tone={disputePriorityTone[row.priority]}>{row.priority}</StatusBadge>
        </div>
      ),
    },
  ];

  return (
    <div className="admin-grid">
      <PageHeader
        actions={
          <Link href="/disputes/insights">
            <Button size="md" variant="secondary">
              Open dispute insights
            </Button>
          </Link>
        }
        description="Dispute triage should optimize defensible decisions: strong filtering, evidence-first detail review, and explicit escalation paths."
        eyebrow="Dispute resolution"
        title="Disputes"
      />
      <section className="grid gap-4 xl:grid-cols-4">
        {disputeMetrics.map((metric) => (
          <MetricCard key={metric.label} delta={metric.delta} label={metric.label} tone={metric.tone} value={metric.value} />
        ))}
      </section>
      <Card className="overflow-hidden p-0">
        <div className="border-b border-line px-4 py-3">
          <FilterBar>
            <Field label="Search">
              <Input onChange={(event) => setQuery(event.target.value)} placeholder="Dispute, booking, customer, provider, reason" value={query} />
            </Field>
            <Field label="Status">
              <Select onChange={(event) => setStatus(event.target.value as DisputeStatus | "all")} value={status}>
                <option value="all">All statuses</option>
                <option value="open">open</option>
                <option value="investigating">investigating</option>
                <option value="awaiting-response">awaiting-response</option>
                <option value="resolved">resolved</option>
                <option value="escalated">escalated</option>
              </Select>
            </Field>
            <Field label="Priority">
              <Select onChange={(event) => setPriority(event.target.value as DisputePriority | "all")} value={priority}>
                <option value="all">All priorities</option>
                <option value="low">low</option>
                <option value="normal">normal</option>
                <option value="high">high</option>
                <option value="critical">critical</option>
              </Select>
            </Field>
          </FilterBar>
          <div className="mt-3 px-4 pb-4">
            <ActiveFilters
              items={[
                status === "all" ? "All statuses" : `Status: ${status}`,
                priority === "all" ? "All priorities" : `Priority: ${priority}`,
                query.trim() ? `Search: ${query.trim()}` : "No search query",
              ]}
            />
          </div>
        </div>
        <DataGrid columns={columns} rows={filtered} />
      </Card>
    </div>
  );
}
