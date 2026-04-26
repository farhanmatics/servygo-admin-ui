"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useToast } from "@/components/providers";
import { Button } from "@/components/ui/button";
import { Card, MetricCard } from "@/components/ui/card";
import { DataGrid } from "@/components/ui/data-grid";
import { ActiveFilters, FilterBar } from "@/components/ui/filter-bar";
import { Field, Input, Select } from "@/components/ui/input";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import { liveJobs, liveJobStatusTone, liveOpsMetrics, priorityTone, type LiveJob } from "@/lib/mock/operations";

export function LiveJobsPage() {
  const { pushToast } = useToast();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<LiveJob["status"] | "all">("all");

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return liveJobs.filter((job) => {
      const statusMatch = status === "all" ? true : job.status === status;
      const queryMatch =
        query.length === 0
          ? true
          : [job.bookingId, job.customer, job.provider, job.territory, job.city, job.service].some((item) =>
              item.toLowerCase().includes(query),
            );
      return statusMatch && queryMatch;
    });
  }, [search, status]);

  const columns = [
    {
      header: "Booking",
      key: "booking",
      render: (job: LiveJob) => (
        <>
          <Link className="font-medium text-ink hover:text-forest" href={`/bookings/${job.bookingId}`}>
            {job.bookingId}
          </Link>
          <div className="mt-1 text-[12px] text-stone">{job.service}</div>
        </>
      ),
    },
    {
      header: "Customer / Provider",
      key: "party",
      render: (job: LiveJob) => (
        <div className="text-[13px] leading-6 text-body">
          <div>{job.customer}</div>
          <div className="text-stone">{job.provider}</div>
        </div>
      ),
    },
    {
      header: "Territory",
      key: "territory",
      render: (job: LiveJob) => (
        <span className="text-[13px] text-body">
          {job.city} - {job.territory}
        </span>
      ),
    },
    {
      header: "Status",
      key: "status",
      render: (job: LiveJob) => (
        <div className="flex flex-wrap gap-2">
          <StatusBadge tone={liveJobStatusTone[job.status]}>{job.status}</StatusBadge>
          <StatusBadge tone={priorityTone[job.priority]}>{job.priority}</StatusBadge>
        </div>
      ),
    },
    {
      header: "ETA",
      key: "eta",
      render: (job: LiveJob) => <span className="text-[13px] text-body">{job.eta}</span>,
    },
    {
      header: "Actions",
      key: "actions",
      render: (job: LiveJob) => (
        <div className="flex flex-wrap gap-2">
          <Link href={`/bookings/${job.bookingId}/reassign`}>
            <Button size="sm" variant="secondary">
              Reassign
            </Button>
          </Link>
          <Button
            onClick={() =>
              pushToast({
                tone: "info",
                message: `Mock incident drawer opened for ${job.bookingId}.`,
              })
            }
            size="sm"
            variant="ghost"
          >
            Investigate
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="admin-grid">
      <PageHeader
        actions={
          <>
            <Link href="/operations/territories">
              <Button size="md" variant="secondary">
                Territories board
              </Button>
            </Link>
            <Link href="/operations/sla">
              <Button size="md">Open SLA board</Button>
            </Link>
          </>
        }
        description="Live operations should surface map-list style urgency: what is delayed, what needs reassignment, and what is about to breach SLA."
        eyebrow="Live operations"
        title="Live Jobs Monitor"
      />

      <section className="grid gap-4 xl:grid-cols-4">
        {liveOpsMetrics.map((metric) => (
          <MetricCard key={metric.label} delta={metric.delta} label={metric.label} tone={metric.tone} value={metric.value} />
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-[minmax(0,1.55fr)_minmax(320px,0.8fr)]">
        <Card className="overflow-hidden p-0">
          <div className="border-b border-line px-4 py-3">
            <FilterBar>
              <Field label="Search jobs">
                <Input
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Booking, customer, provider, city or territory"
                  value={search}
                />
              </Field>
              <Field label="Status">
                <Select onChange={(event) => setStatus(event.target.value as LiveJob["status"] | "all")} value={status}>
                  <option value="all">All statuses</option>
                  <option value="en-route">en-route</option>
                  <option value="in-progress">in-progress</option>
                  <option value="delayed">delayed</option>
                  <option value="reassignment-needed">reassignment-needed</option>
                  <option value="sla-risk">sla-risk</option>
                </Select>
              </Field>
            </FilterBar>
            <div className="mt-3 px-4 pb-4">
              <ActiveFilters
                items={[
                  status === "all" ? "All statuses" : `Status: ${status}`,
                  search.trim() ? `Search: ${search.trim()}` : "No search query",
                ]}
              />
            </div>
          </div>
          <DataGrid columns={columns} rows={filtered} />
        </Card>

        <Card>
          <div className="eyebrow">Map shell</div>
          <h3 className="mt-2 text-[1.15rem] leading-none">Territory awareness panel</h3>
          <p className="mt-2 text-[13px] leading-6 text-stone">
            This panel stands in for a future map/list hybrid. Keep hot zones, delayed routes, and outage overlays visible before adding map APIs.
          </p>
          <div className="mt-4 space-y-3">
            {[
              "Calgary South: moving-support congestion in evening window.",
              "Saskatoon Core: one enterprise booking at SLA threshold.",
              "Winnipeg North: compliance checks affecting dispatch pace.",
            ].map((item) => (
              <div className="rounded-2xl border border-line bg-panel-muted px-3 py-3" key={item}>
                <p className="text-dense text-body">{item}</p>
              </div>
            ))}
          </div>
        </Card>
      </section>
    </div>
  );
}
