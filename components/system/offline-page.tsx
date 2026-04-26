import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";

export function OfflinePage() {
  return (
    <div className="admin-grid">
      <PageHeader description="Offline/degraded mode communicates partial service availability and recommended operator fallback actions." eyebrow="System utility" title="Offline / Degraded Mode" />
      <Card>
        <p className="text-[13px] text-body">
          Some real-time integrations are currently unavailable. Continue with queue triage and record manual notes for deferred sync.
        </p>
      </Card>
    </div>
  );
}
