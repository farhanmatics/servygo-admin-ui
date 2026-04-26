"use client";

import { useState } from "react";
import { useMockAuth, useToast } from "@/components/providers";
import { Button } from "@/components/ui/button";
import { Card, StatPill } from "@/components/ui/card";
import { Field, Textarea } from "@/components/ui/input";
import { Modal } from "@/components/ui/overlay";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import {
  documentTypeLabel,
  subjectTypeLabel,
  verificationStatusTone,
  type VerificationProfile,
} from "@/lib/mock/compliance";

type ActionMode = "approve" | "reject" | "request-more" | null;

export function ComplianceDocumentDetailPage({ record }: { record: VerificationProfile }) {
  const { isReadOnly } = useMockAuth();
  const { pushToast } = useToast();
  const [actionMode, setActionMode] = useState<ActionMode>(null);
  const [note, setNote] = useState("");

  return (
    <div className="admin-grid">
      <PageHeader
        actions={
          <>
            <StatPill label="subject" value={subjectTypeLabel[record.subjectType]} />
            <StatPill label="document" value={documentTypeLabel[record.documentType]} />
            <StatusBadge tone={verificationStatusTone[record.status]}>{record.status}</StatusBadge>
            {!isReadOnly ? (
              <>
                <Button onClick={() => setActionMode("approve")} size="md" variant="success">
                  Approve
                </Button>
                <Button onClick={() => setActionMode("reject")} size="md" variant="danger">
                  Reject
                </Button>
                <Button onClick={() => setActionMode("request-more")} size="md" variant="secondary">
                  Request more docs
                </Button>
              </>
            ) : (
              <StatusBadge tone="warning">Read-only</StatusBadge>
            )}
          </>
        }
        description="Focused review screen should expose only required PII while keeping metadata and audit trail intact."
        eyebrow={record.id}
        title={record.entityName}
      />

      <section className="grid gap-4 xl:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.8fr)]">
        <Card>
          <div className="eyebrow">Document viewer shell</div>
          <p className="mt-2 text-[13px] leading-6 text-stone">
            Render signed URLs and file previews here in API phase. For now, this surface validates reviewer workflow and metadata context.
          </p>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {record.metadata.map((item) => (
              <div className="rounded-2xl border border-line bg-panel-muted p-3" key={item.label}>
                <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-stone">{item.label}</div>
                <p className="mt-2 text-[13px] font-medium text-ink">{item.value}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <div className="eyebrow">Audit timeline</div>
          <div className="mt-3 space-y-2">
            {record.auditHistory.map((event) => (
              <div className="rounded-xl border border-line bg-panel-muted px-3 py-2" key={`${event.timestamp}-${event.title}`}>
                <div className="flex items-center justify-between gap-2">
                  <p className="text-[12px] font-semibold text-ink">{event.title}</p>
                  <StatusBadge tone={event.tone}>{event.tone}</StatusBadge>
                </div>
                <p className="mt-1 text-[12px] text-stone">
                  {event.timestamp} - {event.actor}
                </p>
                <p className="mt-1 text-[12px] text-body">{event.details}</p>
              </div>
            ))}
          </div>
        </Card>
      </section>

      {actionMode ? (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-ink/25 px-4 backdrop-blur-sm">
          <div className="w-full max-w-xl">
            <Modal
              actions={<StatusBadge tone={actionMode === "approve" ? "success" : actionMode === "reject" ? "danger" : "warning"}>{actionMode}</StatusBadge>}
              title={
                actionMode === "approve"
                  ? "Approve document"
                  : actionMode === "reject"
                    ? "Reject document"
                    : "Request additional documents"
              }
            >
              <div className="grid gap-4">
                {actionMode === "request-more" ? (
                  <div className="rounded-2xl border border-line bg-panel-muted p-3">
                    <div className="text-[12px] font-semibold text-ink">Checklist</div>
                    <div className="mt-2 space-y-1">
                      {record.requestChecklist.map((item) => (
                        <p className="text-[12px] text-body" key={item}>
                          - {item}
                        </p>
                      ))}
                    </div>
                  </div>
                ) : null}
                <Field label="Reviewer note">
                  <Textarea
                    onChange={(event) => setNote(event.target.value)}
                    placeholder="Capture the exact rationale for this compliance action..."
                    value={note}
                  />
                </Field>
                <div className="flex flex-wrap gap-2">
                  <Button onClick={() => setActionMode(null)} size="sm" variant="ghost">
                    Cancel
                  </Button>
                  <Button
                    disabled={!note.trim()}
                    onClick={() => {
                      pushToast({
                        tone: actionMode === "approve" ? "success" : actionMode === "reject" ? "danger" : "warning",
                        message:
                          actionMode === "approve"
                            ? `Mock approval saved for ${record.id}.`
                            : actionMode === "reject"
                              ? `Mock rejection saved for ${record.id}.`
                              : `Resubmission request sent for ${record.id}.`,
                      });
                      setActionMode(null);
                      setNote("");
                    }}
                    size="sm"
                    variant={actionMode === "approve" ? "success" : actionMode === "reject" ? "danger" : "secondary"}
                  >
                    Confirm
                  </Button>
                </div>
              </div>
            </Modal>
          </div>
        </div>
      ) : null}
    </div>
  );
}
