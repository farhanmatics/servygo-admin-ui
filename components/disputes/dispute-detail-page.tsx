import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, StatPill } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import { disputePriorityTone, disputeStatusTone, type DisputeProfile } from "@/lib/mock/disputes";

export function DisputeDetailPage({ dispute }: { dispute: DisputeProfile }) {
  return (
    <div className="admin-grid">
      <PageHeader
        actions={
          <>
            <StatPill label="booking" value={dispute.bookingId} />
            <StatusBadge tone={disputeStatusTone[dispute.status]}>{dispute.status}</StatusBadge>
            <StatusBadge tone={disputePriorityTone[dispute.priority]}>{dispute.priority}</StatusBadge>
            <Link href={`/disputes/${dispute.id}/resolve`}>
              <Button size="md" variant="secondary">
                Resolve
              </Button>
            </Link>
            <Link href={`/disputes/${dispute.id}/escalate`}>
              <Button size="md">Escalate</Button>
            </Link>
          </>
        }
        description="Dispute detail should keep evidence and internal reasoning side-by-side for defensible outcomes."
        eyebrow={dispute.id}
        title="Dispute detail"
      />
      <section className="grid gap-4 xl:grid-cols-[minmax(0,1.4fr)_minmax(320px,0.8fr)]">
        <Card>
          <div className="eyebrow">Evidence</div>
          <div className="mt-3 space-y-2">
            {dispute.evidence.map((item) => (
              <div className="rounded-xl border border-line bg-panel-muted px-3 py-2" key={item}>
                <p className="text-[12px] text-body">{item}</p>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <div className="eyebrow">Internal notes</div>
          <div className="mt-3 space-y-2">
            {dispute.internalNotes.map((item) => (
              <div className="rounded-xl border border-line bg-panel-muted px-3 py-2" key={item}>
                <p className="text-[12px] text-body">{item}</p>
              </div>
            ))}
          </div>
        </Card>
      </section>
    </div>
  );
}
