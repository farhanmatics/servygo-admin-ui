"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import { getTerritoryById, territoryStatusTone } from "@/lib/mock/franchises";
import { useMockAuth } from "@/components/providers";
import { useToast } from "@/components/providers";

export function TerritoryDetailPage({ id }: { id: string }) {
  const territory = getTerritoryById(id);
  const { isReadOnly } = useMockAuth();
  const { pushToast } = useToast();

  if (!territory) {
    return (
      <div className="admin-grid">
        <PageHeader description="" eyebrow="Franchise management" title="Territory not found" />
        <Card><p className="text-[13px] text-stone">No territory found with ID: {id}</p></Card>
      </div>
    );
  }

  const kpis = [
    { label: "Active Providers", value: territory.activeProviders.toString() },
    { label: "Active Jobs", value: territory.activeJobs.toString() },
    { label: "Monthly Revenue", value: territory.monthlyRevenue },
    { label: "SLA Compliance", value: territory.slaCompliance },
    { label: "Cancellation Rate", value: territory.cancellationRate },
    { label: "Staff Members", value: territory.staffCount.toString() },
    { label: "Open Disputes", value: territory.openDisputes.toString() },
    { label: "Pending Documents", value: territory.pendingDocuments.toString() },
  ];

  const commissionRows = [
    { label: "Platform Commission", value: territory.platformCommission },
    { label: "Franchise Commission", value: territory.franchiseCommission },
    { label: "Provider Share", value: territory.providerShare },
  ];

  const subRoutes = [
    { label: "Staff", href: `/franchises/${id}/staff`, desc: "View and manage franchise staff" },
    { label: "Providers", href: `/franchises/${id}/providers`, desc: "Providers operating in this territory" },
    { label: "Documents", href: `/franchises/${id}/documents`, desc: "Franchise document verification" },
    { label: "Commissions", href: `/franchises/${id}/commissions`, desc: "Configure commission split" },
    { label: "Analytics", href: `/franchises/${id}/analytics`, desc: "Revenue & performance trends" },
    { label: "Promotions", href: `/franchises/${id}/promotions`, desc: "Review and approve local promos" },
    { label: "Geo-boundary", href: `/franchises/${id}/boundary`, desc: "Territory geo-boundary definition" },
    { label: "Assign Operator", href: `/franchises/${id}/operator`, desc: "Assign or change franchise operator" },
  ];

  return (
    <div className="admin-grid">
      <PageHeader
        actions={
          !isReadOnly ? (
            <Button
              onClick={() => pushToast({ message: `Territory ${territory.status === "paused" ? "resumed" : "paused"} — audit event logged.`, tone: "warning" })}
              size="md"
              variant="secondary"
            >
              {territory.status === "paused" ? "Resume territory" : "Pause territory"}
            </Button>
          ) : undefined
        }
        description={territory.description}
        eyebrow={`${territory.city}, ${territory.province} · ${territory.id}`}
        title={territory.name}
      />

      {/* Status + meta */}
      <Card>
        <div className="flex flex-wrap items-center gap-4">
          <StatusBadge tone={territoryStatusTone[territory.status]}>{territory.status}</StatusBadge>
          <span className="text-[13px] text-stone">Operator: <span className="text-ink">{territory.operator}</span></span>
          <span className="text-[13px] text-stone">Commission rate: <span className="font-medium text-ink">{territory.commissionRate}</span></span>
          <span className="text-[13px] text-stone">Operating hours: <span className="text-ink">{territory.operatingHours}</span></span>
          <span className="text-[13px] text-stone">Since: <span className="text-ink">{territory.createdAt}</span></span>
        </div>
        <p className="mt-2 text-[12px] text-stone">Geo-boundary: {territory.geoBoundary}</p>
      </Card>

      {/* KPI grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {kpis.map(k => (
          <Card key={k.label} className="flex flex-col gap-1">
            <p className="text-[11px] uppercase tracking-wide text-stone">{k.label}</p>
            <p className="text-[1.5rem] font-semibold leading-none text-ink">{k.value}</p>
          </Card>
        ))}
      </div>

      {/* Commission breakdown */}
      <Card>
        <p className="eyebrow mb-3">Commission breakdown</p>
        <div className="flex flex-wrap gap-4">
          {commissionRows.map(r => (
            <div className="rounded-lg border border-line bg-panel-muted px-4 py-2" key={r.label}>
              <p className="text-[11px] text-stone">{r.label}</p>
              <p className="text-[1.2rem] font-semibold text-ink">{r.value}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Sub-routes navigation */}
      <div>
        <p className="eyebrow mb-3">Territory management areas</p>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {subRoutes.map(r => (
            <Link href={r.href} key={r.label}>
              <div className="rounded-xl border border-line bg-panel p-3 hover:border-forest hover:bg-panel-muted transition-colors">
                <p className="text-[13px] font-medium text-ink">{r.label}</p>
                <p className="text-[12px] text-stone">{r.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
