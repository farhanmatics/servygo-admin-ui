"use client";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DataGrid } from "@/components/ui/data-grid";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import { getTerritories, territoryStatusTone, type TerritoryRecord } from "@/lib/mock/franchises";
import { useMockAuth } from "@/components/providers";
import { useToast } from "@/components/providers";

const STATUSES = ["all", "active", "onboarding", "paused", "suspended"] as const;

export function FranchiseListPage() {
  const { isReadOnly } = useMockAuth();
  const { pushToast } = useToast();
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const all = getTerritories();
  const rows = statusFilter === "all" ? all : all.filter(t => t.status === statusFilter);

  const columns = [
    {
      header: "Territory",
      key: "name",
      render: (row: TerritoryRecord) => (
        <Link className="font-medium text-ink hover:text-forest" href={`/franchises/${row.id}`}>
          {row.name}
        </Link>
      ),
    },
    {
      header: "Location",
      key: "city",
      render: (row: TerritoryRecord) => (
        <span className="text-[13px] text-body">
          {row.city}, {row.province}
        </span>
      ),
    },
    {
      header: "Operator",
      key: "operator",
      render: (row: TerritoryRecord) => <span className="text-[13px] text-body">{row.operator}</span>,
    },
    {
      header: "Providers",
      key: "activeProviders",
      render: (row: TerritoryRecord) => <span className="text-[13px] tabular-nums text-body">{row.activeProviders}</span>,
    },
    {
      header: "Active Jobs",
      key: "activeJobs",
      render: (row: TerritoryRecord) => <span className="text-[13px] tabular-nums text-body">{row.activeJobs}</span>,
    },
    {
      header: "Monthly Revenue",
      key: "monthlyRevenue",
      render: (row: TerritoryRecord) => <span className="text-[13px] tabular-nums font-medium text-ink">{row.monthlyRevenue}</span>,
    },
    {
      header: "SLA",
      key: "slaCompliance",
      render: (row: TerritoryRecord) => <span className="text-[13px] tabular-nums text-body">{row.slaCompliance}</span>,
    },
    {
      header: "Status",
      key: "status",
      render: (row: TerritoryRecord) => (
        <StatusBadge tone={territoryStatusTone[row.status]}>{row.status}</StatusBadge>
      ),
    },
    {
      header: "",
      key: "actions",
      render: (row: TerritoryRecord) => (
        <Link href={`/franchises/${row.id}`}>
          <Button size="sm" variant="ghost">View</Button>
        </Link>
      ),
    },
  ];

  return (
    <div className="admin-grid">
      <PageHeader
        actions={
          !isReadOnly ? (
            <Button
              onClick={() => pushToast({ message: "Territory creation wizard — coming with backend integration.", tone: "info" })}
              size="md"
              variant="primary"
            >
              + New territory
            </Button>
          ) : undefined
        }
        description="HQ-level view of all franchise territories. Manage operators, boundaries, commissions, and promotions."
        eyebrow="Franchise management"
        title="Territories"
      />

      {/* Filter bar */}
      <div className="flex flex-wrap gap-2">
        {STATUSES.map(s => (
          <button
            className={`rounded-full border px-3 py-1 text-[12px] font-medium transition-colors ${statusFilter === s ? "border-forest bg-forest text-cream" : "border-line bg-panel text-body hover:border-ink hover:text-ink"}`}
            key={s}
            onClick={() => setStatusFilter(s)}
          >
            {s === "all" ? "All territories" : s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Total territories", value: all.length.toString() },
          { label: "Active", value: all.filter(t => t.status === "active").length.toString() },
          { label: "Onboarding", value: all.filter(t => t.status === "onboarding").length.toString() },
          { label: "Paused / Suspended", value: all.filter(t => t.status === "paused" || t.status === "suspended").length.toString() },
        ].map(card => (
          <Card key={card.label} className="flex flex-col gap-1">
            <p className="text-[11px] uppercase tracking-wide text-stone">{card.label}</p>
            <p className="text-[1.6rem] font-semibold leading-none text-ink">{card.value}</p>
          </Card>
        ))}
      </div>

      <Card className="overflow-hidden p-0">
        <DataGrid columns={columns} emptyMessage="No territories match the selected filter." rows={rows} />
      </Card>
    </div>
  );
}
