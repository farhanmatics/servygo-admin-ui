"use client";
import { Card } from "@/components/ui/card";
import { MapPanel } from "@/components/ui/advanced-primitives";
import { PageHeader } from "@/components/ui/page-header";
import { getTerritoryById } from "@/lib/mock/franchises";
import { useMockAuth } from "@/components/providers";

export function TerritoryBoundaryPage({ id }: { id: string }) {
  const territory = getTerritoryById(id);
  const { isReadOnly } = useMockAuth();

  if (!territory) return null;

  const boundaryDetails = [
    { label: "Territory", value: territory.name },
    { label: "City", value: territory.city },
    { label: "Province", value: territory.province },
    { label: "Geo-boundary definition", value: territory.geoBoundary },
    { label: "Operating hours", value: territory.operatingHours },
    { label: "Active providers within boundary", value: territory.activeProviders.toString() },
  ];

  return (
    <div className="admin-grid">
      <PageHeader
        description="Territory boundaries are defined by HQ. Franchise operators can view but not modify boundaries."
        eyebrow={`${territory.name} · Geo-boundary`}
        title="Territory Boundary"
      />

      <MapPanel
        items={[
          `${territory.name} — territory boundary`,
          "Live geo-boundary overlay renders via Google Maps Platform in production.",
          "Territory boundary polygons and provider location pins are streamed from the backend.",
        ]}
      />

      <Card>
        <p className="eyebrow mb-3">Boundary details</p>
        <div className="space-y-2">
          {boundaryDetails.map(d => (
            <div className="flex items-start gap-3 rounded-lg border border-line bg-panel-muted px-3 py-2" key={d.label}>
              <span className="min-w-[160px] text-[12px] text-stone">{d.label}</span>
              <span className="text-[13px] font-medium text-ink">{d.value}</span>
            </div>
          ))}
        </div>
      </Card>

      {!isReadOnly && (
        <div className="rounded-xl border border-line bg-panel-muted px-4 py-3">
          <p className="text-[13px] font-medium text-ink">Boundary modification</p>
          <p className="text-[12px] text-stone">Territory boundaries are HQ-controlled. To modify, submit a territory adjustment request through the ServyGo operations channel. Changes take effect after Super Admin approval and backend geo-index rebuild.</p>
        </div>
      )}
    </div>
  );
}
