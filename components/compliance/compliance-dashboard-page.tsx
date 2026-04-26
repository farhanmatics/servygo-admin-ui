import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, MetricCard } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { complianceHistory, complianceMetrics } from "@/lib/mock/compliance";

export function ComplianceDashboardPage() {
  return (
    <div className="admin-grid">
      <PageHeader
        actions={
          <>
            <Link href="/compliance/documents">
              <Button size="md" variant="secondary">
                Pending verifications
              </Button>
            </Link>
            <Link href="/compliance/expiring">
              <Button size="md">Expiry board</Button>
            </Link>
          </>
        }
        description="Compliance dashboard keeps verification backlog, expiry risk, and audit posture visible for provider and worker onboarding."
        eyebrow="Compliance monitoring"
        title="Compliance Dashboard"
      />

      <section className="grid gap-4 xl:grid-cols-4">
        {complianceMetrics.map((metric) => (
          <MetricCard key={metric.label} delta={metric.delta} label={metric.label} tone={metric.tone} value={metric.value} />
        ))}
      </section>

      <Card>
        <div className="eyebrow">Backlog highlights</div>
        <div className="mt-3 space-y-2">
          {complianceHistory.map((item) => (
            <div className="rounded-xl border border-line bg-panel-muted px-3 py-2" key={item}>
              <p className="text-[12px] text-body">{item}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
