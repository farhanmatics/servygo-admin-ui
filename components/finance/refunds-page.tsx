"use client";

import { useToast } from "@/components/providers";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import { getTransactions } from "@/lib/mock/finance";

export function RefundsPage() {
  const { pushToast } = useToast();
  const refunded = getTransactions().filter((item) => item.type === "refund" || item.status === "pending-review");

  return (
    <div className="admin-grid">
      <PageHeader
        description="Refund decisions should be defensible: clear context, reason capture, and visible financial impact."
        eyebrow="Refund management"
        title="Refund Queue"
      />
      <Card>
        <div className="grid gap-3">
          {refunded.map((item) => (
            <div className="rounded-2xl border border-line bg-panel-muted p-3" key={item.id}>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="text-[13px] font-medium text-ink">
                  {item.id} - {item.customer}
                </div>
                <StatusBadge tone="warning">{item.status}</StatusBadge>
              </div>
              <p className="mt-1 text-[12px] text-stone">
                {item.amount} • {item.bookingId} • {item.territory}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Button
                  onClick={() => pushToast({ tone: "success", message: `Mock refund approval queued for ${item.id}.` })}
                  size="sm"
                  variant="secondary"
                >
                  Approve
                </Button>
                <Button
                  onClick={() => pushToast({ tone: "warning", message: `Mock refund rejection note queued for ${item.id}.` })}
                  size="sm"
                  variant="ghost"
                >
                  Reject
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
