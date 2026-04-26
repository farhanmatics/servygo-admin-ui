import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { platformSettingsHighlights } from "@/lib/mock/settings";

export function SettingsHomePage() {
  return (
    <div className="admin-grid">
      <PageHeader description="Platform settings should make global controls explicit and auditable for super-admin workflows." eyebrow="Platform configuration" title="General Settings" />
      <Card>
        <div className="space-y-2">
          {platformSettingsHighlights.map((item) => (
            <div className="rounded-xl border border-line bg-panel-muted px-3 py-2" key={item}>
              <p className="text-[12px] text-body">{item}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
