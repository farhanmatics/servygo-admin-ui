"use client";

import { useState } from "react";
import { useMockAuth, useToast } from "@/components/providers";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Field, Textarea } from "@/components/ui/input";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import { emergencyControls } from "@/lib/mock/operations";

export function EmergencyControlsPage() {
  const { isReadOnly } = useMockAuth();
  const { pushToast } = useToast();
  const [note, setNote] = useState("");

  return (
    <div className="admin-grid">
      <PageHeader
        description="Emergency controls should be explicit, reasoned, and reversible. Every action should capture operator intent for the audit trail."
        eyebrow="Emergency controls"
        title="Operations Emergency Panel"
      />

      <section className="grid gap-4 md:grid-cols-2">
        {emergencyControls.map((control) => (
          <Card key={control.id}>
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-[1.1rem] leading-none">{control.label}</h3>
              <StatusBadge tone={control.tone}>{control.tone}</StatusBadge>
            </div>
            <p className="mt-3 text-[13px] leading-6 text-body">{control.description}</p>
            <Button
              className="mt-4"
              disabled={isReadOnly || !note.trim()}
              onClick={() =>
                pushToast({
                  tone: control.tone,
                  message: `Mock emergency action queued: ${control.label}.`,
                })
              }
              size="sm"
              variant={control.tone === "danger" ? "danger" : control.tone === "success" ? "success" : "secondary"}
            >
              Trigger action
            </Button>
          </Card>
        ))}
      </section>

      <Card>
        <div className="eyebrow">Audit note</div>
        <Field hint="Emergency actions require a reason, impact summary, and approval owner." label="Control rationale">
          <Textarea
            onChange={(event) => setNote(event.target.value)}
            placeholder="Capture why this control is needed and who approved it..."
            value={note}
          />
        </Field>
      </Card>
    </div>
  );
}
