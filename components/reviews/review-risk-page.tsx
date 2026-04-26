import { Card, MetricCard } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";

const riskMetrics = [
  { label: "Critical clusters", value: "3", delta: "Coordinated review patterns", tone: "danger" as const },
  { label: "Unverified-booking reviews", value: "7", delta: "Require immediate suppression", tone: "warning" as const },
  { label: "Flag precision", value: "84%", delta: "Rules vs reviewer outcomes", tone: "success" as const },
];

export function ReviewRiskPage() {
  return (
    <div className="admin-grid">
      <PageHeader
        description="Fraud board highlights suspicious review behavior for rapid support and risk intervention."
        eyebrow="Fraud signals"
        title="Review Fraud Board"
      />
      <section className="grid gap-4 xl:grid-cols-3">
        {riskMetrics.map((metric) => (
          <MetricCard key={metric.label} delta={metric.delta} label={metric.label} tone={metric.tone} value={metric.value} />
        ))}
      </section>
      <Card>
        <div className="eyebrow">Active signals</div>
        <div className="mt-3 space-y-2">
          {[
            "Five-star burst pattern from shared device fingerprints across 3 providers.",
            "Multiple reviews submitted without corresponding completion state in booking logs.",
            "Repeated text blocks reused across unrelated territories within 30 minutes.",
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
