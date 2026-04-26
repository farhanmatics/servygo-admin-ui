import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";

export function SettingsCommissionsPage() {
  return (
    <div className="admin-grid">
      <PageHeader description="Commission settings define base rates, exceptions, and split logic across service categories." eyebrow="Platform configuration" title="Commission Settings" />
      <Card>
        <div className="space-y-2">
          {[
            "Cleaning: base 14%, quality bonus +2%.",
            "Logistics: base 16%, peak-hour uplift +1%.",
            "Car detailing: base 15%, weekend surcharge reviewed monthly.",
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
