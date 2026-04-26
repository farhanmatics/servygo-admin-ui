import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { providerPerformance } from "@/lib/mock/analytics";

export function ProviderPerformancePage() {
  return (
    <div className="admin-grid">
      <PageHeader
        description="Provider performance view surfaces reliability, volume, and quality outcomes for operations coaching."
        eyebrow="Provider analytics"
        title="Provider Performance"
      />
      <Card>
        <div className="space-y-2">
          {providerPerformance.map((point) => (
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
