import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { bookingTrend } from "@/lib/mock/analytics";

export function BookingTrendsPage() {
  return (
    <div className="admin-grid">
      <PageHeader description="Booking trend view highlights demand trajectory and operational load shifts." eyebrow="Booking analytics" title="Booking Volume Trends" />
      <Card>
        <div className="space-y-2">
          {bookingTrend.map((point) => (
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
