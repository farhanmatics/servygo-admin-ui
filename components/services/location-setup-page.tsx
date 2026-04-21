import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, MetricCard, StatPill } from "@/components/ui/card";
import { DataGrid } from "@/components/ui/data-grid";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import { countPackages, countProviderGaps, localStatusTone, type LocalService, type ServiceLocation } from "@/lib/mock/services";

export function LocationSetupPage({ location }: { location: ServiceLocation }) {
  const columns = [
    {
      header: "Service",
      key: "service",
      render: (service: LocalService) => (
        <>
          <Link className="font-medium text-ink hover:text-forest" href={`/services/locations/${location.id}/services/${service.id}`}>
            {service.name}
          </Link>
          <div className="mt-1 text-[12px] text-stone">{service.note}</div>
        </>
      ),
    },
    {
      header: "Status",
      key: "status",
      render: (service: LocalService) => <StatusBadge tone={localStatusTone[service.status]}>{service.status}</StatusBadge>,
    },
    {
      header: "Subcategories",
      key: "subcategories",
      render: (service: LocalService) => <span className="text-[13px] text-body">{service.subcategories.length}</span>,
    },
    {
      header: "Packages",
      key: "packages",
      render: (service: LocalService) => (
        <span className="text-[13px] text-body">
          {service.subcategories.reduce((total, subcategory) => total + subcategory.packages.length, 0)}
        </span>
      ),
    },
    {
      header: "Action",
      key: "action",
      render: (service: LocalService) => (
        <Link href={`/services/locations/${location.id}/services/${service.id}`}>
          <Button size="sm" variant="secondary">Open setup</Button>
        </Link>
      ),
    },
  ];

  return (
    <div className="admin-grid">
      <PageHeader
        actions={
          <>
            <StatPill label="territory" value={location.territory} />
            <StatusBadge tone={localStatusTone[location.status]}>{location.status}</StatusBadge>
            <Button size="md">Enable service</Button>
          </>
        }
        description={`Configure services, packages, and provider readiness for ${location.city}. Local package readiness controls what customers can actually book.`}
        eyebrow="Location setup"
        title={`${location.city}, ${location.province}`}
      />

      <section className="grid gap-4 xl:grid-cols-4">
        <MetricCard label="Local services" value={String(location.services.length)} delta="Enabled in this market" tone="info" />
        <MetricCard label="Packages" value={String(countPackages(location))} delta="Configured locally" tone="success" />
        <MetricCard label="Provider gaps" value={String(countProviderGaps(location))} delta="Block publish" tone={countProviderGaps(location) > 0 ? "danger" : "success"} />
        <MetricCard label="Market lead" value={location.marketLead} delta="Responsible owner" tone="warning" />
      </section>

      <Card className="overflow-hidden p-0">
        <div className="border-b border-line px-4 py-3">
          <div className="eyebrow">Services in this location</div>
          <h3 className="mt-1 text-[1.2rem] leading-none">Local service setup</h3>
        </div>
        <DataGrid columns={columns} rows={location.services} />
      </Card>
    </div>
  );
}
