"use client";

import { useToast } from "@/components/providers";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";

export function PrivacyExportsPage() {
  const { pushToast } = useToast();
  const packets = [
    "User access packet (profile + bookings + payments summary)",
    "Consent ledger export (timestamps + policy version)",
    "Deletion confirmation packet (redaction + retention proof)",
  ];

  return (
    <div className="admin-grid">
      <PageHeader description="Privacy exports should generate auditable packets for DSAR and consent workflows." eyebrow="Privacy & legal support" title="Data Export / Audit Packets" />
      <Card>
        <div className="space-y-2">
          {packets.map((item) => (
            <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-line bg-panel-muted px-3 py-2" key={item}>
              <p className="text-[12px] text-body">{item}</p>
              <Button
                onClick={() => pushToast({ tone: "success", message: `Mock privacy export queued: ${item}.` })}
                size="sm"
                variant="secondary"
              >
                Generate
              </Button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
