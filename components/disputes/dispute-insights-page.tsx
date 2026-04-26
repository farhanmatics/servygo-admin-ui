import { Card, MetricCard } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";

const insightMetrics = [
  { label: "Repeat reasons", value: "Late arrival", delta: "24% of open cases", tone: "warning" as const },
  { label: "Provider risk cluster", value: "3 providers", delta: "Above baseline dispute rate", tone: "danger" as const },
  { label: "Resolved within 48h", value: "71%", delta: "Past 30 days", tone: "success" as const },
];

export function DisputeInsightsPage() {
  return (
    <div className="admin-grid">
      <PageHeader
        description="Dispute insights should reveal recurring causes and risky patterns for proactive operations tuning."
        eyebrow="Dispute analytics"
        title="Dispute Insights"
      />
      <section className="grid gap-4 xl:grid-cols-3">
        {insightMetrics.map((metric) => (
          <MetricCard key={metric.label} delta={metric.delta} label={metric.label} tone={metric.tone} value={metric.value} />
        ))}
      </section>
      <Card>
        <div className="eyebrow">Trend highlights</div>
        <div className="mt-3 space-y-2">
          {[
            "Commercial cleaning disputes spike when reassignment is required within 2 hours of start.",
            "Logistics disputes correlate with evening traffic windows in Southern Alberta.",
            "Evidence-complete cases close 40% faster than cases missing provider notes.",
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
