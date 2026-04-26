import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";

export function MaintenancePage() {
  return (
    <div className="admin-grid">
      <PageHeader description="Maintenance state communicates planned downtime windows and expected restoration milestones." eyebrow="System utility" title="Maintenance" />
      <Card>
        <p className="text-[13px] text-body">
          Planned maintenance window: Sunday 01:00-02:30 local. Booking creation and payout release actions may be paused.
        </p>
      </Card>
    </div>
  );
}
