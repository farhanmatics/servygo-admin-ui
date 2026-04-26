"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DataGrid } from "@/components/ui/data-grid";
import { Modal } from "@/components/ui/overlay";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import { useMockAuth } from "@/components/providers";
import { useToast } from "@/components/providers";

type ResponseStatus = "pending-review" | "approved" | "removed";
type ReviewResponse = {
  id: string;
  reviewId: string;
  reviewSummary: string;
  provider: string;
  responseText: string;
  submittedAt: string;
  status: ResponseStatus;
};

const STATUS_TONE: Record<ResponseStatus, "warning" | "success" | "danger"> = {
  "pending-review": "warning",
  approved: "success",
  removed: "danger",
};

const mockResponses: ReviewResponse[] = [
  {
    id: "RR-001",
    reviewId: "REV-0041",
    reviewSummary: "The cleaner arrived late and missed two rooms. 2 stars.",
    provider: "CleanPro SK Ltd.",
    responseText: "We sincerely apologize for the delay. Our team member experienced a vehicle issue that day. We offered the customer a complimentary re-clean which was accepted.",
    submittedAt: "2026-04-20",
    status: "approved",
  },
  {
    id: "RR-002",
    reviewId: "REV-0058",
    reviewSummary: "Car detailing was excellent! Very thorough. 5 stars.",
    provider: "Ahmed Sharif",
    responseText: "Thank you so much! It was a pleasure working on your vehicle. We hope to serve you again.",
    submittedAt: "2026-04-22",
    status: "approved",
  },
  {
    id: "RR-003",
    reviewId: "REV-0072",
    reviewSummary: "Completely unprofessional. Left without finishing. 1 star.",
    provider: "Speedy Move Inc.",
    responseText: "This review is false and defamatory. The customer repeatedly changed the scope. We reserve the right to take legal action.",
    submittedAt: "2026-04-24",
    status: "pending-review",
  },
  {
    id: "RR-004",
    reviewId: "REV-0081",
    reviewSummary: "Good service but a bit expensive. 3 stars.",
    provider: "Pacific Clean Co.",
    responseText: "We appreciate the feedback! Our pricing reflects the quality and eco-friendly products we use. Happy to discuss custom packages.",
    submittedAt: "2026-04-25",
    status: "pending-review",
  },
  {
    id: "RR-005",
    reviewId: "REV-0033",
    reviewSummary: "Provider was rude and threatening. 1 star.",
    provider: "AB Clean Squad",
    responseText: "The customer was verbally abusive to our staff. We stand by our team.",
    submittedAt: "2026-04-15",
    status: "removed",
  },
];

export function ReviewResponsesPage() {
  const { isReadOnly } = useMockAuth();
  const { pushToast } = useToast();
  const [reviewing, setReviewing] = useState<ReviewResponse | null>(null);
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = statusFilter === "all" ? mockResponses : mockResponses.filter(r => r.status === statusFilter);

  function handleDecision(decision: "approve" | "remove") {
    pushToast({
      message: `Response from ${reviewing?.provider} ${decision === "approve" ? "approved and published" : "removed from platform"}. Audit logged.`,
      tone: decision === "approve" ? "success" : "danger",
    });
    setReviewing(null);
  }

  const columns = [
    {
      header: "Review",
      key: "reviewSummary",
      render: (row: ReviewResponse) => (
        <div>
          <p className="text-[12px] italic text-stone">"{row.reviewSummary}"</p>
          <p className="text-[11px] text-stone">ID: {row.reviewId}</p>
        </div>
      ),
    },
    {
      header: "Provider response",
      key: "responseText",
      render: (row: ReviewResponse) => (
        <p className="max-w-xs text-[12px] text-body line-clamp-2">{row.responseText}</p>
      ),
    },
    { header: "Provider", key: "provider", render: (row: ReviewResponse) => <span className="text-[13px] text-body">{row.provider}</span> },
    { header: "Submitted", key: "submittedAt", render: (row: ReviewResponse) => <span className="text-[13px] text-stone">{row.submittedAt}</span> },
    {
      header: "Status",
      key: "status",
      render: (row: ReviewResponse) => <StatusBadge tone={STATUS_TONE[row.status]}>{row.status.replace("-", " ")}</StatusBadge>,
    },
    {
      header: "",
      key: "actions",
      render: (row: ReviewResponse) =>
        !isReadOnly && row.status === "pending-review" ? (
          <Button onClick={() => setReviewing(row)} size="sm" variant="secondary">Review</Button>
        ) : null,
    },
  ];

  const pending = mockResponses.filter(r => r.status === "pending-review").length;

  return (
    <div className="admin-grid">
      <PageHeader
        description="Manage provider responses to customer reviews. Responses in violation of community standards can be removed."
        eyebrow="Review moderation"
        title="Review Responses"
      />

      {pending > 0 && (
        <div className="rounded-xl border border-warning/40 bg-warning/5 px-4 py-3">
          <p className="text-[13px] font-medium text-ink">{pending} response{pending > 1 ? "s" : ""} pending moderation review</p>
          <p className="text-[12px] text-stone">Review provider responses for policy compliance before they are visible to customers.</p>
        </div>
      )}

      <div className="flex gap-2">
        {["all", "pending-review", "approved", "removed"].map(s => (
          <button
            className={`rounded-full border px-3 py-1 text-[12px] font-medium transition-colors ${statusFilter === s ? "border-forest bg-forest text-cream" : "border-line bg-panel text-body hover:border-ink hover:text-ink"}`}
            key={s}
            onClick={() => setStatusFilter(s)}
          >
            {s === "all" ? "All" : s.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase())}
          </button>
        ))}
      </div>

      <Card className="overflow-hidden p-0">
        <DataGrid columns={columns} emptyMessage="No review responses found." rows={filtered} />
      </Card>

      {reviewing && (
        <Modal onClose={() => setReviewing(null)} title={`Review response — ${reviewing.provider}`}>
          <div className="space-y-4">
            <div className="rounded-lg border border-line bg-panel-muted p-3">
              <p className="text-[11px] text-stone mb-1">Original customer review (ID: {reviewing.reviewId}):</p>
              <p className="text-[13px] italic text-body">"{reviewing.reviewSummary}"</p>
            </div>
            <div className="rounded-lg border border-line bg-panel-muted p-3">
              <p className="text-[11px] text-stone mb-1">Provider response:</p>
              <p className="text-[13px] text-body">{reviewing.responseText}</p>
            </div>
            <p className="text-[12px] text-stone">Submitted by {reviewing.provider} on {reviewing.submittedAt}</p>
            <div className="rounded-xl border border-line bg-panel-muted px-3 py-2">
              <p className="text-[12px] text-stone">Moderation guidelines: Remove responses that are threatening, defamatory, contain contact information, or violate community standards.</p>
            </div>
            {!isReadOnly && (
              <div className="flex gap-2">
                <Button onClick={() => handleDecision("approve")} size="md" variant="primary">Approve response</Button>
                <Button onClick={() => handleDecision("remove")} size="md" variant="danger">Remove response</Button>
                <Button onClick={() => setReviewing(null)} size="md" variant="ghost">Cancel</Button>
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
}
