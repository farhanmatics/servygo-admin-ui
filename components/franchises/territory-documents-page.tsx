"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DataGrid } from "@/components/ui/data-grid";
import { Modal } from "@/components/ui/overlay";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import { getFranchiseDocs, getTerritoryById, docStatusTone, type FranchiseDocument } from "@/lib/mock/franchises";
import { useMockAuth } from "@/components/providers";
import { useToast } from "@/components/providers";

export function TerritoryDocumentsPage({ id }: { id: string }) {
  const territory = getTerritoryById(id);
  const docs = getFranchiseDocs(id);
  const { isReadOnly } = useMockAuth();
  const { pushToast } = useToast();
  const [reviewDoc, setReviewDoc] = useState<FranchiseDocument | null>(null);
  const [rationale, setRationale] = useState("");

  function handleDecision(decision: "approve" | "reject") {
    pushToast({
      message: `Document "${reviewDoc?.title}" ${decision === "approve" ? "approved" : "rejected"}. Audit trail updated.`,
      tone: decision === "approve" ? "success" : "danger",
    });
    setReviewDoc(null);
    setRationale("");
  }

  const columns = [
    { header: "Document", key: "title", render: (row: FranchiseDocument) => <span className="font-medium text-ink">{row.title}</span> },
    { header: "Type", key: "type", render: (row: FranchiseDocument) => <span className="text-[13px] text-body">{row.type.replace(/-/g, " ")}</span> },
    {
      header: "Status",
      key: "status",
      render: (row: FranchiseDocument) => <StatusBadge tone={docStatusTone[row.status]}>{row.status}</StatusBadge>,
    },
    { header: "Uploaded", key: "uploadedAt", render: (row: FranchiseDocument) => <span className="text-[13px] text-stone">{row.uploadedAt}</span> },
    { header: "Expires", key: "expiresAt", render: (row: FranchiseDocument) => <span className="text-[13px] text-stone">{row.expiresAt ?? "N/A"}</span> },
    { header: "Reviewed by", key: "reviewedBy", render: (row: FranchiseDocument) => <span className="text-[13px] text-stone">{row.reviewedBy ?? "Pending"}</span> },
    {
      header: "",
      key: "actions",
      render: (row: FranchiseDocument) =>
        !isReadOnly && row.status === "pending" ? (
          <Button onClick={() => setReviewDoc(row)} size="sm" variant="secondary">Review</Button>
        ) : null,
    },
  ];

  return (
    <div className="admin-grid">
      <PageHeader
        description={`Franchise documents for ${territory?.name ?? id} — business registration, insurance, and agreements.`}
        eyebrow={`${territory?.name ?? id} · Document verification`}
        title="Franchise Documents"
      />
      <Card className="overflow-hidden p-0">
        <DataGrid columns={columns} emptyMessage="No documents uploaded for this franchise." rows={docs} />
      </Card>

      {reviewDoc && (
        <Modal onClose={() => setReviewDoc(null)} title={`Review: ${reviewDoc.title}`}>
          <div className="space-y-4">
            <div className="rounded-lg border border-line bg-panel-muted p-3">
              <p className="text-[12px] text-stone">Type: {reviewDoc.type.replace(/-/g, " ")} · Uploaded: {reviewDoc.uploadedAt}</p>
              {reviewDoc.expiresAt && <p className="text-[12px] text-stone">Expires: {reviewDoc.expiresAt}</p>}
            </div>
            <div className="rounded-lg border border-line bg-panel-muted px-3 py-4 text-[13px] text-stone text-center">
              [Document preview — rendered from S3 pre-signed URL in production]
            </div>
            <div>
              <label className="text-[12px] font-medium text-ink">Decision rationale</label>
              <textarea
                className="mt-1 w-full rounded-lg border border-line bg-panel px-3 py-2 text-[13px] text-ink placeholder:text-stone focus:outline-none focus:ring-2 focus:ring-forest/40"
                onChange={e => setRationale(e.target.value)}
                placeholder="Describe why this document is approved or rejected…"
                rows={3}
                value={rationale}
              />
            </div>
            <div className="flex gap-2">
              <Button disabled={!rationale.trim()} onClick={() => handleDecision("approve")} size="md" variant="primary">Approve</Button>
              <Button disabled={!rationale.trim()} onClick={() => handleDecision("reject")} size="md" variant="danger">Reject</Button>
              <Button onClick={() => setReviewDoc(null)} size="md" variant="ghost">Cancel</Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
