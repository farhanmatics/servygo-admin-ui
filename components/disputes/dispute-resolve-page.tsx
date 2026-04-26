"use client";

import { useState } from "react";
import { useToast } from "@/components/providers";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Field, Select, Textarea } from "@/components/ui/input";
import { PageHeader } from "@/components/ui/page-header";
import { type DisputeProfile } from "@/lib/mock/disputes";

export function DisputeResolvePage({ dispute }: { dispute: DisputeProfile }) {
  const { pushToast } = useToast();
  const [outcome, setOutcome] = useState(dispute.outcomeOptions[0] ?? "");
  const [rationale, setRationale] = useState("");

  return (
    <div className="admin-grid">
      <PageHeader
        description="Resolution decisions must be explicit, reasoned, and audit-ready."
        eyebrow={dispute.id}
        title="Resolve dispute"
      />
      <Card>
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Outcome">
            <Select onChange={(event) => setOutcome(event.target.value)} value={outcome}>
              {dispute.outcomeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Decision rationale">
            <Textarea
              onChange={(event) => setRationale(event.target.value)}
              placeholder="Capture why this outcome is fair and defensible..."
              value={rationale}
            />
          </Field>
        </div>
        <div className="mt-4">
          <Button
            disabled={!outcome || !rationale.trim()}
            onClick={() =>
              pushToast({
                tone: "success",
                message: `Mock dispute resolution saved for ${dispute.id}: ${outcome}.`,
              })
            }
            size="sm"
          >
            Confirm resolution
          </Button>
        </div>
      </Card>
    </div>
  );
}
