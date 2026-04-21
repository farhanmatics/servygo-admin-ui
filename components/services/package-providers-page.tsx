"use client";

import { useMockAuth, useToast } from "@/components/providers";
import { Button } from "@/components/ui/button";
import { Card, StatPill } from "@/components/ui/card";
import { DataGrid } from "@/components/ui/data-grid";
import { EmptyState } from "@/components/ui/feedback";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import {
  getLocalPackage,
  localStatusTone,
  providerReadinessTone,
  type PackageConfig,
  type ServiceLocation,
} from "@/lib/mock/services";

export function PackageProvidersPage({
  location,
  localPackage,
}: {
  location: ServiceLocation;
  localPackage: PackageConfig;
}) {
  const { isReadOnly } = useMockAuth();
  const { pushToast } = useToast();

  const lineage = getLocalPackage(location.id, localPackage.id);
  const serviceId = lineage?.service.id;
  const serviceName = lineage?.service.name;
  const subcategoryId = lineage?.subcategory.id;
  const subcategoryName = lineage?.subcategory.name;

  const breadcrumbs = [
    { href: "/services", label: "Services" },
    { href: `/services/locations/${location.id}`, label: `${location.city}, ${location.province}` },
    ...(serviceId && serviceName
      ? [{ href: `/services/locations/${location.id}/services/${serviceId}`, label: serviceName }]
      : []),
    ...(serviceId && subcategoryId && subcategoryName
      ? [
          {
            href: `/services/locations/${location.id}/services/${serviceId}/subcategories/${subcategoryId}`,
            label: subcategoryName,
          },
        ]
      : []),
    { label: `${localPackage.name} - Providers` },
  ];

  const columns = [
    {
      header: "Provider",
      key: "provider",
      render: (provider: PackageConfig["assignedProviders"][number]) => (
        <>
          <div className="font-medium text-ink">{provider.name}</div>
          <div className="mt-1 text-[12px] text-stone">{provider.id}</div>
        </>
      ),
    },
    {
      header: "Readiness",
      key: "readiness",
      render: (provider: PackageConfig["assignedProviders"][number]) => (
        <StatusBadge tone={providerReadinessTone[provider.readiness]}>{provider.readiness}</StatusBadge>
      ),
    },
    {
      header: "Capacity",
      key: "capacity",
      render: (provider: PackageConfig["assignedProviders"][number]) => (
        <span className="text-[13px] text-body">{provider.capacity}</span>
      ),
    },
    {
      header: "Verification",
      key: "verification",
      render: (provider: PackageConfig["assignedProviders"][number]) => (
        <span className="text-[13px] text-body">{provider.verification}</span>
      ),
    },
    {
      header: "SLA",
      key: "sla",
      render: (provider: PackageConfig["assignedProviders"][number]) => (
        <span className="text-[13px] text-body">{provider.sla}</span>
      ),
    },
  ];

  return (
    <div className="admin-grid">
      <PageHeader
        actions={
          <>
            <StatPill label="location" value={location.city} />
            <StatusBadge tone={localStatusTone[localPackage.status]}>{localPackage.status}</StatusBadge>
            <Button
              disabled={isReadOnly}
              onClick={() =>
                pushToast({
                  tone: "success",
                  message: `Mock provider assignment drawer opened for ${localPackage.name}.`,
                })
              }
              size="md"
              title={isReadOnly ? "Read-only access" : undefined}
            >
              Assign provider
            </Button>
          </>
        }
        breadcrumbs={breadcrumbs}
        description="Provider assignment is the final operational step before a local package can be safely published."
        eyebrow="Local provider assignment"
        title={localPackage.name}
      />

      <Card className="overflow-hidden p-0">
        <div className="border-b border-line px-4 py-3">
          <div className="eyebrow">Assigned local providers</div>
          <h3 className="mt-1 text-[1.2rem] leading-none">Capacity, verification, and SLA readiness</h3>
        </div>
        {localPackage.assignedProviders.length === 0 ? (
          <div className="p-4">
            <EmptyState
              description="No providers are assigned yet. Assign at least one verified provider before publishing this package."
              title="No providers assigned"
            />
          </div>
        ) : (
          <DataGrid columns={columns} rows={localPackage.assignedProviders} />
        )}
      </Card>

      {localPackage.publishBlockers.length > 0 ? (
        <Card>
          <div className="eyebrow text-danger">Publish blockers</div>
          <div className="mt-4 space-y-3">
            {localPackage.publishBlockers.map((blocker) => (
              <div className="rounded-2xl border border-danger/20 bg-danger-soft px-3 py-3" key={blocker}>
                <p className="text-dense text-body">{blocker}</p>
              </div>
            ))}
          </div>
        </Card>
      ) : null}
    </div>
  );
}
