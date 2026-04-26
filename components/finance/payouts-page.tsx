import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DataGrid } from "@/components/ui/data-grid";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import { getPayouts, payoutStatusTone, type PayoutRecord } from "@/lib/mock/finance";

export function PayoutsPage() {
  const payouts = getPayouts();
  const columns = [
    {
      header: "Payout",
      key: "id",
      render: (row: PayoutRecord) => (
        <Link className="font-medium text-ink hover:text-forest" href={`/finance/payouts/${row.id}`}>
          {row.id}
        </Link>
      ),
    },
    { header: "Provider", key: "provider", render: (row: PayoutRecord) => <span className="text-[13px] text-body">{row.provider}</span> },
    { header: "Territory", key: "territory", render: (row: PayoutRecord) => <span className="text-[13px] text-body">{row.territory}</span> },
    { header: "Amount", key: "amount", render: (row: PayoutRecord) => <span className="text-[13px] text-body">{row.amount}</span> },
    { header: "Volume", key: "volume", render: (row: PayoutRecord) => <span className="text-[13px] text-body">{row.volume}</span> },
    { header: "Status", key: "status", render: (row: PayoutRecord) => <StatusBadge tone={payoutStatusTone[row.status]}>{row.status}</StatusBadge> },
  ];

  return (
    <div className="admin-grid">
      <PageHeader
        actions={
          <Link href="/finance/reports">
            <Button size="md" variant="secondary">
              Revenue reports
            </Button>
          </Link>
        }
        description="Payout queue should surface blockers early and keep settlement states explicit."
        eyebrow="Payout management"
        title="Payout Queue"
      />
      <Card className="overflow-hidden p-0">
        <DataGrid columns={columns} rows={payouts} />
      </Card>
    </div>
  );
}
