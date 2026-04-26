"use client";

import { useToast } from "@/components/providers";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";

export function AlertRulesPage() {
  const { pushToast } = useToast();
  const rules = [
    "SLA breach risk > 15 minutes",
    "Provider document expiry < 30 days",
    "Payout batch blocked by verification mismatch",
    "Dispute critical queue exceeds threshold",
  ];

  return (
    <div className="admin-grid">
      <PageHeader description="Alert rule templates define when operational attention is required and through which channels." eyebrow="Alert rules" title="Alert Rule Templates" />
      <Card>
        <div className="space-y-2">
          {rules.map((rule) => (
            <div className="rounded-xl border border-line bg-panel-muted px-3 py-2" key={rule}>
              <p className="text-[12px] text-body">{rule}</p>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <Button
            onClick={() =>
              pushToast({
                tone: "success",
                message: "Mock alert rule preview saved.",
              })
            }
            size="sm"
            variant="secondary"
          >
            Save rule set
          </Button>
        </div>
      </Card>
    </div>
  );
}
