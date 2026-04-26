"use client";

import { useState } from "react";
import { useToast } from "@/components/providers";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Field, Select, Textarea } from "@/components/ui/input";
import { PageHeader } from "@/components/ui/page-header";
import { type DisputeProfile } from "@/lib/mock/disputes";

const escalationTargets = ["Support lead", "Operations lead", "Finance lead", "Executive review"];

export function DisputeEscalatePage({ dispute }: { dispute: DisputeProfile }) {
  const { pushToast } = useToast();
  const [target, setTarget] = useState(escalationTargets[0]);
  const [reason, setReason] = useState("");

  return (
    <div className="admin-grid">
      <PageHeader description="Escalations should capture owner, reason, and expected decision timeline." eyebrow={dispute.id} title="Escalate dispute" />
      <Card>
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Escalation target">
            <Select onChange={(event) => setTarget(event.target.value)} value={target}>
              {escalationTargets.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Escalation note">
            <Textarea
              onChange={(event) => setReason(event.target.value)}
              placeholder="Capture blocker, risk, and requested decision..."
              value={reason}
            />
          </Field>
        </div>
        <div className="mt-4">
          <Button
            disabled={!reason.trim()}
            onClick={() =>
              pushToast({
                tone: "warning",
                message: `Mock escalation queued for ${dispute.id} to ${target}.`,
              })
            }
            size="sm"
            variant="secondary"
          >
            Confirm escalation
          </Button>
        </div>
      </Card>
    </div>
  );
}
