"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DataGrid } from "@/components/ui/data-grid";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import { getFranchiseProviders, getTerritoryById, type FranchiseProvider } from "@/lib/mock/franchises";
import { useMockAuth } from "@/components/providers";
import { useToast } from "@/components/providers";

const providerStatusTone = { active: "success", suspended: "danger", pending: "warning" } as const;

export function TerritoryProvidersPage({ id }: { id: string }) {
  const territory = getTerritoryById(id);
  const providers = getFranchiseProviders(id);
  const { isReadOnly } = useMockAuth();
  const { pushToast } = useToast();

  const columns = [
    {
      header: "Provider",
      key: "name",
      render: (row: FranchiseProvider) => (
        <div>
          <p className="font-medium text-ink">{row.name}</p>
          <p className="text-[11px] text-stone">{row.type}</p>
        </div>
      ),
    },
    { header: "Services", key: "services", render: (row: FranchiseProvider) => <span className="text-[13px] text-body">{row.services}</span> },
    { header: "Jobs done", key: "jobsCompleted", render: (row: FranchiseProvider) => <span className="tabular-nums text-[13px] text-body">{row.jobsCompleted}</span> },
    { header: "Rating", key: "rating", render: (row: FranchiseProvider) => <span className="tabular-nums text-[13px] text-body">{row.rating}</span> },
    { header: "Joined", key: "joinedAt", render: (row: FranchiseProvider) => <span className="text-[13px] text-stone">{row.joinedAt}</span> },
    {
      header: "Status",
      key: "status",
      render: (row: FranchiseProvider) => (
        <StatusBadge tone={providerStatusTone[row.status]}>{row.status}</StatusBadge>
      ),
    },
    {
      header: "",
      key: "actions",
      render: (row: FranchiseProvider) =>
        !isReadOnly && row.status === "active" ? (
          <Button
            onClick={() => pushToast({ message: `Provider ${row.name} suspension logged. Audit trail updated.`, tone: "danger" })}
            size="sm"
            variant="ghost"
          >
            Suspend
          </Button>
        ) : null,
    },
  ];

  return (
    <div className="admin-grid">
      <PageHeader
        description={`Service providers operating within the ${territory?.name ?? id} territory.`}
        eyebrow={`${territory?.name ?? id} · Provider oversight`}
        title="Territory Providers"
      />
      <Card className="overflow-hidden p-0">
        <DataGrid columns={columns} emptyMessage="No providers registered in this territory yet." rows={providers} />
      </Card>
    </div>
  );
}
