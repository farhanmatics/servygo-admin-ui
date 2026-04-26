"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DataGrid } from "@/components/ui/data-grid";
import { ActiveFilters, FilterBar } from "@/components/ui/filter-bar";
import { Field, Input, Select } from "@/components/ui/input";
import { Modal } from "@/components/ui/overlay";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import { useMockAuth, useToast } from "@/components/providers";
import {
  documentTypeLabel,
  getComplianceRecords,
  subjectTypeLabel,
  verificationStatusTone,
  type SubjectType,
  type VerificationRecord,
  type VerificationStatus,
} from "@/lib/mock/compliance";
import { formatDateCA, maskIdentifier } from "@/lib/format";

export function ComplianceDocumentsPage() {
  const { isReadOnly } = useMockAuth();
  const { pushToast } = useToast();
  const [status, setStatus] = useState<VerificationStatus | "all">("all");
  const [subject, setSubject] = useState<SubjectType | "all">("all");
  const [query, setQuery] = useState("");
  const [bulkModalOpen, setBulkModalOpen] = useState(false);
  const [bulkDecision, setBulkDecision] = useState<"approve" | "reject" | "">("");
  const [bulkRationale, setBulkRationale] = useState("");
  const rows = getComplianceRecords();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter((row) => {
      const statusMatch = status === "all" ? true : row.status === status;
      const subjectMatch = subject === "all" ? true : row.subjectType === subject;
      const queryMatch =
        q.length === 0
          ? true
          : [row.id, row.entityName, row.entityId, row.territory, documentTypeLabel[row.documentType]].some((value) =>
              value.toLowerCase().includes(q),
            );
      return statusMatch && subjectMatch && queryMatch;
    });
  }, [query, rows, status, subject]);

  const columns = [
    {
      header: "Verification",
      key: "id",
      render: (row: VerificationRecord) => (
        <>
          <Link className="font-medium text-ink hover:text-forest" href={`/compliance/documents/${row.id}`}>
            {row.id}
          </Link>
          <div className="mt-1 text-[12px] text-stone">{row.createdAt}</div>
        </>
      ),
    },
    {
      header: "Entity",
      key: "entity",
      render: (row: VerificationRecord) => (
        <div className="text-[13px] leading-6 text-body">
          <div>{row.entityName}</div>
          <div className="text-stone">
              {maskIdentifier(row.entityId)} - {subjectTypeLabel[row.subjectType]}
          </div>
        </div>
      ),
    },
    {
      header: "Document",
      key: "doc",
      render: (row: VerificationRecord) => <span className="text-[13px] text-body">{documentTypeLabel[row.documentType]}</span>,
    },
    {
      header: "Expiry",
      key: "expiry",
      render: (row: VerificationRecord) => <span className="text-[13px] text-body">{formatDateCA(row.expiryDate)}</span>,
    },
    {
      header: "Status",
      key: "status",
      render: (row: VerificationRecord) => <StatusBadge tone={verificationStatusTone[row.status]}>{row.status}</StatusBadge>,
    },
  ];

  const pendingCount = filtered.filter(r => r.status === "pending-review").length;

  function handleBulkSubmit() {
    pushToast({
      message: `Bulk ${bulkDecision}: ${pendingCount} pending document(s) processed. Audit trail updated.`,
      tone: bulkDecision === "approve" ? "success" : "danger",
    });
    setBulkModalOpen(false);
    setBulkDecision("");
    setBulkRationale("");
  }

  return (
    <div className="admin-grid">
      <PageHeader
        actions={
          <div className="flex gap-2">
            {!isReadOnly && pendingCount > 0 && (
              <Button onClick={() => setBulkModalOpen(true)} size="md" variant="secondary">
                Bulk action ({pendingCount})
              </Button>
            )}
            <Link href="/compliance/history">
              <Button size="md" variant="secondary">
                Verification history
              </Button>
            </Link>
          </div>
        }
        description="Document verification queue should help reviewers approve safely, reject with reasons, and request precise resubmissions."
        eyebrow="Document verification"
        title="Pending Verifications"
      />

      {bulkModalOpen && (
        <Modal onClose={() => setBulkModalOpen(false)} title={`Bulk verification — ${pendingCount} pending documents`}>
          <div className="space-y-4">
            <p className="text-[13px] text-body">Apply a single decision to all <span className="font-medium text-ink">{pendingCount}</span> currently-visible pending documents. Individual decisions are still recommended for complex cases.</p>
            <div className="flex gap-2">
              {(["approve", "reject"] as const).map(d => (
                <button
                  className={`rounded-lg border px-4 py-2 text-[13px] font-medium transition-colors ${bulkDecision === d ? "border-forest bg-forest text-cream" : "border-line bg-panel text-body hover:border-ink"}`}
                  key={d}
                  onClick={() => setBulkDecision(d)}
                >
                  {d.charAt(0).toUpperCase() + d.slice(1)} all
                </button>
              ))}
            </div>
            <div>
              <label className="text-[12px] font-medium text-ink">Shared rationale (required)</label>
              <textarea
                className="mt-1 w-full rounded-lg border border-line bg-panel px-3 py-2 text-[13px] text-ink placeholder:text-stone focus:outline-none focus:ring-2 focus:ring-forest/40"
                onChange={e => setBulkRationale(e.target.value)}
                placeholder="Provide a shared reason for this bulk decision…"
                rows={3}
                value={bulkRationale}
              />
            </div>
            <div className="flex gap-2">
              <Button disabled={!bulkDecision || !bulkRationale.trim()} onClick={handleBulkSubmit} size="md" variant="primary">
                Confirm bulk {bulkDecision || "decision"}
              </Button>
              <Button onClick={() => setBulkModalOpen(false)} size="md" variant="ghost">Cancel</Button>
            </div>
          </div>
        </Modal>
      )}
      <Card className="overflow-hidden p-0">
        <div className="border-b border-line px-4 py-3">
          <FilterBar>
            <Field label="Search">
              <Input onChange={(event) => setQuery(event.target.value)} placeholder="Verification ID, entity, territory, document type" value={query} />
            </Field>
            <Field label="Status">
              <Select onChange={(event) => setStatus(event.target.value as VerificationStatus | "all")} value={status}>
                <option value="all">All statuses</option>
                <option value="pending-review">pending-review</option>
                <option value="approved">approved</option>
                <option value="rejected">rejected</option>
                <option value="needs-resubmission">needs-resubmission</option>
                <option value="expired-soon">expired-soon</option>
              </Select>
            </Field>
            <Field label="Subject">
              <Select onChange={(event) => setSubject(event.target.value as SubjectType | "all")} value={subject}>
                <option value="all">All subjects</option>
                <option value="provider">provider</option>
                <option value="worker">worker</option>
              </Select>
            </Field>
          </FilterBar>
          <div className="mt-3 px-4 pb-4">
            <ActiveFilters
              items={[
                status === "all" ? "All statuses" : `Status: ${status}`,
                subject === "all" ? "All subjects" : `Subject: ${subject}`,
                query.trim() ? `Search: ${query.trim()}` : "No search query",
              ]}
            />
          </div>
        </div>
        <DataGrid columns={columns} rows={filtered} />
      </Card>
    </div>
  );
}
