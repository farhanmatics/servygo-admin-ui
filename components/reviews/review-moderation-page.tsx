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
  getReviews,
  moderationStatusTone,
  reviewMetrics,
  riskTone,
  type FraudRisk,
  type ModerationStatus,
  type ReviewRecord,
} from "@/lib/mock/reviews";

export function ReviewModerationPage() {
  const [status, setStatus] = useState<ModerationStatus | "all">("all");
  const [risk, setRisk] = useState<FraudRisk | "all">("all");
  const [query, setQuery] = useState("");
  const rows = getReviews();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter((row) => {
      const statusMatch = status === "all" ? true : row.status === status;
      const riskMatch = risk === "all" ? true : row.risk === risk;
      const queryMatch =
        q.length === 0
          ? true
          : [row.id, row.bookingId, row.customer, row.provider, row.territory, row.snippet].some((value) =>
              value.toLowerCase().includes(q),
            );
      return statusMatch && riskMatch && queryMatch;
    });
  }, [query, risk, rows, status]);

  const columns = [
    {
      header: "Review",
      key: "id",
      render: (row: ReviewRecord) => (
        <>
          <Link className="font-medium text-ink hover:text-forest" href={`/reviews/moderation/${row.id}`}>
            {row.id}
          </Link>
          <div className="mt-1 text-[12px] text-stone">{row.bookingId}</div>
        </>
      ),
    },
    {
      header: "Customer / Provider",
      key: "party",
      render: (row: ReviewRecord) => (
        <div className="text-[13px] leading-6 text-body">
          <div>{row.customer}</div>
          <div className="text-stone">{row.provider}</div>
        </div>
      ),
    },
    {
      header: "Snippet",
      key: "snippet",
      render: (row: ReviewRecord) => <span className="text-[13px] text-body">{row.snippet}</span>,
    },
    {
      header: "Status",
      key: "status",
      render: (row: ReviewRecord) => (
        <div className="flex flex-wrap gap-2">
          <StatusBadge tone={moderationStatusTone[row.status]}>{row.status}</StatusBadge>
          <StatusBadge tone={riskTone[row.risk]}>{row.risk}</StatusBadge>
        </div>
      ),
    },
  ];

  return (
    <div className="admin-grid">
      <PageHeader
        actions={
          <>
            <Link href="/risk/reviews">
              <Button size="md" variant="secondary">
                Fraud signals
              </Button>
            </Link>
            <Link href="/reviews/archive">
              <Button size="md">Review archive</Button>
            </Link>
          </>
        }
        description="Moderation queue should support fast triage, evidence review, and safe removal decisions."
        eyebrow="Review moderation"
        title="Moderation Queue"
      />
      <section className="grid gap-4 xl:grid-cols-4">
        {reviewMetrics.map((metric) => (
          <MetricCard key={metric.label} delta={metric.delta} label={metric.label} tone={metric.tone} value={metric.value} />
        ))}
      </section>
      <Card className="overflow-hidden p-0">
        <div className="border-b border-line px-4 py-3">
          <FilterBar>
            <Field label="Search">
              <Input onChange={(event) => setQuery(event.target.value)} placeholder="Review, booking, customer, provider, snippet" value={query} />
            </Field>
            <Field label="Status">
              <Select onChange={(event) => setStatus(event.target.value as ModerationStatus | "all")} value={status}>
                <option value="all">All statuses</option>
                <option value="pending-review">pending-review</option>
                <option value="flagged">flagged</option>
                <option value="approved">approved</option>
                <option value="removed">removed</option>
              </Select>
            </Field>
            <Field label="Risk">
              <Select onChange={(event) => setRisk(event.target.value as FraudRisk | "all")} value={risk}>
                <option value="all">All risk levels</option>
                <option value="low">low</option>
                <option value="medium">medium</option>
                <option value="high">high</option>
                <option value="critical">critical</option>
              </Select>
            </Field>
          </FilterBar>
          <div className="mt-3 px-4 pb-4">
            <ActiveFilters
              items={[
                status === "all" ? "All statuses" : `Status: ${status}`,
                risk === "all" ? "All risk levels" : `Risk: ${risk}`,
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
