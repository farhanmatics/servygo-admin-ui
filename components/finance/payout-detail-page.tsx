import { Card, StatPill } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import { payoutStatusTone, type PayoutProfile } from "@/lib/mock/finance";

export function PayoutDetailPage({ payout }: { payout: PayoutProfile }) {
  return (
    <div className="admin-grid">
      <PageHeader
        actions={
          <>
            <StatPill label="provider" value={payout.provider} />
            <StatusBadge tone={payoutStatusTone[payout.status]}>{payout.status}</StatusBadge>
            <StatPill label="amount" value={payout.amount} />
          </>
        }
        description="Payout details should clarify settlement composition and any active disbursement blockers."
        eyebrow={payout.id}
        title="Payout detail"
      />
      <section className="grid gap-4 xl:grid-cols-[minmax(0,1.4fr)_minmax(320px,0.8fr)]">
        <Card>
          <div className="eyebrow">Line items</div>
          <div className="mt-3 space-y-2">
            {payout.lineItems.map((item) => (
              <div className="rounded-xl border border-line bg-panel-muted px-3 py-2" key={item.bookingId}>
                <p className="text-[12px] text-body">
                  {item.bookingId} - {item.service} - {item.net}
                </p>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <div className="eyebrow">Blockers</div>
          <div className="mt-3 space-y-2">
            {payout.blockers.length ? (
              payout.blockers.map((blocker) => (
                <div className="rounded-xl border border-danger/20 bg-danger-soft px-3 py-2" key={blocker}>
                  <p className="text-[12px] text-body">{blocker}</p>
                </div>
              ))
            ) : (
              <div className="rounded-xl border border-line bg-panel-muted px-3 py-2 text-[12px] text-body">No blockers in current cycle.</div>
            )}
          </div>
        </Card>
      </section>
    </div>
  );
}
