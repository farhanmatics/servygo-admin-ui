import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, StatPill } from "@/components/ui/card";
import { DataGrid } from "@/components/ui/data-grid";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import { localStatusTone, type LocalService, type LocalSubcategory, type ServiceLocation } from "@/lib/mock/services";

export function LocalServicePage({ location, service }: { location: ServiceLocation; service: LocalService }) {
  const columns = [
    {
      header: "Subcategory",
      key: "subcategory",
      render: (subcategory: LocalSubcategory) => (
        <>
          <Link className="font-medium text-ink hover:text-forest" href={`/services/locations/${location.id}/services/${service.id}/subcategories/${subcategory.id}`}>
            {subcategory.name}
          </Link>
          <div className="mt-1 text-[12px] text-stone">{subcategory.packages.length} packages</div>
        </>
      ),
    },
    {
      header: "Status",
      key: "status",
      render: (subcategory: LocalSubcategory) => <StatusBadge tone={localStatusTone[subcategory.status]}>{subcategory.status}</StatusBadge>,
    },
    {
      header: "Package readiness",
      key: "readiness",
      render: (subcategory: LocalSubcategory) => (
        <div className="flex flex-wrap gap-2">
          {subcategory.packages.map((item) => (
            <StatusBadge key={item.id} tone={localStatusTone[item.status]}>{item.name}</StatusBadge>
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
            <Button size="md">Add subcategory</Button>
          </>
        }
        description={service.note}
        eyebrow="Local service"
        title={service.name}
      />

      <Card className="overflow-hidden p-0">
        <div className="border-b border-line px-4 py-3">
          <div className="eyebrow">Subcategories</div>
          <h3 className="mt-1 text-[1.2rem] leading-none">Service branches for {location.city}</h3>
        </div>
        <DataGrid columns={columns} rows={service.subcategories} />
      </Card>
    </div>
  );
}
