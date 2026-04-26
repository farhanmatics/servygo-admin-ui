"use client";

import { useToast } from "@/components/providers";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";

export function ExportsPage() {
  const { pushToast } = useToast();
  const exports = [
    "Transactions (daily, CSV)",
    "Payout batch summary (weekly, CSV/PDF)",
    "Refund decisions (weekly, CSV)",
    "Commission ledger (monthly, CSV)",
  ];

  return (
    <div className="admin-grid">
      <PageHeader
        description="Export center should make scheduled and ad-hoc financial extracts explicit and traceable."
        eyebrow="Export center"
        title="Finance Exports"
      />
      <Card>
        <div className="grid gap-3">
          {exports.map((item) => (
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-line bg-panel-muted p-3" key={item}>
              <p className="text-[13px] text-body">{item}</p>
              <Button
                onClick={() => pushToast({ tone: "success", message: `Mock export queued: ${item}.` })}
                size="sm"
                variant="secondary"
              >
                Queue export
              </Button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
