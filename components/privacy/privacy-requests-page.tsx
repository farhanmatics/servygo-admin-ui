import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { dsarQueue } from "@/lib/mock/privacy";

export function PrivacyRequestsPage() {
  return (
    <div className="admin-grid">
      <PageHeader description="DSAR queue should show request status, identity checks, and legal-hold dependencies." eyebrow="Privacy & legal support" title="Consent and DSAR Requests" />
      <Card>
        <div className="space-y-2">
          {dsarQueue.map((item) => (
            <div className="rounded-xl border border-line bg-panel-muted px-3 py-2" key={item}>
              <p className="text-[12px] text-body">{item}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
