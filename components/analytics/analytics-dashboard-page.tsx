import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, MetricCard } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { analyticsMetrics } from "@/lib/mock/analytics";

export function AnalyticsDashboardPage() {
  return (
    <div className="admin-grid">
      <PageHeader
        actions={
          <>
            <Link href="/analytics/revenue">
              <Button size="md" variant="secondary">
                Revenue trends
              </Button>
            </Link>
            <Link href="/analytics/reports/scheduled">
              <Button size="md">Scheduled reports</Button>
            </Link>
          </>
        }
        description="Analytics dashboard should balance executive readability with operator-level drill-down context."
        eyebrow="Analytics"
        title="Analytics Dashboard"
      />
      <section className="grid gap-4 xl:grid-cols-4">
        {analyticsMetrics.map((metric) => (
          <MetricCard key={metric.label} delta={metric.delta} label={metric.label} tone={metric.tone} value={metric.value} />
        ))}
      </section>
      <Card>
        <div className="eyebrow">Cross-domain highlights</div>
        <div className="mt-3 space-y-2">
          {[
            "Revenue acceleration is strongest in territories with stable provider verification.",
            "Dispute rate drops where reassignment lead time stays under 20 minutes.",
            "Compliance renewal reminders correlate with improved worker retention.",
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
