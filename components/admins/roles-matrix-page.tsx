"use client";

import { useMockAuth, useToast } from "@/components/providers";
import { Button } from "@/components/ui/button";
import { Card, MetricCard } from "@/components/ui/card";
import { DataGrid } from "@/components/ui/data-grid";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import { adminRoleLabels, type AdminRole } from "@/lib/mock/admin-shell";
import { getPermissionLabel, getPermissionTone, getRoleSummary, permissionRows } from "@/lib/mock/admins";

const roleOrder: AdminRole[] = [
  "super-admin",
  "operations-admin",
  "finance-admin",
  "compliance-admin",
  "support-admin",
  "read-only-admin",
];

export function RolesMatrixPage() {
  const { role } = useMockAuth();
  const { pushToast } = useToast();

  const columns = [
    {
      header: "Category",
      key: "category",
      render: (row: (typeof permissionRows)[number]) => (
        <>
          <div className="font-medium text-ink">{row.category}</div>
          <div className="mt-1 text-[12px] text-stone">{row.description}</div>
        </>
      ),
    },
    ...roleOrder.map((adminRole) => ({
      header: adminRoleLabels[adminRole],
      key: adminRole,
      render: (row: (typeof permissionRows)[number]) => (
        <StatusBadge tone={getPermissionTone(row.levels[adminRole])}>
          {getPermissionLabel(row.levels[adminRole])}
        </StatusBadge>
      ),
    })),
  ];

  return (
    <div className="admin-grid">
      <PageHeader
        actions={
          <>
            <Button
              onClick={() =>
                pushToast({
                  tone: "success",
                  message: "Mock permission-matrix export prepared for policy review.",
                })
              }
              size="md"
              variant="secondary"
            >
              Export matrix
            </Button>
            <StatusBadge tone="info">{adminRoleLabels[role]}</StatusBadge>
          </>
        }
        description="This matrix keeps role intent explicit. Even with mocked permissions, the UI should already make access boundaries and edit scope easy to review with stakeholders."
        eyebrow="RBAC"
        title="Roles and Permission Matrix"
      />

      <section className="grid gap-4 xl:grid-cols-3">
        {roleOrder.slice(0, 3).map((adminRole) => {
          const summary = getRoleSummary(adminRole);
          return (
            <MetricCard
              delta={`${summary.viewCount} view categories`}
              key={adminRole}
              label={summary.label}
              tone={summary.manageCount > 4 ? "success" : "info"}
              value={`${summary.manageCount} manage`}
            />
          );
        })}
      </section>

      <Card className="overflow-hidden p-0">
        <div className="border-b border-line px-4 py-3">
          <div className="eyebrow">Permission grid</div>
          <h3 className="mt-1 text-[1.2rem] leading-none">Module access by internal role</h3>
        </div>
        <DataGrid columns={columns} rows={permissionRows} />
      </Card>

      <Card>
        <div className="eyebrow">Policy reminders</div>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {[
            "Super Admin is the only role with platform settings and role-assignment authority.",
            "Read-only Admin keeps broad visibility but should never receive editing permissions.",
            "Finance and Compliance scopes stay intentionally narrow even when they need audit visibility.",
          ].map((item) => (
            <div key={item} className="rounded-2xl border border-line bg-panel-muted px-3 py-3">
              <p className="text-dense text-body">{item}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
