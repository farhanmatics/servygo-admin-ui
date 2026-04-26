import { Card, MetricCard } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";

const commissionMetrics = [
  { label: "Average commission", value: "15.4%", delta: "Weighted across active categories", tone: "info" as const },
  { label: "High-variance categories", value: "3", delta: "Need policy review", tone: "warning" as const },
  { label: "Monthly commission revenue", value: "CAD 98,220", delta: "Projected current run rate", tone: "success" as const },
];

export function CommissionsPage() {
  return (
    <div className="admin-grid">
      <PageHeader
        description="Commission views should explain rate structure by category and keep adjustments auditable."
        eyebrow="Commission management"
        title="Commission Breakdown"
      />
      <section className="grid gap-4 xl:grid-cols-3">
        {commissionMetrics.map((metric) => (
          <MetricCard key={metric.label} delta={metric.delta} label={metric.label} tone={metric.tone} value={metric.value} />
        ))}
      </section>
      <Card>
        <div className="eyebrow">Category snapshot</div>
        <div className="mt-3 space-y-2">
          {[
            "Cleaning: 14% base, 2% quality bonus after SLA compliance.",
            "Logistics: 16% base due to higher dispatch overhead.",
            "Car detailing: 15% base with weekend premium adjustment.",
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
