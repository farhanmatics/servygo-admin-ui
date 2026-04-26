"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import { getTerritoryById } from "@/lib/mock/franchises";
import { useMockAuth } from "@/components/providers";
import { useToast } from "@/components/providers";

export function TerritoryOperatorPage({ id }: { id: string }) {
  const territory = getTerritoryById(id);
  const { isReadOnly } = useMockAuth();
  const { pushToast } = useToast();
  const [newOperator, setNewOperator] = useState("");
  const [rationale, setRationale] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!territory) return null;

  function handleAssign() {
    if (!newOperator.trim() || !rationale.trim()) return;
    setSubmitted(true);
    pushToast({ message: `Operator assignment updated for ${territory!.name}. Previous operator notified. Audit logged.`, tone: "success" });
    setNewOperator("");
    setRationale("");
  }

  return (
    <div className="admin-grid">
      <PageHeader
        description={`Assign or reassign the franchise operator responsible for the ${territory.name} territory.`}
        eyebrow={`${territory.name} · Operator assignment`}
        title="Franchise Operator"
      />

      {/* Current operator */}
      <Card>
        <p className="eyebrow mb-3">Current operator</p>
        <div className="flex flex-wrap items-center gap-4">
          <div>
            <p className="text-[1.1rem] font-semibold text-ink">{territory.operator}</p>
            <p className="text-[13px] text-body">{territory.operatorEmail}</p>
          </div>
          <StatusBadge tone="success">Active franchise admin</StatusBadge>
        </div>
        <div className="mt-3 text-[12px] text-stone">Territory operational since: {territory.createdAt}</div>
      </Card>

      {/* Reassign form */}
      {!isReadOnly && (
        <Card>
          <p className="eyebrow mb-3">Reassign franchise operator</p>
          <div className="space-y-4 max-w-sm">
            <div>
              <label className="text-[12px] font-medium text-ink">New operator email or admin ID</label>
              <input
                className="mt-1 w-full rounded-lg border border-line bg-panel px-3 py-2 text-[13px] text-ink placeholder:text-stone focus:outline-none focus:ring-2 focus:ring-forest/40"
                onChange={e => { setNewOperator(e.target.value); setSubmitted(false); }}
                placeholder="e.g. new.operator@servygo.ca"
                type="text"
                value={newOperator}
              />
              <p className="mt-1 text-[11px] text-stone">The new operator must already have a verified admin account.</p>
            </div>
            <div>
              <label className="text-[12px] font-medium text-ink">Reason for reassignment (required)</label>
              <textarea
                className="mt-1 w-full rounded-lg border border-line bg-panel px-3 py-2 text-[13px] text-ink placeholder:text-stone focus:outline-none focus:ring-2 focus:ring-forest/40"
                onChange={e => setRationale(e.target.value)}
                placeholder="Explain why the operator is being changed…"
                rows={3}
                value={rationale}
              />
            </div>
            <Button disabled={!newOperator.trim() || !rationale.trim() || submitted} onClick={handleAssign} size="md" variant="primary">
              {submitted ? "Submitted" : "Assign new operator"}
            </Button>
          </div>
        </Card>
      )}

      {isReadOnly && (
        <Card>
          <p className="text-[13px] text-stone">Operator assignment is restricted to Super Admin. Your current role is read-only.</p>
        </Card>
      )}
    </div>
  );
}
