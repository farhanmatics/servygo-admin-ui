"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DataGrid } from "@/components/ui/data-grid";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import { getAdSlots, adStatusTone, type AdSlot } from "@/lib/mock/platform-config";
import { useMockAuth } from "@/components/providers";
import { useToast } from "@/components/providers";

const PLACEMENT_LABELS: Record<string, string> = {
  "customer-home-banner": "Customer home banner",
  "customer-search-sidebar": "Customer search sidebar",
  "customer-booking-confirm": "Customer booking confirm",
  "provider-app-dashboard": "Provider app dashboard",
  "franchise-portal-header": "Franchise portal header",
};

export function SettingsAdsPage() {
  const { isReadOnly } = useMockAuth();
  const { pushToast } = useToast();
  const slots = getAdSlots();

  const columns = [
    {
      header: "Ad",
      key: "title",
      render: (row: AdSlot) => (
        <div>
          <p className="font-medium text-ink">{row.title}</p>
          <p className="text-[11px] text-stone">{row.advertiser}</p>
        </div>
      ),
    },
    {
      header: "Placement",
      key: "placement",
      render: (row: AdSlot) => <span className="text-[13px] text-body">{PLACEMENT_LABELS[row.placement] ?? row.placement}</span>,
    },
    { header: "Audience", key: "targetAudience", render: (row: AdSlot) => <span className="text-[12px] text-stone">{row.targetAudience}</span> },
    {
      header: "Impressions",
      key: "impressions",
      render: (row: AdSlot) => <span className="tabular-nums text-[13px] text-body">{row.impressions.toLocaleString()}</span>,
    },
    {
      header: "Clicks",
      key: "clicks",
      render: (row: AdSlot) => (
        <span className="tabular-nums text-[13px] text-body">
          {row.clicks.toLocaleString()}
          {row.impressions > 0 && (
            <span className="ml-1 text-[11px] text-stone">({((row.clicks / row.impressions) * 100).toFixed(1)}%)</span>
          )}
        </span>
      ),
    },
    { header: "Period", key: "startDate", render: (row: AdSlot) => <span className="text-[12px] text-stone">{row.startDate} → {row.endDate}</span> },
    {
      header: "Status",
      key: "status",
      render: (row: AdSlot) => <StatusBadge tone={adStatusTone[row.status]}>{row.status}</StatusBadge>,
    },
    {
      header: "",
      key: "actions",
      render: (row: AdSlot) =>
        !isReadOnly ? (
          <Button
            onClick={() => pushToast({ message: `Ad slot "${row.title}" ${row.status === "active" ? "paused" : "activated"}. Audit logged.`, tone: "info" })}
            size="sm"
            variant="ghost"
          >
            {row.status === "active" ? "Pause" : "Activate"}
          </Button>
        ) : null,
    },
  ];

  const active = slots.filter(s => s.status === "active");
  const totalImpressions = slots.reduce((a, s) => a + s.impressions, 0);
  const totalClicks = slots.reduce((a, s) => a + s.clicks, 0);

  return (
    <div className="admin-grid">
      <PageHeader
        actions={
          !isReadOnly ? (
            <Button onClick={() => pushToast({ message: "Ad slot creation — available after ad server integration.", tone: "info" })} size="md" variant="primary">
              + New ad slot
            </Button>
          ) : undefined
        }
        description="Configure and manage promotional advertisement placements across customer and provider surfaces."
        eyebrow="Platform configuration"
        title="Advertisement Slots"
      />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Active slots", value: active.length.toString() },
          { label: "Total slots", value: slots.length.toString() },
          { label: "Total impressions", value: totalImpressions.toLocaleString() },
          { label: "Total clicks", value: `${totalClicks.toLocaleString()} (${totalImpressions > 0 ? ((totalClicks / totalImpressions) * 100).toFixed(1) : 0}% CTR)` },
        ].map(card => (
          <Card key={card.label} className="flex flex-col gap-1">
            <p className="text-[11px] uppercase tracking-wide text-stone">{card.label}</p>
            <p className="text-[1.3rem] font-semibold leading-none text-ink">{card.value}</p>
          </Card>
        ))}
      </div>

      <Card className="overflow-hidden p-0">
        <DataGrid columns={columns} emptyMessage="No advertisement slots configured." rows={slots} />
      </Card>
    </div>
  );
}
