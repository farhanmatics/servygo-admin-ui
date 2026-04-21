"use client";

import Link from "next/link";
import { useMockAuth } from "@/components/providers";
import { Button } from "@/components/ui/button";
import { Card, StatPill } from "@/components/ui/card";
import { DataGrid } from "@/components/ui/data-grid";
import { EmptyState } from "@/components/ui/feedback";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import {
  localStatusTone,
  pricingModeTone,
  type LocalService,
  type LocalSubcategory,
  type PackageConfig,
  type ServiceLocation,
} from "@/lib/mock/services";

export function SubcategoryPackagesPage({
  location,
  service,
  subcategory,
}: {
  location: ServiceLocation;
  service: LocalService;
  subcategory: LocalSubcategory;
}) {
  const { isReadOnly } = useMockAuth();

  const columns = [
    {
      header: "Package",
      key: "package",
      render: (item: PackageConfig) => (
        <>
          <div className="font-medium text-ink">{item.name}</div>
          <div className="mt-1 text-[12px] text-stone">{item.id}</div>
        </>
      ),
    },
    {
      header: "Status",
      key: "status",
      render: (item: PackageConfig) => (
        <StatusBadge tone={localStatusTone[item.status]}>{item.status}</StatusBadge>
      ),
    },
    {
      header: "Pricing",
      key: "pricing",
      render: (item: PackageConfig) => (
        <div className="flex flex-wrap gap-2">
          <StatusBadge tone={pricingModeTone[item.pricingMode]}>{item.pricingMode}</StatusBadge>
          <StatusBadge tone="success">{item.price}</StatusBadge>
        </div>
      ),
    },
    {
      header: "Providers",
      key: "providers",
      render: (item: PackageConfig) => (
        <span className="text-[13px] text-body">{item.assignedProviders.length} assigned</span>
      ),
    },
    {
      header: "Readiness",
      key: "readiness",
      render: (item: PackageConfig) => (
        <StatusBadge tone={item.publishBlockers.length > 0 ? "danger" : "success"}>
          {item.publishBlockers.length > 0 ? `${item.publishBlockers.length} blockers` : "ready"}
        </StatusBadge>
      ),
    },
    {
      header: "Actions",
      key: "actions",
      render: (item: PackageConfig) => (
        <div className="flex flex-wrap gap-2">
          <Link href={`/services/locations/${location.id}/packages/${item.id}/providers`}>
            <Button size="sm" variant="secondary">Providers</Button>
          </Link>
          <Link href={`/services/locations/${location.id}/packages/${item.id}/configure`}>
            <Button size="sm" variant="ghost">Configure</Button>
          </Link>
        </div>
      ),
    },
  ];

  return (
    <div className="admin-grid">
      <PageHeader
        actions={
          <>
            <StatPill label="location" value={location.city} />
            <StatPill label="service" value={service.name} />
            {isReadOnly ? (
              <Button disabled size="md" title="Read-only access">
                Create package
              </Button>
            ) : (
              <Link
                href={`/services/locations/${location.id}/services/${service.id}/subcategories/${subcategory.id}/packages/new`}
              >
                <Button size="md">Create package</Button>
              </Link>
            )}
          </>
        }
        breadcrumbs={[
          { href: "/services", label: "Services" },
          { href: `/services/locations/${location.id}`, label: `${location.city}, ${location.province}` },
          { href: `/services/locations/${location.id}/services/${service.id}`, label: service.name },
          { label: subcategory.name },
        ]}
        description={`Create and manage ${subcategory.name} packages for ${location.city}. Packages become customer-bookable only after provider assignment and local configuration are ready.`}
        eyebrow="Package builder"
        title={subcategory.name}
      />

      <Card className="overflow-hidden p-0">
        <div className="border-b border-line px-4 py-3">
          <div className="eyebrow">Local packages</div>
          <h3 className="mt-1 text-[1.2rem] leading-none">Packages under {service.name}</h3>
        </div>
        {subcategory.packages.length === 0 ? (
          <div className="p-4">
            <EmptyState
              description={`No packages exist yet under ${subcategory.name} in ${location.city}. Create one to define pricing, add-ons, and intake fields.`}
              title="No packages configured"
            />
          </div>
        ) : (
          <DataGrid columns={columns} rows={subcategory.packages} />
        )}
      </Card>
    </div>
  );
}
