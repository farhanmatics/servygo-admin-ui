import { Card, MetricCard } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { bookingPaymentTone, type BookingProfile } from "@/lib/mock/bookings";

export function BookingOverviewPage({ booking }: { booking: BookingProfile }) {
  return (
    <section className="grid gap-4 xl:grid-cols-[minmax(0,1.3fr)_minmax(320px,0.75fr)]">
      <Card>
        <div className="eyebrow">Booking overview</div>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {[
            ["Service", booking.service],
            ["Package", booking.packageName],
            ["Franchise", booking.franchise],
            ["Next milestone", booking.nextMilestone],
            ["Customer ID", booking.customerId],
            ["Provider ID", booking.providerId],
          ].map(([label, value]) => (
            <div className="rounded-2xl border border-line bg-panel-muted p-3" key={label}>
              <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-stone">{label}</div>
              <p className="mt-2 text-[13px] font-medium text-ink">{value}</p>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid gap-4">
        <MetricCard delta="Gross booking value" label="Amount" tone="success" value={booking.amount} />
        <MetricCard delta={booking.finance.captureReference} label="Capture reference" tone="info" value={booking.paymentStatus} />
        <Card>
          <div className="eyebrow">Participants</div>
          <div className="mt-3 space-y-2">
            {booking.participants.map((participant) => (
              <div className="rounded-xl border border-line bg-panel-muted px-3 py-2" key={`${participant.label}-${participant.name}`}>
                <div className="text-[12px] font-semibold text-ink">{participant.label}</div>
                <div className="text-[12px] text-stone">
                  {participant.name} - {participant.contact}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            <StatusBadge tone={bookingPaymentTone[booking.paymentStatus]}>{booking.paymentStatus}</StatusBadge>
            {booking.tags.map((tag) => (
              <StatusBadge key={tag} tone="info">
                {tag}
              </StatusBadge>
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
}
