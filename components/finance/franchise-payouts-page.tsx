"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DataGrid } from "@/components/ui/data-grid";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import { getFranchisePayouts, franchisePayoutStatusTone, type FranchisePayout } from "@/lib/mock/franchises";
import { useMockAuth } from "@/components/providers";
import { useToast } from "@/components/providers";

export function FranchisePayoutsPage() {
  const { isReadOnly } = useMockAuth();
  const { pushToast } = useToast();
  const payouts = getFranchisePayouts();

  const columns = [
    {
      header: "Payout ID",
      key: "id",
      render: (row: FranchisePayout) => (
        <Link className="font-medium text-ink hover:text-forest" href={`/finance/franchise-payouts/${row.id}`}>
          {row.id}
        </Link>
      ),
    },
    {
      header: "Franchise",
      key: "franchiseName",
      render: (row: FranchisePayout) => (
        <div>
          <p className="text-[13px] font-medium text-ink">{row.franchiseName}</p>
          <p className="text-[11px] text-stone">{row.territory}</p>
        </div>
      ),
    },
    { header: "Period", key: "period", render: (row: FranchisePayout) => <span className="text-[13px] text-body">{row.period}</span> },
    { header: "Amount", key: "amount", render: (row: FranchisePayout) => <span className="tabular-nums font-medium text-ink">{row.amount}</span> },
    { header: "Commission rate", key: "commissionRate", render: (row: FranchisePayout) => <span className="text-[13px] text-stone">{row.commissionRate}</span> },
    { header: "Scheduled", key: "scheduledAt", render: (row: FranchisePayout) => <span className="text-[13px] text-stone">{row.scheduledAt}</span> },
    {
      header: "Status",
      key: "status",
      render: (row: FranchisePayout) => (
        <StatusBadge tone={franchisePayoutStatusTone[row.status]}>{row.status}</StatusBadge>
      ),
    },
    {
      header: "",
      key: "actions",
      render: (row: FranchisePayout) =>
        !isReadOnly && row.status === "queued" ? (
          <Button
            onClick={() => pushToast({ message: `Franchise payout ${row.id} approved. Batch will process on scheduled date.`, tone: "success" })}
            size="sm"
            variant="secondary"
          >
            Approve
          </Button>
        ) : null,
    },
  ];

  const queued = payouts.filter(p => p.status === "queued");
  const blocked = payouts.filter(p => p.status === "blocked");

  return (
    <div className="admin-grid">
      <PageHeader
        description="Franchise payout approval queue — distinct from provider payouts, scoped by territory commission."
        eyebrow="Financial management"
        title="Franchise Payout Queue"
      />

      {blocked.length > 0 && (
        <div className="rounded-xl border border-danger/40 bg-danger/5 px-4 py-3">
          <p className="text-[13px] font-medium text-ink">{blocked.length} franchise payout{blocked.length > 1 ? "s" : ""} blocked</p>
          <p className="text-[12px] text-stone">Blocked payouts require Super Admin review before they can be released.</p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Queued", value: queued.length.toString() },
          { label: "Blocked", value: blocked.length.toString() },
          { label: "Processing", value: payouts.filter(p => p.status === "processing").length.toString() },
          { label: "Paid this cycle", value: payouts.filter(p => p.status === "paid").length.toString() },
        ].map(card => (
          <Card key={card.label} className="flex flex-col gap-1">
            <p className="text-[11px] uppercase tracking-wide text-stone">{card.label}</p>
            <p className="text-[1.5rem] font-semibold leading-none text-ink">{card.value}</p>
          </Card>
        ))}
      </div>

      <Card className="overflow-hidden p-0">
        <DataGrid columns={columns} emptyMessage="No franchise payouts found." rows={payouts} />
      </Card>
    </div>
  );
}
