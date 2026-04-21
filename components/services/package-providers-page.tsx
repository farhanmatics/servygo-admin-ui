"use client";

import { useToast } from "@/components/providers";
import { Button } from "@/components/ui/button";
import { Card, StatPill } from "@/components/ui/card";
import { DataGrid } from "@/components/ui/data-grid";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import { localStatusTone, providerReadinessTone, type PackageConfig, type ServiceLocation } from "@/lib/mock/services";

export function PackageProvidersPage({ location, localPackage }: { location: ServiceLocation; localPackage: PackageConfig }) {
  const { pushToast } = useToast();
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
      render: (provider: PackageConfig["assignedProviders"][number]) => <span className="text-[13px] text-body">{provider.capacity}</span>,
    },
    {
      header: "Verification",
      key: "verification",
      render: (provider: PackageConfig["assignedProviders"][number]) => <span className="text-[13px] text-body">{provider.verification}</span>,
    },
    {
      header: "SLA",
      key: "sla",
      render: (provider: PackageConfig["assignedProviders"][number]) => <span className="text-[13px] text-body">{provider.sla}</span>,
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
              onClick={() =>
                pushToast({
                  tone: "success",
                  message: `Mock provider assignment drawer opened for ${localPackage.name}.`,
                })
              }
              size="md"
            >
              Assign provider
            </Button>
          </>
        }
        description="Provider assignment is the final operational step before a local package can be safely published."
        eyebrow="Local provider assignment"
        title={localPackage.name}
      />

      <Card className="overflow-hidden p-0">
        <div className="border-b border-line px-4 py-3">
          <div className="eyebrow">Assigned local providers</div>
          <h3 className="mt-1 text-[1.2rem] leading-none">Capacity, verification, and SLA readiness</h3>
        </div>
        <DataGrid columns={columns} rows={localPackage.assignedProviders} />
      </Card>

      {localPackage.publishBlockers.length > 0 ? (
        <Card>
          <div className="eyebrow text-danger">Publish blockers</div>
          <div className="mt-4 space-y-3">
            {localPackage.publishBlockers.map((blocker) => (
              <div key={blocker} className="rounded-2xl border border-danger/20 bg-danger-soft px-3 py-3">
                <p className="text-dense text-body">{blocker}</p>
              </div>
            ))}
          </div>
        </Card>
      ) : null}
    </div>
  );
}
