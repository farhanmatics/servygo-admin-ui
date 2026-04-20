"use client";

import { useToast } from "@/components/providers";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { pricingModeTone, type ServiceProfile } from "@/lib/mock/services";

export function ServicePricingPage({ service }: { service: ServiceProfile }) {
  const { pushToast } = useToast();

  return (
    <div className="grid gap-4 xl:grid-cols-[minmax(0,1.3fr)_minmax(320px,0.75fr)]">
      <Card>
        <div className="eyebrow">Pricing rules</div>
        <h3 className="mt-2 text-[1.2rem] leading-none">Fixed vs bidding behavior</h3>
        <div className="mt-4 space-y-3">
          {service.pricingRules.map((rule) => (
            <div key={rule.id} className="rounded-2xl border border-line bg-panel-muted p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-[13px] font-semibold text-ink">{rule.label}</div>
                  <div className="mt-1 text-[12px] text-stone">{rule.id}</div>
                </div>
                <StatusBadge tone={pricingModeTone[service.pricingMode]}>{rule.value}</StatusBadge>
              </div>
              <p className="mt-3 text-[13px] leading-6 text-body">{rule.note}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <div className="eyebrow">Pricing posture</div>
        <h3 className="mt-2 text-[1.15rem] leading-none">Current configuration</h3>
        <div className="mt-4 space-y-3">
          <div className="rounded-2xl border border-line bg-panel-muted p-3">
            <div className="text-[12px] font-semibold text-ink">Mode</div>
            <div className="mt-2">
              <StatusBadge tone={pricingModeTone[service.pricingMode]}>{service.pricingMode}</StatusBadge>
            </div>
          </div>
          <div className="rounded-2xl border border-line bg-panel-muted p-3">
            <div className="text-[12px] font-semibold text-ink">Bidding</div>
            <p className="mt-2 text-[12px] leading-5 text-body">
              {service.biddingEnabled
                ? "Enabled for operationally complex or time-sensitive requests."
                : "Disabled so the customer path stays fixed-price and predictable."}
            </p>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button
            onClick={() =>
              pushToast({
                tone: "success",
                message: `${service.name} pricing draft exported for finance review.`,
              })
            }
            size="md"
            variant="secondary"
          >
            Export pricing draft
          </Button>
        </div>
      </Card>
    </div>
  );
}
