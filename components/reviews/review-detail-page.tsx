"use client";

import { useState } from "react";
import { useToast } from "@/components/providers";
import { Button } from "@/components/ui/button";
import { Card, StatPill } from "@/components/ui/card";
import { Field, Textarea } from "@/components/ui/input";
import { Modal } from "@/components/ui/overlay";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import { moderationStatusTone, riskTone, type ReviewProfile } from "@/lib/mock/reviews";

type ActionMode = "approve" | "remove" | null;

export function ReviewDetailPage({ review }: { review: ReviewProfile }) {
  const { pushToast } = useToast();
  const [actionMode, setActionMode] = useState<ActionMode>(null);
  const [note, setNote] = useState("");

  return (
    <div className="admin-grid">
      <PageHeader
        actions={
          <>
            <StatPill label="booking" value={review.bookingId} />
            <StatusBadge tone={moderationStatusTone[review.status]}>{review.status}</StatusBadge>
            <StatusBadge tone={riskTone[review.risk]}>{review.risk}</StatusBadge>
            <Button onClick={() => setActionMode("approve")} size="md" variant="success">
              Approve
            </Button>
            <Button onClick={() => setActionMode("remove")} size="md" variant="danger">
              Remove
            </Button>
          </>
        }
        description="Review detail pairs moderation evidence and rationale capture for defensible outcomes."
        eyebrow={review.id}
        title="Review Detail"
      />
      <section className="grid gap-4 xl:grid-cols-[minmax(0,1.4fr)_minmax(320px,0.8fr)]">
        <Card>
          <div className="eyebrow">Evidence</div>
          <div className="mt-3 space-y-2">
            {review.evidence.map((item) => (
              <div className="rounded-xl border border-line bg-panel-muted px-3 py-2" key={item}>
                <p className="text-[12px] text-body">{item}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-2xl border border-line bg-panel-muted p-3">
            <div className="text-[12px] font-semibold text-ink">Review text</div>
            <p className="mt-2 text-[13px] text-body">{review.snippet}</p>
          </div>
        </Card>
        <Card>
          <div className="eyebrow">Moderation notes</div>
          <div className="mt-3 space-y-2">
            {review.moderationNotes.map((item) => (
              <div className="rounded-xl border border-line bg-panel-muted px-3 py-2" key={item}>
                <p className="text-[12px] text-body">{item}</p>
              </div>
            ))}
          </div>
        </Card>
      </section>

      {actionMode ? (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-ink/25 px-4 backdrop-blur-sm">
          <div className="w-full max-w-xl">
            <Modal actions={<StatusBadge tone={actionMode === "approve" ? "success" : "danger"}>{actionMode}</StatusBadge>} title={actionMode === "approve" ? "Approve review" : "Remove review"}>
              <div className="grid gap-4">
                <Field label="Moderation rationale">
                  <Textarea
                    onChange={(event) => setNote(event.target.value)}
                    placeholder="Capture why this moderation action is appropriate..."
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
                        tone: actionMode === "approve" ? "success" : "warning",
                        message: actionMode === "approve" ? `Mock approval saved for ${review.id}.` : `Mock removal saved for ${review.id}.`,
                      });
                      setActionMode(null);
                      setNote("");
                    }}
                    size="sm"
                    variant={actionMode === "approve" ? "success" : "danger"}
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
