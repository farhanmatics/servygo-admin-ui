import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { servicePerformance } from "@/lib/mock/analytics";

export function ServicePerformancePage() {
  return (
    <div className="admin-grid">
      <PageHeader
        description="Service performance view compares demand, revenue, disputes, and completion quality by category."
        eyebrow="Service analytics"
        title="Service Performance"
      />
      <Card>
        <div className="space-y-2">
          {servicePerformance.map((point) => (
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
