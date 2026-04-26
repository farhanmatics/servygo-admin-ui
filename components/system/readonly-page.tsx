import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";

export function ReadonlyPage() {
  return (
    <div className="admin-grid">
      <PageHeader description="Readonly system state explains why write actions are disabled and when full control resumes." eyebrow="System utility" title="Read-only Mode" />
      <Card>
        <p className="text-[13px] text-body">
          System is in read-only mode for data integrity checks. Destructive and write operations remain disabled until validation completes.
        </p>
      </Card>
    </div>
  );
}
