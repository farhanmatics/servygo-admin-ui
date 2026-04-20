import { Card, MetricCard } from "@/components/ui/card";
import { DataGrid } from "@/components/ui/data-grid";
import { StatusBadge } from "@/components/ui/status-badge";
import type { UserProfile } from "@/lib/mock/users";

const financialTone = {
  paid: "success",
  pending: "warning",
  failed: "danger",
  "under-review": "info",
} as const;

export function UserFinancialsPage({ user }: { user: UserProfile }) {
  const columns = [
    {
      header: "Entry",
      key: "entry",
      render: (item: UserProfile["financials"][number]) => (
        <>
          <div className="font-medium text-ink">{item.category}</div>
          <div className="mt-1 text-[12px] text-stone">{item.id}</div>
        </>
      ),
    },
    {
      header: "Counterparty",
      key: "counterparty",
      render: (item: UserProfile["financials"][number]) => (
        <span className="text-[13px] text-body">{item.counterparty}</span>
      ),
    },
    {
      header: "Amount",
      key: "amount",
      render: (item: UserProfile["financials"][number]) => (
        <span className="text-[13px] font-medium text-ink">{item.amount}</span>
      ),
    },
    {
      header: "When",
      key: "when",
      render: (item: UserProfile["financials"][number]) => (
        <span className="text-[13px] text-body">{item.when}</span>
      ),
    },
    {
      header: "Status",
      key: "status",
      render: (item: UserProfile["financials"][number]) => (
        <StatusBadge tone={financialTone[item.status]}>{item.status}</StatusBadge>
      ),
    },
  ];

  return (
    <div className="admin-grid">
      <section className="grid gap-4 xl:grid-cols-4">
        <MetricCard
          delta={user.financialSummary.lastSettlement}
          label="Lifetime value"
          tone="success"
          value={user.financialSummary.lifetimeValue}
        />
        <MetricCard
          delta="Current ledger"
          label="Outstanding"
          tone="warning"
          value={user.financialSummary.outstandingBalance}
        />
        <MetricCard
          delta="Active cases"
          label="Dispute exposure"
          tone="info"
          value={user.financialSummary.disputeExposure}
        />
        <MetricCard
          delta="Latest settlement"
          label="Last settlement"
          tone="neutral"
          value={user.financialSummary.lastSettlement}
        />
      </section>

      <Card className="overflow-hidden p-0">
        <div className="border-b border-line px-4 py-3">
          <div className="eyebrow">Financial snapshot</div>
          <h3 className="mt-1 text-[1.2rem] leading-none">Payments, payouts, and disputes</h3>
        </div>
        <DataGrid columns={columns} rows={user.financials} />
      </Card>
    </div>
  );
}
