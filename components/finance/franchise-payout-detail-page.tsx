"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import { getFranchisePayoutById, franchisePayoutStatusTone } from "@/lib/mock/franchises";
import { useMockAuth } from "@/components/providers";
import { useToast } from "@/components/providers";

export function FranchisePayoutDetailPage({ id }: { id: string }) {
  const payout = getFranchisePayoutById(id);
  const { isReadOnly } = useMockAuth();
  const { pushToast } = useToast();

  if (!payout) {
    return (
      <div className="admin-grid">
        <PageHeader description="" eyebrow="Finance" title="Franchise payout not found" />
        <Card><p className="text-[13px] text-stone">No payout found with ID: {id}</p></Card>
      </div>
    );
  }

  const profile = "lineItems" in payout ? payout : null;

  return (
    <div className="admin-grid">
      <PageHeader
        actions={
          !isReadOnly && payout.status === "queued" ? (
            <div className="flex gap-2">
              <Button onClick={() => pushToast({ message: `Payout ${id} approved. Batch scheduled for ${payout.scheduledAt}.`, tone: "success" })} size="md" variant="primary">
                Approve payout
              </Button>
              <Button onClick={() => pushToast({ message: `Payout ${id} blocked. Finance team notified.`, tone: "danger" })} size="md" variant="danger">
                Block
              </Button>
            </div>
          ) : undefined
        }
        description={`Franchise payout for ${payout.franchiseName} — ${payout.period}`}
        eyebrow={`Finance · Franchise payouts · ${id}`}
        title={payout.franchiseName}
      />

      {/* Status + meta */}
      <Card>
        <div className="flex flex-wrap gap-4 items-center">
          <StatusBadge tone={franchisePayoutStatusTone[payout.status]}>{payout.status}</StatusBadge>
          <span className="text-[13px] text-stone">Territory: <span className="text-ink">{payout.territory}</span></span>
          <span className="text-[13px] text-stone">Commission rate: <span className="font-medium text-ink">{payout.commissionRate}</span></span>
          <span className="text-[13px] text-stone">Period: <span className="text-ink">{payout.period}</span></span>
          <span className="text-[13px] text-stone">Scheduled: <span className="text-ink">{payout.scheduledAt}</span></span>
        </div>
        <div className="mt-4">
          <p className="text-[11px] uppercase tracking-wide text-stone">Total payout</p>
          <p className="text-[2rem] font-semibold tabular-nums text-ink">{payout.amount}</p>
        </div>
      </Card>

      {/* Line items */}
      {profile && profile.lineItems && (
        <Card>
          <p className="eyebrow mb-3">Payout line items</p>
          <div className="space-y-2">
            {profile.lineItems.map((item, i) => (
              <div className="flex justify-between items-center rounded-lg border border-line bg-panel-muted px-3 py-2" key={i}>
                <span className="text-[13px] text-body">{item.label}</span>
                <span className="tabular-nums text-[13px] font-medium text-ink">{item.amount}</span>
              </div>
            ))}
            <div className="flex justify-between items-center rounded-lg border border-forest/20 bg-forest/5 px-3 py-2 font-medium">
              <span className="text-[13px] text-ink">Total</span>
              <span className="tabular-nums text-[14px] text-ink">{payout.amount}</span>
            </div>
          </div>
        </Card>
      )}

      {/* Audit notes */}
      {profile && profile.auditNotes && (
        <Card>
          <p className="eyebrow mb-3">Audit notes</p>
          <div className="space-y-1">
            {profile.auditNotes.map((note, i) => (
              <div className="flex gap-2 rounded-lg border border-line bg-panel-muted px-3 py-2" key={i}>
                <span className="text-[12px] text-stone">•</span>
                <p className="text-[13px] text-body">{note}</p>
              </div>
            ))}
          </div>
          {profile.settlementRef && (
            <p className="mt-2 text-[12px] text-stone">Settlement ref: <span className="font-mono text-body">{profile.settlementRef}</span></p>
          )}
        </Card>
      )}

      <div className="flex gap-2">
        <Link href="/finance/franchise-payouts">
          <Button size="md" variant="ghost">← Back to franchise payouts</Button>
        </Link>
        <Link href={`/franchises/${payout.franchiseId}`}>
          <Button size="md" variant="secondary">View territory</Button>
        </Link>
      </div>
    </div>
  );
}
