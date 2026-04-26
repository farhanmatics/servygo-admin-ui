import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { complianceHistory } from "@/lib/mock/compliance";

export function ComplianceHistoryPage() {
  return (
    <div className="admin-grid">
      <PageHeader
        description="Verification history should preserve who approved, rejected, or requested resubmissions and why."
        eyebrow="Compliance history"
        title="Verification History"
      />
      <Card>
        <div className="space-y-2">
          {complianceHistory.map((entry) => (
            <div className="rounded-xl border border-line bg-panel-muted px-3 py-2" key={entry}>
              <p className="text-[12px] text-body">{entry}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
