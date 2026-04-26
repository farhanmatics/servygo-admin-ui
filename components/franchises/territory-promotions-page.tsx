"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DataGrid } from "@/components/ui/data-grid";
import { Modal } from "@/components/ui/overlay";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import { getTerritoryById, getTerritoryPromotions, promotionStatusTone, type TerritoryPromotion } from "@/lib/mock/franchises";
import { useMockAuth } from "@/components/providers";
import { useToast } from "@/components/providers";

export function TerritoryPromotionsPage({ id }: { id: string }) {
  const territory = getTerritoryById(id);
  const promotions = getTerritoryPromotions(id);
  const { isReadOnly } = useMockAuth();
  const { pushToast } = useToast();
  const [reviewing, setReviewing] = useState<TerritoryPromotion | null>(null);
  const [rationale, setRationale] = useState("");

  function handleDecision(decision: "approve" | "reject") {
    pushToast({
      message: `Promotion "${reviewing?.title}" ${decision === "approve" ? "approved and scheduled" : "rejected"}. Creator notified.`,
      tone: decision === "approve" ? "success" : "danger",
    });
    setReviewing(null);
    setRationale("");
  }

  const columns = [
    {
      header: "Promotion",
      key: "title",
      render: (row: TerritoryPromotion) => (
        <div>
          <p className="font-medium text-ink">{row.title}</p>
          <p className="text-[11px] text-stone">{row.discountValue} · {row.discountType}</p>
        </div>
      ),
    },
    { header: "Created by", key: "createdBy", render: (row: TerritoryPromotion) => <span className="text-[13px] text-body">{row.createdBy}</span> },
    { header: "Valid", key: "validFrom", render: (row: TerritoryPromotion) => <span className="text-[12px] text-stone">{row.validFrom} → {row.validTo}</span> },
    {
      header: "Status",
      key: "status",
      render: (row: TerritoryPromotion) => (
        <StatusBadge tone={promotionStatusTone[row.status]}>{row.status.replace("-", " ")}</StatusBadge>
      ),
    },
    { header: "Approved by", key: "approvedBy", render: (row: TerritoryPromotion) => <span className="text-[13px] text-stone">{row.approvedBy ?? "—"}</span> },
    {
      header: "",
      key: "actions",
      render: (row: TerritoryPromotion) =>
        !isReadOnly && row.status === "pending-approval" ? (
          <Button onClick={() => setReviewing(row)} size="sm" variant="secondary">Review</Button>
        ) : null,
    },
  ];

  const pending = promotions.filter(p => p.status === "pending-approval").length;

  return (
    <div className="admin-grid">
      <PageHeader
        description={`Local promotions created by ${territory?.name ?? id} franchise — pending HQ approval before going live.`}
        eyebrow={`${territory?.name ?? id} · Promotion approval`}
        title="Territory Promotions"
      />

      {pending > 0 && (
        <div className="rounded-xl border border-warning/40 bg-warning/5 px-4 py-3">
          <p className="text-[13px] font-medium text-ink">{pending} promotion{pending > 1 ? "s" : ""} awaiting HQ approval</p>
          <p className="text-[12px] text-stone">Review and approve or reject before the promotion validity window opens.</p>
        </div>
      )}

      <Card className="overflow-hidden p-0">
        <DataGrid columns={columns} emptyMessage="No promotions submitted for this territory yet." rows={promotions} />
      </Card>

      {reviewing && (
        <Modal onClose={() => setReviewing(null)} title={`Review: ${reviewing.title}`}>
          <div className="space-y-4">
            <div className="rounded-lg border border-line bg-panel-muted p-3 space-y-1">
              <p className="text-[13px] text-body">{reviewing.description}</p>
              <p className="text-[12px] text-stone">Discount: <span className="font-medium text-ink">{reviewing.discountValue}</span> ({reviewing.discountType})</p>
              <p className="text-[12px] text-stone">Valid: {reviewing.validFrom} → {reviewing.validTo}</p>
              <p className="text-[12px] text-stone">Submitted by: {reviewing.createdBy} on {reviewing.createdAt}</p>
            </div>
            <div>
              <label className="text-[12px] font-medium text-ink">HQ decision note (required)</label>
              <textarea
                className="mt-1 w-full rounded-lg border border-line bg-panel px-3 py-2 text-[13px] text-ink placeholder:text-stone focus:outline-none focus:ring-2 focus:ring-forest/40"
                onChange={e => setRationale(e.target.value)}
                placeholder="Explain the approval or rejection decision…"
                rows={3}
                value={rationale}
              />
            </div>
            <div className="flex gap-2">
              <Button disabled={!rationale.trim()} onClick={() => handleDecision("approve")} size="md" variant="primary">Approve & schedule</Button>
              <Button disabled={!rationale.trim()} onClick={() => handleDecision("reject")} size="md" variant="danger">Reject</Button>
              <Button onClick={() => setReviewing(null)} size="md" variant="ghost">Cancel</Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
