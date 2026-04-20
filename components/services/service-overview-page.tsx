import { Card, MetricCard } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { coverageStateTone, pricingModeTone, serviceStateTone, type ServiceProfile } from "@/lib/mock/services";

export function ServiceOverviewPage({ service }: { service: ServiceProfile }) {
  return (
    <div className="grid gap-4 xl:grid-cols-[minmax(0,1.3fr)_minmax(320px,0.75fr)]">
      <Card>
        <div className="eyebrow">Service posture</div>
        <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          <div className="rounded-2xl border border-line bg-panel-muted p-3">
            <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-stone">Summary</div>
            <p className="mt-2 text-[13px] leading-6 text-body">{service.summary}</p>
          </div>
          <div className="rounded-2xl border border-line bg-panel-muted p-3">
            <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-stone">Location mode</div>
            <p className="mt-2 text-[13px] leading-6 text-body">{service.locationMode}</p>
          </div>
          <div className="rounded-2xl border border-line bg-panel-muted p-3">
            <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-stone">Form summary</div>
            <p className="mt-2 text-[13px] leading-6 text-body">{service.formTemplateSummary}</p>
          </div>
        </div>

        <div className="mt-4 border-t border-line pt-4">
          <div className="eyebrow">Add-on catalog</div>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            {service.addOns.map((addon) => (
              <div key={addon.name} className="rounded-2xl border border-line bg-panel-muted p-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="text-[13px] font-semibold text-ink">{addon.name}</div>
                  <StatusBadge tone="success">{addon.price}</StatusBadge>
                </div>
                <p className="mt-2 text-[12px] leading-5 text-body">{addon.note}</p>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <div className="grid gap-4">
        <MetricCard delta={`${service.liveRegions} live regions`} label="Service state" tone={serviceStateTone[service.state]} value={service.state} />
        <MetricCard delta={service.biddingEnabled ? "Bidding available" : "Fixed path only"} label="Pricing mode" tone={pricingModeTone[service.pricingMode]} value={service.pricingMode} />
        <Card>
          <div className="eyebrow">Coverage snapshot</div>
          <div className="mt-4 space-y-3">
            {service.coverage.map((row) => (
              <div key={`${row.province}-${row.cities}`} className="rounded-2xl border border-line bg-panel-muted p-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="text-[13px] font-semibold text-ink">{row.province}</div>
                  <StatusBadge tone={coverageStateTone[row.state]}>{row.state}</StatusBadge>
                </div>
                <div className="mt-1 text-[12px] text-stone">{row.cities}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
