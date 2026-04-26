"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DataGrid } from "@/components/ui/data-grid";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import { Tabs } from "@/components/ui/tabs";
import { getPromoCodes, getCampaigns, promoStatusTone, campaignStatusTone, type PromoCode, type Campaign } from "@/lib/mock/promos";
import { useMockAuth } from "@/components/providers";
import { useToast } from "@/components/providers";

const TABS = ["Promo codes", "Campaigns"];

export function SettingsPromosPage() {
  const [tab, setTab] = useState(0);
  const { isReadOnly } = useMockAuth();
  const { pushToast } = useToast();
  const codes = getPromoCodes();
  const campaigns = getCampaigns();

  const codeColumns = [
    {
      header: "Code",
      key: "code",
      render: (row: PromoCode) => <span className="font-mono font-semibold text-ink">{row.code}</span>,
    },
    { header: "Description", key: "description", render: (row: PromoCode) => <span className="text-[13px] text-body">{row.description}</span> },
    { header: "Discount", key: "discountValue", render: (row: PromoCode) => <span className="tabular-nums font-medium text-ink">{row.discountValue}</span> },
    {
      header: "Usage",
      key: "usageCount",
      render: (row: PromoCode) => (
        <span className="tabular-nums text-[13px] text-body">{row.usageCount} / {row.usageLimit}</span>
      ),
    },
    { header: "Valid", key: "validFrom", render: (row: PromoCode) => <span className="text-[12px] text-stone">{row.validFrom} → {row.validTo}</span> },
    { header: "Services", key: "applicableServices", render: (row: PromoCode) => <span className="text-[12px] text-stone">{row.applicableServices}</span> },
    {
      header: "Status",
      key: "status",
      render: (row: PromoCode) => <StatusBadge tone={promoStatusTone[row.status]}>{row.status}</StatusBadge>,
    },
    {
      header: "",
      key: "actions",
      render: (row: PromoCode) =>
        !isReadOnly ? (
          <Button
            onClick={() => pushToast({ message: `Promo code "${row.code}" ${row.status === "active" ? "paused" : "activated"}. Audit event logged.`, tone: "info" })}
            size="sm"
            variant="ghost"
          >
            {row.status === "active" ? "Pause" : "Activate"}
          </Button>
        ) : null,
    },
  ];

  const campaignColumns = [
    { header: "Campaign", key: "name", render: (row: Campaign) => <span className="font-medium text-ink">{row.name}</span> },
    { header: "Budget", key: "budget", render: (row: Campaign) => <span className="tabular-nums text-[13px] text-body">{row.budget}</span> },
    { header: "Spent", key: "spent", render: (row: Campaign) => <span className="tabular-nums text-[13px] text-body">{row.spent}</span> },
    { header: "Conversions", key: "conversions", render: (row: Campaign) => <span className="tabular-nums text-[13px] text-body">{row.conversions}</span> },
    { header: "Period", key: "startDate", render: (row: Campaign) => <span className="text-[12px] text-stone">{row.startDate} → {row.endDate}</span> },
    {
      header: "Status",
      key: "status",
      render: (row: Campaign) => <StatusBadge tone={campaignStatusTone[row.status]}>{row.status}</StatusBadge>,
    },
  ];

  return (
    <div className="admin-grid">
      <PageHeader
        actions={
          !isReadOnly ? (
            <Button onClick={() => pushToast({ message: "Promo creation form — available after backend integration.", tone: "info" })} size="md" variant="primary">
              + New promo code
            </Button>
          ) : undefined
        }
        description="Create and manage platform-wide promotional codes and marketing campaigns."
        eyebrow="Platform configuration"
        title="Promo Codes & Campaigns"
      />

      {/* Summary */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Active codes", value: codes.filter(c => c.status === "active").length.toString() },
          { label: "Total usage", value: codes.reduce((a, c) => a + c.usageCount, 0).toString() },
          { label: "Active campaigns", value: campaigns.filter(c => c.status === "active").length.toString() },
          { label: "Campaign budget committed", value: campaigns.reduce((a, c) => a + parseFloat(c.budget.replace(/[$,]/g, "")), 0).toLocaleString("en-CA", { style: "currency", currency: "CAD", maximumFractionDigits: 0 }) },
        ].map(card => (
          <Card key={card.label} className="flex flex-col gap-1">
            <p className="text-[11px] uppercase tracking-wide text-stone">{card.label}</p>
            <p className="text-[1.5rem] font-semibold leading-none text-ink">{card.value}</p>
          </Card>
        ))}
      </div>

      <Tabs onChange={setTab} tabs={TABS} value={tab} />

      {tab === 0 && (
        <Card className="overflow-hidden p-0">
          <DataGrid columns={codeColumns} emptyMessage="No promo codes found." rows={codes} />
        </Card>
      )}

      {tab === 1 && (
        <Card className="overflow-hidden p-0">
          <DataGrid columns={campaignColumns} emptyMessage="No campaigns found." rows={campaigns} />
        </Card>
      )}
    </div>
  );
}
