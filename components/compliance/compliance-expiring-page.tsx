import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import { getComplianceRecords, verificationStatusTone } from "@/lib/mock/compliance";
import { formatDateCA } from "@/lib/format";

export function ComplianceExpiringPage() {
  const expiring = getComplianceRecords().filter((item) => item.status === "expired-soon");

  return (
    <div className="admin-grid">
      <PageHeader
        description="Expiry board keeps upcoming renewals visible so providers and workers do not fall out of verified state unexpectedly."
        eyebrow="Expiry monitoring"
        title="Expiring Documents"
      />
      <Card>
        <div className="space-y-3">
          {expiring.map((item) => (
            <div className="rounded-2xl border border-warning/20 bg-warning-soft p-3" key={item.id}>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="text-[13px] font-medium text-ink">
                  {item.id} - {item.entityName}
                </div>
                <StatusBadge tone={verificationStatusTone[item.status]}>{item.status}</StatusBadge>
              </div>
              <p className="mt-1 text-[12px] text-body">
                Expires {formatDateCA(item.expiryDate)} - {item.territory}
              </p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
