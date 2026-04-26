"use client";
import { Card } from "@/components/ui/card";
import { ChartCard, KpiTile } from "@/components/ui/advanced-primitives";
import { PageHeader } from "@/components/ui/page-header";
import { getTerritoryById, getTerritoryMetrics } from "@/lib/mock/franchises";

export function TerritoryAnalyticsPage({ id }: { id: string }) {
  const territory = getTerritoryById(id);
  const metrics = getTerritoryMetrics(id);
  const latest = metrics.at(-1);
  const prior = metrics.at(-2);

  function revDiff() {
    if (!latest || !prior) return null;
    const l = parseFloat(latest.revenue.replace(/[$,]/g, ""));
    const p = parseFloat(prior.revenue.replace(/[$,]/g, ""));
    const pct = (((l - p) / p) * 100).toFixed(1);
    return `${l > p ? "+" : ""}${pct}% vs last month`;
  }

  const kpis = [
    { label: "Monthly Revenue", value: latest?.revenue ?? "—", delta: revDiff() ?? "" },
    { label: "Monthly Bookings", value: latest?.bookings.toString() ?? "—", delta: "" },
    { label: "Avg Rating", value: latest?.rating ?? "—", delta: "" },
    { label: "Active Providers", value: territory?.activeProviders.toString() ?? "—", delta: "" },
    { label: "SLA Compliance", value: territory?.slaCompliance ?? "—", delta: "" },
    { label: "Cancellation Rate", value: territory?.cancellationRate ?? "—", delta: "" },
  ];

  return (
    <div className="admin-grid">
      <PageHeader
        description={`Revenue trends, booking volume, and provider performance for ${territory?.name ?? id}.`}
        eyebrow={`${territory?.name ?? id} · Performance analytics`}
        title="Territory Analytics"
      />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {kpis.map(k => (
          <KpiTile delta={k.delta} key={k.label} label={k.label} value={k.value} />
        ))}
      </div>

      <ChartCard title="Revenue trend (last 6 months)">
        <div className="space-y-2">
          {metrics.map(m => {
            const val = parseFloat(m.revenue.replace(/[$,]/g, ""));
            const max = Math.max(...metrics.map(x => parseFloat(x.revenue.replace(/[$,]/g, ""))));
            const pct = max > 0 ? ((val / max) * 100).toFixed(0) : "0";
            return (
              <div className="flex items-center gap-3" key={m.month}>
                <span className="w-20 text-right text-[11px] text-stone">{m.month}</span>
                <div className="flex-1 rounded-full bg-panel-muted h-2 overflow-hidden">
                  <div className="h-2 rounded-full bg-forest" style={{ width: `${pct}%` }} />
                </div>
                <span className="w-20 text-[12px] font-medium tabular-nums text-ink">{m.revenue}</span>
                <span className="text-[11px] text-stone">{m.bookings} bookings</span>
              </div>
            );
          })}
        </div>
      </ChartCard>

      <ChartCard title="Rating trend">
        <div className="flex flex-wrap gap-4">
          {metrics.map(m => (
            <div className="text-center" key={m.month}>
              <p className="text-[11px] text-stone">{m.month.split(" ")[0]}</p>
              <p className="text-[1.2rem] font-semibold text-ink">{m.rating}</p>
            </div>
          ))}
        </div>
      </ChartCard>

      {metrics.length === 0 && (
        <Card><p className="text-[13px] text-stone">No analytics data available for this territory yet.</p></Card>
      )}
    </div>
  );
}
