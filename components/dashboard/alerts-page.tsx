"use client";

import { useMockAuth } from "@/components/providers";
import { Button } from "@/components/ui/button";
import { Card, MetricCard, StatPill } from "@/components/ui/card";
import { DataGrid } from "@/components/ui/data-grid";
import { ActiveFilters, FilterBar, SavedViewMenu } from "@/components/ui/filter-bar";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import { alertItems, dashboardMetrics } from "@/lib/mock/admin-shell";

export function AlertsPage() {
  const { role } = useMockAuth();

  const columns = [
    {
      header: "Alert",
      key: "alert",
      render: (item: (typeof alertItems)[number]) => (
        <>
          <div className="font-medium text-ink">{item.title}</div>
          <div className="mt-1 text-[12px] text-stone">{item.id}</div>
        </>
      ),
    },
    {
      header: "Summary",
      key: "summary",
      render: (item: (typeof alertItems)[number]) => (
        <p className="max-w-lg text-[13px] leading-6 text-body">{item.summary}</p>
      ),
    },
    {
      header: "Source",
      key: "source",
      render: (item: (typeof alertItems)[number]) => (
        <span className="text-[13px] text-body">{item.source}</span>
      ),
    },
    {
      header: "Owner",
      key: "owner",
      render: (item: (typeof alertItems)[number]) => (
        <span className="text-[13px] text-body">{item.owner}</span>
      ),
    },
    {
      header: "Age",
      key: "age",
      render: (item: (typeof alertItems)[number]) => (
        <span className="text-[13px] text-body">{item.age}</span>
      ),
    },
    {
      header: "Priority",
      key: "priority",
      render: (item: (typeof alertItems)[number]) => (
        <StatusBadge tone={item.tone}>
          {item.tone === "danger" ? "Critical" : item.tone === "warning" ? "Attention" : "Info"}
        </StatusBadge>
      ),
    },
  ];

  return (
    <div className="admin-grid">
      <PageHeader
        actions={
          <>
            <StatPill label="role" value={role.toUpperCase().replaceAll("-", " ")} />
            <Button size="md" variant="secondary">
              Export alert log
            </Button>
            <Button size="md">Acknowledge selected</Button>
          </>
        }
        description="Full alert center for SLA pressure, payout failures, document expiry, and moderation risk. Operators should be able to scan, sort, and route issues without leaving the console."
        eyebrow="Alert center"
        title="Operational Alerts"
      />

      <section className="grid gap-4 xl:grid-cols-4">
        {dashboardMetrics.map((metric) => (
          <MetricCard
            delta={metric.delta}
            key={metric.label}
            label={metric.label}
            tone={metric.tone}
            value={metric.value}
          />
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-[minmax(0,1.5fr)_minmax(320px,0.85fr)]">
        <Card className="overflow-hidden p-0">
          <div className="border-b border-line px-4 py-3">
            <FilterBar
              actions={
                <>
                  <SavedViewMenu label="Saved view: Critical today" />
                  <Button size="sm" variant="secondary">
                    Route to queue
                  </Button>
                </>
              }
            >
              <div className="rounded-xl border border-line bg-panel px-3 py-2 text-[12px] text-stone">
                Priority: <span className="font-medium text-ink">All</span>
              </div>
              <div className="rounded-xl border border-line bg-panel px-3 py-2 text-[12px] text-stone">
                Source: <span className="font-medium text-ink">All systems</span>
              </div>
              <div className="rounded-xl border border-line bg-panel px-3 py-2 text-[12px] text-stone">
                Territory: <span className="font-medium text-ink">National</span>
              </div>
              <div className="rounded-xl border border-line bg-panel px-3 py-2 text-[12px] text-stone">
                Owner: <span className="font-medium text-ink">Any desk</span>
              </div>
            </FilterBar>
            <div className="mt-3 px-4 pb-4">
              <ActiveFilters items={["All active alerts", "Newest first", "National scope"]} />
            </div>
          </div>
          <DataGrid columns={columns} rows={alertItems} />
        </Card>

        <div className="grid gap-4">
          <Card>
            <div className="eyebrow">Escalation posture</div>
            <h3 className="mt-2 text-[1.15rem] leading-none">What needs acknowledgement first</h3>
            <div className="mt-4 grid gap-3">
              <div className="rounded-2xl border border-danger/20 bg-danger-soft px-3 py-3">
                <div className="text-[12px] font-semibold text-danger">Critical now</div>
                <p className="mt-1 text-[12px] leading-5 text-body">
                  SLA breach risk and payout failures should move to an owner immediately.
                </p>
              </div>
              <div className="rounded-2xl border border-warning/20 bg-warning-soft px-3 py-3">
                <div className="text-[12px] font-semibold text-warning">Next wave</div>
                <p className="mt-1 text-[12px] leading-5 text-body">
                  Expiring documents and moderation spikes need same-day review but can follow active incidents.
                </p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="eyebrow">Territory spread</div>
            <h3 className="mt-2 text-[1.15rem] leading-none">Highest alert density</h3>
            <div className="mt-4 space-y-3">
              {[
                ["Calgary, AB", "2 critical"],
                ["Saskatoon, SK", "1 urgent"],
                ["National finance", "2 blocked batches"],
              ].map(([territory, value]) => (
                <div key={territory} className="flex items-center justify-between rounded-2xl border border-line bg-panel-muted px-3 py-3">
                  <span className="text-[12px] font-medium text-ink">{territory}</span>
                  <StatusBadge tone="warning">{value}</StatusBadge>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
