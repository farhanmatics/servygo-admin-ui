import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";

export function SettingsAuditLogsPage() {
  return (
    <div className="admin-grid">
      <PageHeader description="Settings audit logs track global configuration changes and approval context." eyebrow="Platform configuration" title="Settings Audit Logs" />
      <Card>
        <div className="space-y-2">
          {[
            "Today 09:12 - Commission matrix edited by Super Admin.",
            "Yesterday 17:41 - Cancellation policy exception updated.",
            "Yesterday 14:08 - Notification template for compliance reminders revised.",
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
