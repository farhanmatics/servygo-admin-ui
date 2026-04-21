"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useMockAuth } from "@/components/providers";
import { Button } from "@/components/ui/button";
import { Card, MetricCard } from "@/components/ui/card";
import { DataGrid } from "@/components/ui/data-grid";
import { EmptyState } from "@/components/ui/feedback";
import { ActiveFilters, FilterBar, SavedViewMenu } from "@/components/ui/filter-bar";
import { Field, Input } from "@/components/ui/input";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import {
  countPackages,
  countProviderGaps,
  getServiceLocations,
  locationServiceMetrics,
  localStatusTone,
  type LocalStatus,
  type ServiceLocation,
} from "@/lib/mock/services";

export function LocationServicesPage() {
  const { isReadOnly } = useMockAuth();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<LocalStatus | "all">("all");
  const locations = getServiceLocations();

  const filtered = useMemo(
    () =>
      locations.filter((location) => {
        const query = search.trim().toLowerCase();
        const matchesSearch =
          query.length === 0
            ? true
            : [location.city, location.province, location.territory, location.marketLead].some((value) =>
                value.toLowerCase().includes(query),
              );
        const matchesStatus = status === "all" ? true : location.status === status;
        return matchesSearch && matchesStatus;
      }),
    [locations, search, status],
  );

  const columns = [
    {
      header: "Location",
      key: "location",
      render: (location: ServiceLocation) => (
        <>
          <Link className="font-medium text-ink hover:text-forest" href={`/services/locations/${location.id}`}>
            {location.city}, {location.province}
          </Link>
          <div className="mt-1 text-[12px] text-stone">{location.territory}</div>
        </>
      ),
    },
    {
      header: "Location status",
      key: "status",
      render: (location: ServiceLocation) => (
        <StatusBadge tone={localStatusTone[location.status]}>{location.status}</StatusBadge>
      ),
    },
    {
      header: "Enabled services",
      key: "services",
      render: (location: ServiceLocation) => (
        <span className="text-[13px] text-body">{location.services.length} local services</span>
      ),
    },
    {
      header: "Packages",
      key: "packages",
      render: (location: ServiceLocation) => (
        <span className="text-[13px] text-body">{countPackages(location)} configured</span>
      ),
    },
    {
      header: "Provider gaps",
      key: "gaps",
      render: (location: ServiceLocation) => {
        const gaps = countProviderGaps(location);
        return <StatusBadge tone={gaps > 0 ? "danger" : "success"}>{gaps} gaps</StatusBadge>;
      },
    },
    {
      header: "Market lead",
      key: "lead",
      render: (location: ServiceLocation) => (
        <span className="text-[13px] text-body">{location.marketLead}</span>
      ),
    },
  ];

  return (
    <div className="admin-grid">
      <PageHeader
        actions={
          <>
            <Button size="md" variant="secondary">Export matrix</Button>
            {isReadOnly ? (
              <Button disabled size="md" title="Read-only access">
                Add location
              </Button>
            ) : (
              <Link href="/services/locations/new">
                <Button size="md">Add location</Button>
              </Link>
            )}
          </>
        }
        breadcrumbs={[{ label: "Services" }]}
        description="Start with a location, then enable services, subcategories, packages, and local providers. A package becomes customer-bookable only once provider coverage is ready in that location."
        eyebrow="Location-first setup"
        title="Location Service Matrix"
      />

      <section className="grid gap-4 xl:grid-cols-4">
        {locationServiceMetrics.map((metric) => (
          <MetricCard key={metric.label} label={metric.label} value={metric.value} delta={metric.delta} tone={metric.tone} />
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-[minmax(0,1.55fr)_minmax(320px,0.8fr)]">
        <Card className="overflow-hidden p-0">
          <div className="border-b border-line px-4 py-3">
            <FilterBar actions={<SavedViewMenu label="Saved view: Provider gaps" />}>
              <Field label="Search location">
                <Input
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="City, province, territory, lead"
                  value={search}
                />
              </Field>
              <div className="rounded-xl border border-line bg-panel p-2">
                <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-stone">Location status</div>
                <div className="flex flex-wrap gap-1">
                  {(["all", "live", "pilot", "paused", "blocked"] as const).map((value) => (
                    <button
                      className={[
                        "rounded-lg px-2.5 py-1.5 text-[12px] font-medium transition",
                        status === value ? "bg-panel-muted text-ink shadow-sm" : "text-stone hover:text-ink",
                      ].join(" ")}
                      key={value}
                      onClick={() => setStatus(value)}
                      type="button"
                    >
                      {value}
                    </button>
                  ))}
                </div>
              </div>
              <div className="rounded-xl border border-line bg-panel px-3 py-2 text-[12px] text-stone">
                Visible locations: <span className="font-medium text-ink">{filtered.length}</span>
              </div>
            </FilterBar>
            <div className="mt-3 px-4 pb-4">
              <ActiveFilters
                items={[
                  status === "all" ? "All location statuses" : status,
                  search.trim() ? `Search: ${search.trim()}` : "No search query",
                  "Location -> service -> package -> provider",
                ]}
              />
            </div>
          </div>
          {filtered.length === 0 ? (
            <div className="p-4">
              <EmptyState
                description="Try clearing the search or status filter to see configured markets."
                title="No locations match these filters"
              />
            </div>
          ) : (
            <DataGrid columns={columns} rows={filtered} />
          )}
        </Card>

        <Card>
          <div className="eyebrow">Setup flow</div>
          <h3 className="mt-2 text-[1.15rem] leading-none">Correct operating order</h3>
          <ol className="mt-4 space-y-3">
            {[
              "1. Pick the city or territory first.",
              "2. Enable services for that location.",
              "3. Add subcategories and local packages.",
              "4. Assign local providers to each package.",
              "5. Publish only when coverage and verification are ready.",
            ].map((item) => (
              <li className="rounded-2xl border border-line bg-panel-muted px-3 py-3" key={item}>
                <p className="text-dense text-body">{item}</p>
              </li>
            ))}
          </ol>
        </Card>
      </section>
    </div>
  );
}
