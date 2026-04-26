import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { privacySupportNotes } from "@/lib/mock/privacy";

export function PrivacySupportPage() {
  return (
    <div className="admin-grid">
      <PageHeader description="Privacy support page summarizes safe handling expectations for PII-heavy admin workflows." eyebrow="Privacy & legal support" title="Privacy Handling Support" />
      <Card>
        <div className="space-y-2">
          {privacySupportNotes.map((item) => (
            <div className="rounded-xl border border-line bg-panel-muted px-3 py-2" key={item}>
              <p className="text-[12px] text-body">{item}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
