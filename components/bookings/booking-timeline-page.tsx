import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { type BookingProfile } from "@/lib/mock/bookings";

export function BookingTimelinePage({ booking }: { booking: BookingProfile }) {
  return (
    <Card>
      <div className="eyebrow">Booking timeline</div>
      <h3 className="mt-2 text-[1.2rem] leading-none">Audit events and operator actions</h3>
      <div className="mt-4 space-y-3">
        {booking.timeline.map((event) => (
          <div className="rounded-2xl border border-line bg-panel-muted p-4" key={`${event.timestamp}-${event.title}`}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="text-[13px] font-semibold text-ink">{event.title}</div>
                <div className="mt-1 text-[12px] text-stone">
                  {event.timestamp} - {event.actor}
                </div>
              </div>
              <StatusBadge tone={event.tone}>{event.tone}</StatusBadge>
            </div>
            <p className="mt-3 text-[13px] leading-6 text-body">{event.details}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
