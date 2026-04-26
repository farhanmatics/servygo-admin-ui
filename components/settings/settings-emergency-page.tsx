import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";

export function SettingsEmergencyPage() {
  return (
    <div className="admin-grid">
      <PageHeader description="Emergency configuration controls platform-level pause/freeze states and incident messaging defaults." eyebrow="Platform configuration" title="Service Pause / Freeze Controls" />
      <Card>
        <div className="space-y-2">
          {[
            "Territory pause requires two-step confirmation and supervisor code.",
            "Provider freeze auto-notifies dispatch and compliance desks.",
            "Customer-facing banner templates must include ETA for recovery.",
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
