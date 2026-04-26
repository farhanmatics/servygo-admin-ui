import { Card, StatPill } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import { transactionStatusTone, type TransactionProfile } from "@/lib/mock/finance";
import { maskIdentifier } from "@/lib/format";

export function TransactionDetailPage({ transaction }: { transaction: TransactionProfile }) {
  return (
    <div className="admin-grid">
      <PageHeader
        actions={
          <>
            <StatPill label="booking" value={transaction.bookingId} />
            <StatusBadge tone={transactionStatusTone[transaction.status]}>{transaction.status}</StatusBadge>
            <StatPill label="amount" value={transaction.amount} />
          </>
        }
        description="Detailed finance records should make fee math and operator notes immediately auditable."
        eyebrow={transaction.id}
        title="Transaction detail"
      />
      <section className="grid gap-4 xl:grid-cols-[minmax(0,1.4fr)_minmax(320px,0.8fr)]">
        <Card>
          <div className="eyebrow">Fee breakdown</div>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {transaction.feeBreakdown.map((item) => (
              <div className="rounded-2xl border border-line bg-panel-muted p-3" key={item.label}>
                <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-stone">{item.label}</div>
                <p className="mt-2 text-[13px] font-medium text-ink">{item.value}</p>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <div className="eyebrow">Audit notes</div>
          <div className="mt-3 rounded-xl border border-line bg-panel-muted px-3 py-2 text-[12px] text-body">
            Reference: {maskIdentifier(transaction.reference)}
          </div>
          <div className="mt-3 space-y-2">
            {transaction.auditNotes.map((note) => (
              <div className="rounded-xl border border-line bg-panel-muted px-3 py-2" key={note}>
                <p className="text-[12px] leading-5 text-body">{note}</p>
              </div>
            ))}
          </div>
        </Card>
      </section>
    </div>
  );
}
