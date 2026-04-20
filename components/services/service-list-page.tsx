"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useMockAuth, useToast } from "@/components/providers";
import { Button } from "@/components/ui/button";
import { Card, MetricCard } from "@/components/ui/card";
import { DataGrid } from "@/components/ui/data-grid";
import { ActiveFilters, FilterBar, SavedViewMenu } from "@/components/ui/filter-bar";
import { Field, Input } from "@/components/ui/input";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import { getServices, pricingModeTone, serviceDirectoryMetrics, serviceStateTone, type PricingMode, type ServiceProfile, type ServiceState } from "@/lib/mock/services";

export function ServiceListPage() {
  const { role } = useMockAuth();
  const { pushToast } = useToast();
  const [search, setSearch] = useState("");
  const [stateFilter, setStateFilter] = useState<ServiceState | "all">("all");
  const [pricingFilter, setPricingFilter] = useState<PricingMode | "all">("all");

  const services = getServices();
  const filtered = useMemo(
    () =>
      services.filter((service) => {
        const query = search.trim().toLowerCase();
        const matchesSearch =
          query.length === 0
            ? true
            : [service.name, service.segment, service.package, service.id].some((value) =>
                value.toLowerCase().includes(query),
              );
        const matchesState = stateFilter === "all" ? true : service.state === stateFilter;
        const matchesPricing = pricingFilter === "all" ? true : service.pricingMode === pricingFilter;
        return matchesSearch && matchesState && matchesPricing;
      }),
    [pricingFilter, search, services, stateFilter],
  );

  const columns = [
    {
      header: "Service",
      key: "service",
      render: (service: ServiceProfile) => (
        <>
          <Link className="font-medium text-ink hover:text-forest" href={`/services/${service.id}`}>
            {service.name}
          </Link>
          <div className="mt-1 text-[12px] text-stone">
            {service.id} • {service.segment}
          </div>
        </>
      ),
    },
    {
      header: "Hierarchy",
      key: "hierarchy",
      render: (service: ServiceProfile) => (
        <div className="text-[13px] leading-6 text-body">
          <div>{service.segment}</div>
          <div className="text-stone">{service.package}</div>
        </div>
      ),
    },
    {
      header: "Pricing",
      key: "pricing",
      render: (service: ServiceProfile) => (
        <div className="flex flex-wrap items-center gap-2">
          <StatusBadge tone={pricingModeTone[service.pricingMode]}>{service.pricingMode}</StatusBadge>
          {service.biddingEnabled ? <StatusBadge tone="warning">bid-enabled</StatusBadge> : null}
        </div>
      ),
    },
    {
      header: "Availability",
      key: "availability",
      render: (service: ServiceProfile) => (
        <div className="text-[13px] leading-6 text-body">
          <div>
            <StatusBadge tone={serviceStateTone[service.state]}>{service.state}</StatusBadge>
          </div>
          <div className="mt-1 text-stone">{service.liveRegions} live regions</div>
        </div>
      ),
    },
    {
      header: "Intake form",
      key: "form",
      render: (service: ServiceProfile) => (
        <span className="text-[13px] text-body">{service.formTemplateSummary}</span>
      ),
    },
    {
      header: "Actions",
      key: "actions",
      render: (service: ServiceProfile) => (
        <div className="flex flex-wrap gap-2">
          <Link href={`/services/${service.id}`}>
            <Button size="sm" variant="secondary">
              Open
            </Button>
          </Link>
          {(role === "super-admin" || role === "operations-admin") ? (
            <Link href={`/services/${service.id}/edit`}>
              <Button size="sm" variant="ghost">
                Edit
              </Button>
            </Link>
          ) : null}
        </div>
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
                  message: "Mock service catalog export queued for product review.",
                })
              }
              size="md"
              variant="secondary"
            >
              Export catalog
            </Button>
            {(role === "super-admin" || role === "operations-admin") ? <Button size="md">Create service</Button> : null}
          </>
        }
        description="Service management defines what customers can book, how pricing behaves, where each service is live, and what intake data the operation needs before dispatch."
        eyebrow="Service management"
        title="Service Categories"
      />

      <section className="grid gap-4 xl:grid-cols-4">
        {serviceDirectoryMetrics.map((metric) => (
          <MetricCard
            delta={metric.delta}
            key={metric.label}
            label={metric.label}
            tone={metric.tone}
            value={metric.value}
          />
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-[minmax(0,1.55fr)_minmax(320px,0.8fr)]">
        <Card className="overflow-hidden p-0">
          <div className="border-b border-line px-4 py-3">
            <FilterBar
              actions={
                <>
                  <SavedViewMenu label="Saved view: Bid-enabled rollout" />
                  <Button
                    onClick={() => {
                      setSearch("");
                      setStateFilter("all");
                      setPricingFilter("all");
                    }}
                    size="sm"
                    variant="ghost"
                  >
                    Reset filters
                  </Button>
                </>
              }
            >
              <Field label="Search">
                <Input
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Service name, segment, package, or ID"
                  value={search}
                />
              </Field>
              <div className="rounded-xl border border-line bg-panel p-2">
                <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-stone">
                  Service state
                </div>
                <div className="flex flex-wrap gap-1">
                  {(["all", "live", "paused", "limited"] as const).map((value) => (
                    <button
                      className={[
                        "rounded-lg px-2.5 py-1.5 text-[12px] font-medium transition",
                        stateFilter === value ? "bg-panel-muted text-ink shadow-sm" : "text-stone hover:text-ink",
                      ].join(" ")}
                      key={value}
                      onClick={() => setStateFilter(value)}
                      type="button"
                    >
                      {value}
                    </button>
                  ))}
                </div>
              </div>
              <div className="rounded-xl border border-line bg-panel p-2">
                <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-stone">
                  Pricing mode
                </div>
                <div className="flex flex-wrap gap-1">
                  {(["all", "fixed", "bidding", "hybrid"] as const).map((value) => (
                    <button
                      className={[
                        "rounded-lg px-2.5 py-1.5 text-[12px] font-medium transition",
                        pricingFilter === value ? "bg-panel-muted text-ink shadow-sm" : "text-stone hover:text-ink",
                      ].join(" ")}
                      key={value}
                      onClick={() => setPricingFilter(value)}
                      type="button"
                    >
                      {value}
                    </button>
                  ))}
                </div>
              </div>
              <div className="rounded-xl border border-line bg-panel px-3 py-2 text-[12px] text-stone">
                Visible services: <span className="font-medium text-ink">{filtered.length}</span>
              </div>
            </FilterBar>
            <div className="mt-3 px-4 pb-4">
              <ActiveFilters
                items={[
                  stateFilter === "all" ? "All service states" : stateFilter,
                  pricingFilter === "all" ? "All pricing modes" : pricingFilter,
                  search.trim() ? `Search: ${search.trim()}` : "No search query",
                ]}
              />
            </div>
          </div>
          <DataGrid columns={columns} rows={filtered} />
        </Card>

        <div className="grid gap-4">
          <Card>
            <div className="eyebrow">Hierarchy guidance</div>
            <h3 className="mt-2 text-[1.15rem] leading-none">How service definitions should read</h3>
            <div className="mt-4 space-y-3">
              {[
                "Keep hierarchy explicit: category or segment first, then package or delivery model.",
                "Use state to show whether a service is truly live, paused, or limited before operators expand coverage.",
                "Make fixed-price and bid-enabled behavior obvious at list level so rollout risks are visible early.",
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-line bg-panel-muted px-3 py-3">
                  <p className="text-dense text-body">{item}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
