import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { revenueTrend } from "@/lib/mock/analytics";

export function RevenueTrendsPage() {
  return (
    <div className="admin-grid">
      <PageHeader description="Revenue trend view should keep weekly movement easy to compare and export-ready." eyebrow="Revenue analytics" title="Revenue Trends" />
      <Card>
        <div className="space-y-2">
          {revenueTrend.map((point) => (
            <div className="flex items-center justify-between rounded-xl border border-line bg-panel-muted px-3 py-2" key={point.label}>
              <span className="text-[12px] text-body">{point.label}</span>
              <span className="text-[12px] font-semibold text-ink">{point.value}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
