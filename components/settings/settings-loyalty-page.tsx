import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";

export function SettingsLoyaltyPage() {
  return (
    <div className="admin-grid">
      <PageHeader description="Loyalty configuration controls repeat-booking incentives and campaign eligibility rules." eyebrow="Platform configuration" title="Loyalty Settings" />
      <Card>
        <div className="space-y-2">
          {[
            "Tier 1: 2% credit after 5 completed bookings.",
            "Tier 2: 5% credit after 15 completed bookings.",
            "Provider loyalty bonus review scheduled monthly.",
          ].map((item) => (
            <div className="rounded-xl border border-line bg-panel-muted px-3 py-2" key={item}>
              <p className="text-[12px] text-body">{item}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
