"use client";

import { useState } from "react";
import { useToast } from "@/components/providers";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Modal } from "@/components/ui/overlay";
import { PageHeader } from "@/components/ui/page-header";
import { scheduledReports } from "@/lib/mock/analytics";

const MOCK_RECIPIENTS = [
  "finance-lead@servygo.ca",
  "operations@servygo.ca",
  "ceo@servygo.ca",
];

type DistributionConfig = { report: string; emails: string; cadence: string };

export function ScheduledReportsPage() {
  const { pushToast } = useToast();
  const [distributing, setDistributing] = useState<string | null>(null);
  const [config, setConfig] = useState<DistributionConfig>({ report: "", emails: "", cadence: "weekly" });

  function openDistribute(report: string) {
    setConfig({ report, emails: MOCK_RECIPIENTS.join(", "), cadence: "weekly" });
    setDistributing(report);
  }

  function handleSaveDistribution() {
    pushToast({
      tone: "success",
      message: `Distribution configured for "${distributing}". Recipients notified on ${config.cadence} cadence.`,
    });
    setDistributing(null);
  }

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
              <div className="flex gap-2">
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
                <Button
                  onClick={() => openDistribute(report)}
                  size="sm"
                  variant="ghost"
                >
                  Email distribution
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {distributing && (
        <Modal onClose={() => setDistributing(null)} title={`Email distribution — ${distributing}`}>
          <div className="space-y-4">
            <p className="text-[13px] text-body">Configure automatic email delivery of this report to designated recipients.</p>
            <div>
              <label className="text-[12px] font-medium text-ink">Recipients (comma-separated emails)</label>
              <textarea
                className="mt-1 w-full rounded-lg border border-line bg-panel px-3 py-2 text-[13px] text-ink placeholder:text-stone focus:outline-none focus:ring-2 focus:ring-forest/40"
                onChange={e => setConfig(c => ({ ...c, emails: e.target.value }))}
                rows={3}
                value={config.emails}
              />
            </div>
            <div>
              <label className="text-[12px] font-medium text-ink">Delivery cadence</label>
              <select
                className="mt-1 w-full rounded-lg border border-line bg-panel px-3 py-2 text-[13px] text-ink focus:outline-none focus:ring-2 focus:ring-forest/40"
                onChange={e => setConfig(c => ({ ...c, cadence: e.target.value }))}
                value={config.cadence}
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly (Monday 08:00 CST)</option>
                <option value="monthly">Monthly (1st of month)</option>
              </select>
            </div>
            <div className="flex gap-2">
              <Button disabled={!config.emails.trim()} onClick={handleSaveDistribution} size="md" variant="primary">Save distribution</Button>
              <Button onClick={() => setDistributing(null)} size="md" variant="ghost">Cancel</Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
