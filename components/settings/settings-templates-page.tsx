import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { notificationTemplates } from "@/lib/mock/settings";

export function SettingsTemplatesPage() {
  return (
    <div className="admin-grid">
      <PageHeader description="Template settings keep cross-channel messaging consistent across email, SMS, and in-app notifications." eyebrow="Platform configuration" title="Notification Templates" />
      <Card>
        <div className="space-y-2">
          {notificationTemplates.map((item) => (
            <div className="rounded-xl border border-line bg-panel-muted px-3 py-2" key={item}>
              <p className="text-[12px] text-body">{item}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
