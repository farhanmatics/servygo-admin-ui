"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DataGrid } from "@/components/ui/data-grid";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import { getFraudRules, fraudRuleStatusTone, type FraudRule } from "@/lib/mock/platform-config";
import { useMockAuth } from "@/components/providers";
import { useToast } from "@/components/providers";
import { formatDateCA } from "@/lib/format";

const TARGET_COLORS: Record<string, string> = {
  customer: "bg-info/10 text-info border-info/20",
  provider: "bg-warning/10 text-warning border-warning/20",
  worker: "bg-forest/10 text-forest border-forest/20",
};

const ACTION_LABELS: Record<string, string> = {
  "flag-for-review": "Flag for review",
  "notify-admin": "Notify admin",
  "auto-suspend": "Auto-suspend",
};

export function SettingsFraudRulesPage() {
  const { isReadOnly } = useMockAuth();
  const { pushToast } = useToast();
  const rules = getFraudRules();
  const [targetFilter, setTargetFilter] = useState("all");

  const filtered = targetFilter === "all" ? rules : rules.filter(r => r.target === targetFilter);

  const columns = [
    {
      header: "Rule",
      key: "name",
      render: (row: FraudRule) => (
        <div>
          <p className="font-medium text-ink">{row.name}</p>
          <p className="text-[11px] text-stone">{row.description}</p>
        </div>
      ),
    },
    {
      header: "Target",
      key: "target",
      render: (row: FraudRule) => (
        <span className={`inline-flex rounded-full border px-2 py-0.5 text-[11px] font-medium ${TARGET_COLORS[row.target]}`}>
          {row.target}
        </span>
      ),
    },
    { header: "Threshold", key: "threshold", render: (row: FraudRule) => <span className="text-[12px] text-body">{row.threshold}</span> },
    {
      header: "Action",
      key: "action",
      render: (row: FraudRule) => <span className="text-[12px] text-stone">{ACTION_LABELS[row.action] ?? row.action}</span>,
    },
    { header: "Triggered", key: "triggeredCount", render: (row: FraudRule) => <span className="tabular-nums text-[13px] text-ink">{row.triggeredCount}</span> },
    {
      header: "Last triggered",
      key: "lastTriggeredAt",
      render: (row: FraudRule) => (
        <span className="text-[12px] text-stone">
          {row.lastTriggeredAt ? formatDateCA(row.lastTriggeredAt) : "Never"}
        </span>
      ),
    },
    {
      header: "Status",
      key: "status",
      render: (row: FraudRule) => (
        <StatusBadge tone={fraudRuleStatusTone[row.status]}>{row.status}</StatusBadge>
      ),
    },
    {
      header: "",
      key: "actions",
      render: (row: FraudRule) =>
        !isReadOnly ? (
          <Button
            onClick={() => pushToast({ message: `Fraud rule "${row.name}" ${row.status === "enabled" ? "disabled" : "enabled"}. Audit logged.`, tone: "info" })}
            size="sm"
            variant="ghost"
          >
            {row.status === "enabled" ? "Disable" : "Enable"}
          </Button>
        ) : null,
    },
  ];

  const enabled = rules.filter(r => r.status === "enabled").length;
  const monitoring = rules.filter(r => r.status === "monitoring").length;
  const totalTriggered = rules.reduce((a, r) => a + r.triggeredCount, 0);

  return (
    <div className="admin-grid">
      <PageHeader
        description="Configure rule-based fraud detection thresholds for customers, providers, and workers. All flags go to admin review — no automated punitive action."
        eyebrow="Platform configuration"
        title="Fraud Detection Rules"
      />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Enabled rules", value: enabled.toString() },
          { label: "Monitoring", value: monitoring.toString() },
          { label: "Total rules", value: rules.length.toString() },
          { label: "Total flags raised", value: totalTriggered.toString() },
        ].map(card => (
          <Card key={card.label} className="flex flex-col gap-1">
            <p className="text-[11px] uppercase tracking-wide text-stone">{card.label}</p>
            <p className="text-[1.5rem] font-semibold leading-none text-ink">{card.value}</p>
          </Card>
        ))}
      </div>

      {/* Filter */}
      <div className="flex gap-2">
        {["all", "customer", "provider", "worker"].map(t => (
          <button
            className={`rounded-full border px-3 py-1 text-[12px] font-medium transition-colors ${targetFilter === t ? "border-forest bg-forest text-cream" : "border-line bg-panel text-body hover:border-ink hover:text-ink"}`}
            key={t}
            onClick={() => setTargetFilter(t)}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      <Card className="overflow-hidden p-0">
        <DataGrid columns={columns} emptyMessage="No fraud rules match the current filter." rows={filtered} />
      </Card>

      <div className="rounded-xl border border-line bg-panel-muted px-4 py-3">
        <p className="text-[13px] font-medium text-ink">Policy note</p>
        <p className="text-[12px] text-stone mt-1">All fraud rule triggers result in a human-review flag only. No automated account suspension occurs. Punitive action requires explicit admin confirmation. This aligns with TRD Section 5 (Fraud Detection) and PIPEDA guidance.</p>
      </div>
    </div>
  );
}
