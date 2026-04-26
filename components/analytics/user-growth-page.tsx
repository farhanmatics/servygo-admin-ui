import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { userGrowth } from "@/lib/mock/analytics";

export function UserGrowthPage() {
  return (
    <div className="admin-grid">
      <PageHeader description="User growth view tracks customer/provider/worker intake and active-account quality." eyebrow="User analytics" title="User Growth" />
      <Card>
        <div className="space-y-2">
          {userGrowth.map((point) => (
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
