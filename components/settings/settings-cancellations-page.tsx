import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { cancellationPolicies } from "@/lib/mock/settings";

export function SettingsCancellationsPage() {
  return (
    <div className="admin-grid">
      <PageHeader description="Cancellation policy controls should align customer fairness, provider accountability, and operational safety." eyebrow="Platform configuration" title="Cancellation Policies" />
      <Card>
        <div className="space-y-2">
          {cancellationPolicies.map((item) => (
            <div className="rounded-xl border border-line bg-panel-muted px-3 py-2" key={item}>
              <p className="text-[12px] text-body">{item}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
