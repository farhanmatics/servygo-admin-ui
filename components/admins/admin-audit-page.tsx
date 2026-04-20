"use client";

import { useMockAuth, useToast } from "@/components/providers";
import { Button } from "@/components/ui/button";
import { Card, MetricCard } from "@/components/ui/card";
import { DataGrid } from "@/components/ui/data-grid";
import { ActiveFilters, FilterBar, SavedViewMenu } from "@/components/ui/filter-bar";
import { Field, Input } from "@/components/ui/input";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import { adminRoleLabels } from "@/lib/mock/admin-shell";
import { adminAuditEntries } from "@/lib/mock/admins";
import { useMemo, useState } from "react";

export function AdminAuditPage() {
  const { role } = useMockAuth();
  const { pushToast } = useToast();
  const [search, setSearch] = useState("");
  const [severity, setSeverity] = useState<"all" | "info" | "warning" | "danger" | "success">("all");

  const filtered = useMemo(
    () =>
      adminAuditEntries.filter((entry) => {
        const query = search.trim().toLowerCase();
        const matchesSearch =
          query.length === 0
            ? true
            : [entry.actorName, entry.entity, entry.actionType, entry.id].some((value) =>
                value.toLowerCase().includes(query),
              );
        const matchesSeverity = severity === "all" ? true : entry.severity === severity;
        return matchesSearch && matchesSeverity;
      }),
    [search, severity],
  );

  const columns = [
    {
      header: "Event",
      key: "event",
      render: (entry: (typeof adminAuditEntries)[number]) => (
        <>
          <div className="font-medium text-ink">{entry.actionType}</div>
          <div className="mt-1 text-[12px] text-stone">{entry.id}</div>
        </>
      ),
    },
    {
      header: "Actor",
      key: "actor",
      render: (entry: (typeof adminAuditEntries)[number]) => (
        <div className="text-[13px] leading-6 text-body">
          <div>{entry.actorName}</div>
          <div className="text-stone">{adminRoleLabels[entry.role]}</div>
        </div>
      ),
    },
    {
      header: "Entity",
      key: "entity",
      render: (entry: (typeof adminAuditEntries)[number]) => (
        <span className="text-[13px] text-body">{entry.entity}</span>
      ),
    },
    {
      header: "When / IP",
      key: "when",
      render: (entry: (typeof adminAuditEntries)[number]) => (
        <div className="text-[13px] leading-6 text-body">
          <div>{entry.timestamp}</div>
          <div className="text-stone">{entry.ipAddress}</div>
        </div>
      ),
    },
    {
      header: "Change record",
      key: "beforeAfter",
      render: (entry: (typeof adminAuditEntries)[number]) => (
        <p className="max-w-lg text-[13px] leading-6 text-body">{entry.beforeAfter}</p>
      ),
    },
    {
      header: "Severity",
      key: "severity",
      render: (entry: (typeof adminAuditEntries)[number]) => (
        <StatusBadge tone={entry.severity}>{entry.severity}</StatusBadge>
      ),
    },
  ];

  return (
    <div className="admin-grid">
      <PageHeader
        actions={
          <>
            <Button
              onClick={() =>
                pushToast({
                  tone: "success",
                  message: "Audit export queued with actor, role, entity, timestamp, IP, and before/after values.",
                })
              }
              size="md"
              variant="secondary"
            >
              Export audit log
            </Button>
            <StatusBadge tone="info">{adminRoleLabels[role]}</StatusBadge>
          </>
        }
        description="Admin-action audit should answer who changed what, when, from where, and how the record changed. This page mirrors the SRS requirement for actor, role, entity, timestamp, IP, and before/after values."
        eyebrow="Admin audit"
        title="Admin Action Log"
      />

      <section className="grid gap-4 xl:grid-cols-4">
        <MetricCard delta="Last 7 days" label="Logged events" tone="info" value="148" />
        <MetricCard delta="Need review" label="Warning events" tone="warning" value="12" />
        <MetricCard delta="Highest sensitivity" label="Destructive actions" tone="danger" value="4" />
        <MetricCard delta="Cross-check exports" label="Audit downloads" tone="success" value="9" />
      </section>

      <Card className="overflow-hidden p-0">
        <div className="border-b border-line px-4 py-3">
          <FilterBar
            actions={
              <>
                <SavedViewMenu label="Saved view: Role changes" />
                <Button onClick={() => setSeverity("all")} size="sm" variant="ghost">
                  Reset
                </Button>
              </>
            }
          >
            <Field label="Search">
              <Input
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Actor, entity, action type, or audit ID"
                value={search}
              />
            </Field>
            <div className="rounded-xl border border-line bg-panel p-2">
              <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-stone">
                Severity
              </div>
              <div className="flex flex-wrap gap-1">
                {(["all", "info", "warning", "danger", "success"] as const).map((value) => (
                  <button
                    className={[
                      "rounded-lg px-2.5 py-1.5 text-[12px] font-medium transition",
                      severity === value ? "bg-panel-muted text-ink shadow-sm" : "text-stone hover:text-ink",
                    ].join(" ")}
                    key={value}
                    onClick={() => setSeverity(value)}
                    type="button"
                  >
                    {value}
                  </button>
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-line bg-panel px-3 py-2 text-[12px] text-stone">
              Visible events: <span className="font-medium text-ink">{filtered.length}</span>
            </div>
          </FilterBar>
          <div className="mt-3 px-4 pb-4">
            <ActiveFilters
              items={[
                severity === "all" ? "All severities" : severity,
                search.trim() ? `Search: ${search.trim()}` : "No search query",
                "Includes actor + before/after",
              ]}
            />
          </div>
        </div>
        <DataGrid columns={columns} rows={filtered} />
      </Card>
    </div>
  );
}
