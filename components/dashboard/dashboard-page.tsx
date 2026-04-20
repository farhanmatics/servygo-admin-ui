"use client";

import { useMockAuth } from "@/components/providers";
import { Button } from "@/components/ui/button";
import { Card, MetricCard, StatPill } from "@/components/ui/card";
import { ColumnVisibilityMenu, DataGrid } from "@/components/ui/data-grid";
import { ActiveFilters, FilterBar, SavedViewMenu } from "@/components/ui/filter-bar";
import { EmptyState } from "@/components/ui/feedback";
import { Pagination } from "@/components/ui/pagination";
import { PageHeader } from "@/components/ui/page-header";
import { RiskBadge } from "@/components/ui/risk-badge";
import { StatusBadge } from "@/components/ui/status-badge";
import { dashboardMetrics, dashboardQueues, dashboardWatchlist, liveBookings, roleDashboardCopy } from "@/lib/mock/admin-shell";

export function DashboardPage() {
  const { isReadOnly, role } = useMockAuth();
  const variant = roleDashboardCopy[role];

  const bookingColumns = [
    {
      header: "Booking",
      key: "booking",
      render: (item: (typeof liveBookings)[number]) => (
        <>
          <div className="font-medium text-ink">{item.booking}</div>
          <div className="mt-1 text-[12px] text-stone">{item.customer}</div>
        </>
      ),
    },
    {
      header: "Service",
      key: "service",
      render: (item: (typeof liveBookings)[number]) => (
        <span className="text-[13px] text-body">{item.service}</span>
      ),
    },
    {
      header: "Territory",
      key: "territory",
      render: (item: (typeof liveBookings)[number]) => (
        <span className="text-[13px] text-body">{item.territory}</span>
      ),
    },
    {
      header: "Provider",
      key: "provider",
      render: (item: (typeof liveBookings)[number]) => (
        <span className="text-[13px] text-body">{item.provider}</span>
      ),
    },
    {
      header: "Status",
      key: "status",
      render: (item: (typeof liveBookings)[number]) => (
        <StatusBadge tone={item.tone}>{item.status}</StatusBadge>
      ),
    },
    {
      header: "Timing",
      key: "timing",
      render: (item: (typeof liveBookings)[number]) => (
        <span className="text-[13px] text-body">{item.eta}</span>
      ),
    },
  ];

  return (
    <div className="admin-grid">
      <PageHeader
        actions={
          <>
            <StatPill label="region" value="CA" />
            {isReadOnly ? <StatusBadge tone="warning">Read-only review</StatusBadge> : null}
            <Button size="md" variant="secondary">
              {variant.secondaryAction}
            </Button>
            <Button size="md">{variant.primaryAction}</Button>
          </>
        }
        description={variant.description}
        eyebrow={variant.focusLabel}
        title="Operational Overview"
      />

      <section className="grid gap-4 xl:grid-cols-[minmax(0,1.7fr)_minmax(320px,0.9fr)]">
        <Card>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="min-w-0 max-w-xl">
              <div className="eyebrow">What needs action now</div>
              <h3 className="mt-2 text-[1.45rem] leading-none">{variant.highlight}</h3>
              <p className="mt-2 max-w-2xl text-[13px] leading-6 text-stone">
                The dashboard stays dense on purpose: operators should be able to scan platform pressure,
                pick a queue, and act without bouncing through empty hero sections.
              </p>
            </div>

            <div className="grid min-w-[340px] gap-4 sm:grid-cols-2">
              {dashboardMetrics.map((metric) => (
                <MetricCard
                  delta={metric.delta}
                  key={metric.label}
                  label={metric.label}
                  tone={metric.tone}
                  value={metric.value}
                />
              ))}
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="eyebrow">Active watchlist</div>
              <h3 className="mt-2 text-[1.2rem] leading-none">Critical items</h3>
            </div>
            <RiskBadge level="high" />
          </div>

          <div className="mt-4 space-y-3">
            {dashboardWatchlist.map((item) => (
              <div key={item} className="rounded-2xl border border-line bg-panel-muted px-3 py-3">
                <p className="text-dense text-body">{item}</p>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <section className="grid gap-4 2xl:grid-cols-[minmax(0,1.65fr)_minmax(320px,0.85fr)]">
        <Card className="overflow-hidden p-0">
          <div className="border-b border-line px-4 py-3">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="eyebrow">Live bookings</div>
                <h3 className="mt-1">Current service pressure</h3>
              </div>
              <StatusBadge tone="danger">3 routes at risk</StatusBadge>
            </div>
          </div>

          <div className="p-4">
            <FilterBar
              actions={
                <>
                  <SavedViewMenu label="Saved view: Delays" />
                  <ColumnVisibilityMenu
                    columns={bookingColumns.map((column) => ({
                      label: column.header,
                      visible: true,
                    }))}
                  />
                  <Button size="sm" variant="secondary">
                    Export
                  </Button>
                </>
              }
            >
              <div className="rounded-xl border border-line bg-panel px-3 py-2 text-[12px] text-stone">
                Territory: <span className="font-medium text-ink">All</span>
              </div>
              <div className="rounded-xl border border-line bg-panel px-3 py-2 text-[12px] text-stone">
                Status: <span className="font-medium text-ink">At risk</span>
              </div>
              <div className="rounded-xl border border-line bg-panel px-3 py-2 text-[12px] text-stone">
                Queue: <span className="font-medium text-ink">Commercial</span>
              </div>
              <div className="rounded-xl border border-line bg-panel px-3 py-2 text-[12px] text-stone">
                Window: <span className="font-medium text-ink">Today</span>
              </div>
            </FilterBar>

            <div className="mt-3">
              <ActiveFilters items={["Delayed only", "SLA watch", "National view"]} />
            </div>
          </div>

          <DataGrid columns={bookingColumns} rows={liveBookings} />
          <div className="border-t border-line px-4 py-3">
            <Pagination />
          </div>
        </Card>

        <div className="grid gap-4">
          {dashboardQueues.map((queue) => (
            <Card key={queue.title}>
              <div className="eyebrow">{queue.title}</div>
              <h3 className="mt-2 text-[1.15rem] leading-none">{queue.summary}</h3>
              <ul className="mt-4 space-y-2">
                {queue.items.map((item) => (
                  <li key={item} className="rounded-2xl border border-line bg-panel-muted px-3 py-2.5">
                    <p className="text-dense text-body">{item}</p>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <Card>
          <div className="eyebrow">Role focus</div>
          <h3 className="mt-2 text-[1.2rem] leading-none">{variant.focusLabel}</h3>
          <p className="mt-2 text-[13px] leading-6 text-stone">{variant.description}</p>

          <div className="mt-4 grid gap-3">
            {[
              "Open the highest-risk queue first so aging work does not hide behind healthy volume.",
              "Document rationale on overrides and escalations so the audit trail survives handoff.",
              "Prefer focused review surfaces when PII or payout-sensitive details are exposed.",
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-line bg-panel-muted px-3 py-3">
                <p className="text-dense text-body">{item}</p>
              </div>
            ))}
          </div>
        </Card>

        <EmptyState
          description="No additional incidents need executive review right now. This slot can later become a chart, escalation rail, or incident summary without changing the page structure."
          title="Queue pressure is contained"
        />
      </section>
    </div>
  );
}
