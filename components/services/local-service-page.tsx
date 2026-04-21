"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useMockAuth } from "@/components/providers";
import { Button } from "@/components/ui/button";
import { Card, StatPill } from "@/components/ui/card";
import { DataGrid } from "@/components/ui/data-grid";
import { EmptyState } from "@/components/ui/feedback";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import {
  localStatusTone,
  type LocalService,
  type LocalSubcategory,
  type ServiceLocation,
} from "@/lib/mock/services";

export function LocalServicePage({
  location,
  service,
}: {
  location: ServiceLocation;
  service: LocalService;
}) {
  const { isReadOnly } = useMockAuth();
  const [activeSubcategory, setActiveSubcategory] = useState<string>("all");

  const filteredSubcategories = useMemo(
    () =>
      activeSubcategory === "all"
        ? service.subcategories
        : service.subcategories.filter((subcategory) => subcategory.id === activeSubcategory),
    [service.subcategories, activeSubcategory],
  );

  const columns = [
    {
      header: "Subcategory",
      key: "subcategory",
      render: (subcategory: LocalSubcategory) => (
        <>
          <Link
            className="font-medium text-ink hover:text-forest"
            href={`/services/locations/${location.id}/services/${service.id}/subcategories/${subcategory.id}`}
          >
            {subcategory.name}
          </Link>
          <div className="mt-1 text-[12px] text-stone">{subcategory.packages.length} packages</div>
        </>
      ),
    },
    {
      header: "Status",
      key: "status",
      render: (subcategory: LocalSubcategory) => (
        <StatusBadge tone={localStatusTone[subcategory.status]}>{subcategory.status}</StatusBadge>
      ),
    },
    {
      header: "Package readiness",
      key: "readiness",
      render: (subcategory: LocalSubcategory) => (
        <div className="flex flex-wrap gap-2">
          {subcategory.packages.map((item) => (
            <StatusBadge key={item.id} tone={localStatusTone[item.status]}>
              {item.name}
            </StatusBadge>
          ))}
        </div>
      ),
    },
    {
      header: "Action",
      key: "action",
      render: (subcategory: LocalSubcategory) => (
        <Link href={`/services/locations/${location.id}/services/${service.id}/subcategories/${subcategory.id}`}>
          <Button size="sm" variant="secondary">Build packages</Button>
        </Link>
      ),
    },
  ];

  return (
    <div className="admin-grid">
      <PageHeader
        actions={
          <>
            <StatPill label="location" value={location.city} />
            <StatusBadge tone={localStatusTone[service.status]}>{service.status}</StatusBadge>
            <Button disabled={isReadOnly} size="md" title={isReadOnly ? "Read-only access" : undefined}>
              Add subcategory
            </Button>
          </>
        }
        breadcrumbs={[
          { href: "/services", label: "Services" },
          { href: `/services/locations/${location.id}`, label: `${location.city}, ${location.province}` },
          { label: service.name },
        ]}
        description={service.note}
        eyebrow="Local service"
        title={service.name}
      />

      <Card className="overflow-hidden p-0">
        <div className="border-b border-line px-4 py-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="eyebrow">Subcategories</div>
              <h3 className="mt-1 text-[1.2rem] leading-none">Service branches for {location.city}</h3>
            </div>
            {service.subcategories.length > 0 ? (
              <div
                aria-label="Filter subcategories"
                className="flex flex-wrap gap-1 rounded-xl border border-line bg-panel p-1"
                role="tablist"
              >
                <button
                  aria-selected={activeSubcategory === "all"}
                  className={[
                    "rounded-lg px-2.5 py-1.5 text-[12px] font-medium transition",
                    activeSubcategory === "all" ? "bg-panel-muted text-ink shadow-sm" : "text-stone hover:text-ink",
                  ].join(" ")}
                  onClick={() => setActiveSubcategory("all")}
                  role="tab"
                  type="button"
                >
                  All
                </button>
                {service.subcategories.map((subcategory) => (
                  <button
                    aria-selected={activeSubcategory === subcategory.id}
                    className={[
                      "rounded-lg px-2.5 py-1.5 text-[12px] font-medium uppercase tracking-[0.08em] transition",
                      activeSubcategory === subcategory.id
                        ? "bg-panel-muted text-ink shadow-sm"
                        : "text-stone hover:text-ink",
                    ].join(" ")}
                    key={subcategory.id}
                    onClick={() => setActiveSubcategory(subcategory.id)}
                    role="tab"
                    type="button"
                  >
                    {subcategory.name}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        </div>
        {filteredSubcategories.length === 0 ? (
          <div className="p-4">
            <EmptyState
              description={
                service.subcategories.length === 0
                  ? `No subcategories yet for ${service.name} in ${location.city}. Add one to start building packages.`
                  : "Clear the subcategory filter to view all branches."
              }
              title="Nothing to show"
            />
          </div>
        ) : (
          <DataGrid columns={columns} rows={filteredSubcategories} />
        )}
      </Card>
    </div>
  );
}
