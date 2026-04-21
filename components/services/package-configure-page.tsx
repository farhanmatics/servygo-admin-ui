"use client";

import { useToast } from "@/components/providers";
import { Button } from "@/components/ui/button";
import { Card, StatPill } from "@/components/ui/card";
import { Field, Input, Select } from "@/components/ui/input";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import { localStatusTone, pricingModeTone, type PackageConfig, type ServiceLocation } from "@/lib/mock/services";

export function PackageConfigurePage({ location, localPackage }: { location: ServiceLocation; localPackage: PackageConfig }) {
  const { pushToast } = useToast();

  return (
    <div className="admin-grid">
      <PageHeader
        actions={
          <>
            <StatPill label="location" value={location.city} />
            <StatusBadge tone={localStatusTone[localPackage.status]}>{localPackage.status}</StatusBadge>
            <StatusBadge tone={pricingModeTone[localPackage.pricingMode]}>{localPackage.pricingMode}</StatusBadge>
          </>
        }
        description="Configure package-specific pricing, add-ons, intake fields, and publish readiness for this location."
        eyebrow="Package configuration"
        title={localPackage.name}
      />

      <section className="grid gap-4 xl:grid-cols-[minmax(0,1.25fr)_minmax(320px,0.8fr)]">
        <Card>
          <div className="eyebrow">Pricing and customer settings</div>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <Field label="Customer price">
              <Input defaultValue={localPackage.price} />
            </Field>
            <Field label="Pricing mode">
              <Select defaultValue={localPackage.pricingMode}>
                <option value="fixed">fixed</option>
                <option value="bidding">bidding</option>
                <option value="hybrid">hybrid</option>
              </Select>
            </Field>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            <Button
              onClick={() =>
                pushToast({
                  tone: "success",
                  message: `${localPackage.name} package configuration saved as a mock draft.`,
                })
              }
            >
              Save package draft
            </Button>
            <Button variant="secondary">Submit for publish review</Button>
          </div>
        </Card>

        <Card>
          <div className="eyebrow">Add-ons</div>
          <div className="mt-4 space-y-3">
            {localPackage.addOns.map((addon) => (
              <div key={addon} className="rounded-2xl border border-line bg-panel-muted px-3 py-3">
                <p className="text-dense text-body">{addon}</p>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <Card>
        <div className="eyebrow">Intake fields</div>
        <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {localPackage.fields.map((field) => (
            <div key={field.id} className="rounded-2xl border border-line bg-panel-muted p-3">
              <div className="flex items-center justify-between gap-2">
                <div className="text-[13px] font-semibold text-ink">{field.label}</div>
                <StatusBadge tone={field.required ? "success" : "info"}>{field.required ? "required" : "optional"}</StatusBadge>
              </div>
              <div className="mt-1 text-[12px] text-stone">{field.type}</div>
              <p className="mt-2 text-[12px] leading-5 text-body">{field.note}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
