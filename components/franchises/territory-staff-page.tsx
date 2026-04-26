"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DataGrid } from "@/components/ui/data-grid";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import { getFranchiseStaff, getTerritoryById, type FranchiseStaff } from "@/lib/mock/franchises";
import { useMockAuth } from "@/components/providers";
import { useToast } from "@/components/providers";

export function TerritoryStaffPage({ id }: { id: string }) {
  const territory = getTerritoryById(id);
  const staff = getFranchiseStaff(id);
  const { isReadOnly } = useMockAuth();
  const { pushToast } = useToast();

  const columns = [
    { header: "Name", key: "name", render: (row: FranchiseStaff) => <span className="font-medium text-ink">{row.name}</span> },
    { header: "Email", key: "email", render: (row: FranchiseStaff) => <span className="text-[13px] text-body">{row.email}</span> },
    {
      header: "Role",
      key: "role",
      render: (row: FranchiseStaff) => (
        <StatusBadge tone={row.role === "franchise-admin" ? "info" : "neutral"}>{row.role.replace("-", " ")}</StatusBadge>
      ),
    },
    { header: "Joined", key: "joinedAt", render: (row: FranchiseStaff) => <span className="text-[13px] text-stone">{row.joinedAt}</span> },
    { header: "Last Active", key: "lastActive", render: (row: FranchiseStaff) => <span className="text-[13px] text-stone">{row.lastActive}</span> },
    {
      header: "",
      key: "actions",
      render: (_row: FranchiseStaff) => (
        !isReadOnly ? (
          <Button onClick={() => pushToast({ message: "Staff removal requires Super Admin confirmation.", tone: "warning" })} size="sm" variant="ghost">
            Remove
          </Button>
        ) : null
      ),
    },
  ];

  return (
    <div className="admin-grid">
      <PageHeader
        actions={
          !isReadOnly ? (
            <Button onClick={() => pushToast({ message: "Staff invite flow — available after backend integration.", tone: "info" })} size="md" variant="primary">
              + Invite staff
            </Button>
          ) : undefined
        }
        description={`Staff members with access to the ${territory?.name ?? id} franchise portal.`}
        eyebrow={`${territory?.name ?? id} · Staff management`}
        title="Franchise Staff"
      />
      <Card className="overflow-hidden p-0">
        <DataGrid columns={columns} emptyMessage="No staff members found for this territory." rows={staff} />
      </Card>
    </div>
  );
}
