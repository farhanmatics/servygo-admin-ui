"use client";

import { useToast } from "@/components/providers";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { scheduledReports } from "@/lib/mock/analytics";

export function ScheduledReportsPage() {
  const { pushToast } = useToast();

  return (
    <div className="admin-grid">
      <PageHeader
        description="Scheduled reports should keep recipients, cadence, and export formats explicit for audit and operations alignment."
        eyebrow="Scheduled reporting"
        title="Scheduled Reports"
      />
      <Card>
        <div className="space-y-2">
          {scheduledReports.map((report) => (
            <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-line bg-panel-muted px-3 py-2" key={report}>
              <p className="text-[12px] text-body">{report}</p>
              <Button
                onClick={() =>
                  pushToast({
                    tone: "success",
                    message: `Mock report run queued: ${report}.`,
                  })
                }
                size="sm"
                variant="secondary"
              >
                Run now
              </Button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
