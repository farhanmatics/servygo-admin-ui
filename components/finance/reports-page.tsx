import { Card, MetricCard } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";

const reportTiles = [
  { label: "Revenue vs previous week", value: "+8.7%", delta: "National aggregate", tone: "success" as const },
  { label: "Refund ratio", value: "2.9%", delta: "Watch commercial incidents", tone: "warning" as const },
  { label: "Average booking value", value: "CAD 182", delta: "Blended across services", tone: "info" as const },
];

export function ReportsPage() {
  return (
    <div className="admin-grid">
      <PageHeader
        description="Finance reports should support quick executive scanning while keeping drill-down paths obvious."
        eyebrow="Revenue reporting"
        title="Revenue Reports"
      />
      <section className="grid gap-4 xl:grid-cols-3">
        {reportTiles.map((tile) => (
          <MetricCard key={tile.label} delta={tile.delta} label={tile.label} tone={tile.tone} value={tile.value} />
        ))}
      </section>
      <Card>
        <div className="eyebrow">Report notes</div>
        <div className="mt-3 space-y-2">
          {[
            "Southern Alberta payout variance is elevated due to manual reassignment load.",
            "Central Saskatchewan has highest enterprise revenue this week.",
            "Refund cluster is concentrated in delayed commercial cleaning jobs.",
          ].map((item) => (
            <div className="rounded-xl border border-line bg-panel-muted px-3 py-2" key={item}>
              <p className="text-[12px] text-body">{item}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
