import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import { notificationItems } from "@/lib/mock/notifications";

export function NotificationCenterPage() {
  return (
    <div className="admin-grid">
      <PageHeader description="Notification center keeps operational awareness visible across compliance, live ops, and finance updates." eyebrow="Internal communication" title="Notification Center" />
      <Card>
        <div className="space-y-3">
          {notificationItems.map((item) => (
            <div className="rounded-2xl border border-line bg-panel-muted p-3" key={item.id}>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="text-[13px] font-medium text-ink">
                  {item.id} - {item.title}
                </div>
                <StatusBadge tone={item.severity}>{item.severity}</StatusBadge>
              </div>
              <p className="mt-1 text-[12px] text-body">{item.message}</p>
              <p className="mt-1 text-[12px] text-stone">
                {item.source} • {item.channel} • {item.timestamp}
              </p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
