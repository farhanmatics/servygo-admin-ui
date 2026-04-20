import { Card, MetricCard } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { adminRoleLabels } from "@/lib/mock/admin-shell";
import { getPermissionLabel, getPermissionTone, type AdminUserProfile } from "@/lib/mock/admins";

export function AdminOverviewPage({ admin }: { admin: AdminUserProfile }) {
  return (
    <div className="grid gap-4 xl:grid-cols-[minmax(0,1.3fr)_minmax(320px,0.75fr)]">
      <Card>
        <div className="eyebrow">Permission summary</div>
        <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {Object.entries(admin.permissions).map(([category, level]) => (
            <div key={category} className="rounded-2xl border border-line bg-panel-muted p-3">
              <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-stone">
                {category}
              </div>
              <div className="mt-2">
                <StatusBadge tone={getPermissionTone(level)}>{getPermissionLabel(level)}</StatusBadge>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid gap-4">
        <MetricCard
          delta={admin.createdAt}
          label="Current role"
          tone="info"
          value={adminRoleLabels[admin.role]}
        />
        <MetricCard
          delta="Operational footprint"
          label="Assigned queues"
          tone="success"
          value={String(admin.assignedQueues.length)}
        />
        <Card>
          <div className="eyebrow">Internal notes</div>
          <div className="mt-4 space-y-3">
            {admin.auditNotes.map((note) => (
              <div key={note} className="rounded-2xl border border-line bg-panel-muted px-3 py-3">
                <p className="text-dense text-body">{note}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
