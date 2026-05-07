"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import { getDisputeById } from "@/lib/mock/disputes";
import { useMockAuth } from "@/components/providers";
import { useToast } from "@/components/providers";

export function DisputeAppealPage({ id }: { id: string }) {
  const dispute = getDisputeById(id);
  const { role, isReadOnly } = useMockAuth();
  const { pushToast } = useToast();
  const [outcome, setOutcome] = useState<"uphold" | "reverse" | "partial" | "">("");
  const [rationale, setRationale] = useState("");
  const [newEvidence, setNewEvidence] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!dispute) {
    return (
      <div className="admin-grid">
        <PageHeader description="" eyebrow="Disputes" title="Dispute not found" />
        <Card><p className="text-[13px] text-stone">Dispute {id} not found.</p></Card>
      </div>
    );
  }

  const isSameReviewer = role === "support-admin";

  function handleSubmit() {
    if (!outcome || !rationale.trim()) return;
    setSubmitted(true);
    pushToast({
      message: `Appeal decision recorded: "${outcome}". Final — no further appeals permitted. Parties notified.`,
      tone: outcome === "reverse" ? "danger" : "success",
    });
  }

  return (
    <div className="admin-grid">
      <PageHeader
        description="Appeal review requires a different reviewer than the original decision. The outcome is final and binding."
        eyebrow={`Disputes · ${id} · Appeal`}
        title="Dispute Appeal Review"
      />

      {/* Policy notice */}
      <div className="rounded-xl border border-warning/40 bg-warning/5 px-4 py-3">
        <p className="text-[13px] font-medium text-ink">Appeal policy</p>
        <ul className="mt-1 space-y-1 text-[12px] text-stone">
          <li>• Appeals must be filed within 7 days of the original decision.</li>
          <li>• New evidence must be provided — previously submitted evidence is not sufficient alone.</li>
          <li>• A different reviewer than the original decision-maker must handle the appeal.</li>
          <li>• The appeal decision is final and binding. No further appeals are permitted.</li>
        </ul>
      </div>

      {/* Reviewer eligibility warning */}
      {isSameReviewer && (
        <div className="rounded-xl border border-danger/40 bg-danger/5 px-4 py-3">
          <p className="text-[13px] font-medium text-ink">Eligibility notice</p>
          <p className="text-[12px] text-stone mt-1">Your role (Support Admin) handled the original dispute resolution. Appeals require a different reviewer. Please escalate to Super Admin or Operations Admin for this appeal.</p>
        </div>
      )}

      {/* Original dispute summary */}
      <Card>
        <p className="eyebrow mb-3">Original dispute — summary</p>
        <div className="space-y-2">
          <div className="flex gap-3">
            <StatusBadge tone="neutral">{dispute.status}</StatusBadge>
            <span className="text-[13px] text-stone">Filed: {dispute.createdAt}</span>
            <span className="text-[13px] text-stone">Priority: {dispute.priority}</span>
          </div>
          <p className="text-[13px] text-body">{dispute.reason}</p>
          <div className="grid grid-cols-2 gap-3 text-[12px] text-stone">
            <span>Customer: <span className="text-ink">{dispute.customer}</span></span>
            <span>Provider: <span className="text-ink">{dispute.provider}</span></span>
          </div>
        </div>
      </Card>

      {/* New evidence */}
      <Card>
        <p className="eyebrow mb-3">New evidence submitted with appeal</p>
        <textarea
          className="w-full rounded-lg border border-line bg-panel px-3 py-2 text-[13px] text-ink placeholder:text-stone focus:outline-none focus:ring-2 focus:ring-forest/40"
          onChange={e => setNewEvidence(e.target.value)}
          placeholder="Describe or paste the new evidence provided by the appealing party. This must be evidence not previously submitted in the original dispute."
          rows={4}
          value={newEvidence}
        />
      </Card>

      {/* Decision */}
      {!isReadOnly && !isSameReviewer && (
        <Card>
          <p className="eyebrow mb-3">Appeal decision</p>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {(["uphold", "reverse", "partial"] as const).map(o => (
                <button
                  className={`rounded-lg border px-4 py-2 text-[13px] font-medium transition-colors ${outcome === o ? "border-forest bg-forest text-cream" : "border-line bg-panel text-body hover:border-ink"}`}
                  key={o}
                  onClick={() => setOutcome(o)}
                >
                  {o === "uphold" ? "Uphold original decision" : o === "reverse" ? "Reverse original decision" : "Partial reversal"}
                </button>
              ))}
            </div>
            <div>
              <label className="text-[12px] font-medium text-ink">Appeal rationale (required — this is the final record)</label>
              <textarea
                className="mt-1 w-full rounded-lg border border-line bg-panel px-3 py-2 text-[13px] text-ink placeholder:text-stone focus:outline-none focus:ring-2 focus:ring-forest/40"
                onChange={e => setRationale(e.target.value)}
                placeholder="Provide a thorough explanation of the appeal outcome. This text will be sent to both parties and retained in the audit record."
                rows={5}
                value={rationale}
              />
            </div>
            <Button
              disabled={!outcome || !rationale.trim() || submitted}
              onClick={handleSubmit}
              size="md"
              variant="primary"
            >
              {submitted ? "Decision recorded" : "Record final decision"}
            </Button>
          </div>
        </Card>
      )}

      <div className="flex gap-2">
        <Link href={`/disputes/${id}`}>
          <Button size="md" variant="ghost">← Back to dispute</Button>
        </Link>
      </div>
    </div>
  );
}
