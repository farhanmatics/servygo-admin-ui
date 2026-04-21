"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useMockAuth, useToast } from "@/components/providers";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Field, Input, Select, Textarea } from "@/components/ui/input";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import type { LocalStatus } from "@/lib/mock/services";

type SeedService = {
  id: string;
  name: string;
  blurb: string;
};

const SEED_SERVICES: SeedService[] = [
  { id: "svc-cleaning", name: "Cleaning", blurb: "Residential and commercial cleaning packages." },
  { id: "svc-car-detailing", name: "Car Detailing", blurb: "Basic wash to premium detailing." },
  { id: "svc-logistic", name: "Logistic", blurb: "Delivery and moving support." },
  { id: "svc-printing-packaging", name: "Printing & Packaging", blurb: "Design and print fulfilment." },
  { id: "svc-it-ecommerce", name: "IT & E-commerce", blurb: "Web, e-commerce, and IT setup." },
  { id: "svc-janitorial-training", name: "Janitorial Training", blurb: "Safety, equipment, and compliance training." },
];

const PROVINCES = [
  { code: "AB", name: "Alberta" },
  { code: "BC", name: "British Columbia" },
  { code: "MB", name: "Manitoba" },
  { code: "NB", name: "New Brunswick" },
  { code: "NL", name: "Newfoundland and Labrador" },
  { code: "NS", name: "Nova Scotia" },
  { code: "NT", name: "Northwest Territories" },
  { code: "NU", name: "Nunavut" },
  { code: "ON", name: "Ontario" },
  { code: "PE", name: "Prince Edward Island" },
  { code: "QC", name: "Quebec" },
  { code: "SK", name: "Saskatchewan" },
  { code: "YT", name: "Yukon" },
];

export function NewLocationPage() {
  const router = useRouter();
  const { isReadOnly } = useMockAuth();
  const { pushToast } = useToast();

  const [city, setCity] = useState("");
  const [province, setProvince] = useState("SK");
  const [territory, setTerritory] = useState("");
  const [status, setStatus] = useState<LocalStatus>("pilot");
  const [marketLead, setMarketLead] = useState("");
  const [notes, setNotes] = useState("");
  const [seedServiceIds, setSeedServiceIds] = useState<string[]>(["svc-cleaning"]);

  const hasRequired = city.trim().length > 0 && territory.trim().length > 0 && marketLead.trim().length > 0;
  const canSubmit = !isReadOnly && hasRequired;

  const blockers = useMemo(() => {
    const list: string[] = [];
    if (!city.trim()) list.push("City is required.");
    if (!territory.trim()) list.push("Territory is required so dispatch routing is clear.");
    if (!marketLead.trim()) list.push("A market lead is required to own onboarding.");
    if (seedServiceIds.length === 0) list.push("Select at least one service to plan rollout.");
    return list;
  }, [city, territory, marketLead, seedServiceIds]);

  function toggleSeedService(id: string) {
    setSeedServiceIds((current) =>
      current.includes(id) ? current.filter((value) => value !== id) : [...current, id],
    );
  }

  function handleSubmit(mode: "draft" | "launch") {
    if (isReadOnly) return;
    if (mode === "launch" && !hasRequired) {
      pushToast({ tone: "danger", message: "Fix required fields before launching the location." });
      return;
    }

    pushToast({
      tone: "success",
      message:
        mode === "draft"
          ? `Saved ${city || "new location"} as a pilot draft (mock). Enable services next.`
          : `${city}, ${province} submitted for launch (mock). Track progress on the services matrix.`,
    });
    router.push("/services");
  }

  return (
    <div className="admin-grid">
      <PageHeader
        actions={
          <>
            <Button onClick={() => router.push("/services")} size="md" variant="secondary">
              Cancel
            </Button>
            <Button
              disabled={isReadOnly}
              onClick={() => handleSubmit("draft")}
              size="md"
              title={isReadOnly ? "Read-only access" : undefined}
              variant="secondary"
            >
              Save draft
            </Button>
            <Button
              disabled={!canSubmit}
              onClick={() => handleSubmit("launch")}
              size="md"
              title={
                isReadOnly
                  ? "Read-only access"
                  : !hasRequired
                    ? "Fill required fields before launching"
                    : undefined
              }
            >
              Launch location
            </Button>
          </>
        }
        breadcrumbs={[
          { href: "/services", label: "Services" },
          { label: "New location" },
        ]}
        description="Define a new market so services, subcategories, packages, and providers can be configured under it."
        eyebrow="Location intake"
        title="Launch a new service location"
      />

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.6fr)_minmax(320px,0.9fr)]">
        <div className="grid gap-4">
          <Card>
            <div className="eyebrow">Location details</div>
            <h3 className="mt-1 text-[1.1rem] leading-none">Where will this market operate?</h3>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <Field hint="The primary city this market covers." label="City">
                <Input
                  disabled={isReadOnly}
                  onChange={(event) => setCity(event.target.value)}
                  placeholder="Regina"
                  readOnly={isReadOnly}
                  value={city}
                />
              </Field>
              <Field label="Province">
                <Select
                  disabled={isReadOnly}
                  onChange={(event) => setProvince(event.target.value)}
                  value={province}
                >
                  {PROVINCES.map((item) => (
                    <option key={item.code} value={item.code}>
                      {item.name} ({item.code})
                    </option>
                  ))}
                </Select>
              </Field>
              <Field hint="Regional grouping used for dispatch and reporting." label="Territory">
                <Input
                  disabled={isReadOnly}
                  onChange={(event) => setTerritory(event.target.value)}
                  placeholder="Southern Saskatchewan"
                  readOnly={isReadOnly}
                  value={territory}
                />
              </Field>
              <Field hint="Live markets are customer-bookable. Pilot is internal-only." label="Launch status">
                <Select
                  disabled={isReadOnly}
                  onChange={(event) => setStatus(event.target.value as LocalStatus)}
                  value={status}
                >
                  <option value="pilot">Pilot</option>
                  <option value="live">Live</option>
                  <option value="paused">Paused</option>
                  <option value="blocked">Blocked</option>
                </Select>
              </Field>
            </div>
          </Card>

          <Card>
            <div className="eyebrow">Market ownership</div>
            <h3 className="mt-1 text-[1.1rem] leading-none">Who owns this rollout?</h3>
            <div className="mt-5 grid gap-4">
              <Field
                hint="The operations admin accountable for provider onboarding and publish readiness."
                label="Market lead"
              >
                <Input
                  disabled={isReadOnly}
                  onChange={(event) => setMarketLead(event.target.value)}
                  placeholder="Jane Doe"
                  readOnly={isReadOnly}
                  value={marketLead}
                />
              </Field>
              <Field
                hint="Optional context for the onboarding team: launch goals, known risks, key partners."
                label="Briefing notes"
              >
                <Textarea
                  disabled={isReadOnly}
                  onChange={(event) => setNotes(event.target.value)}
                  placeholder="Targeting residential + commercial cleaning for Q3. Two partners already verified."
                  readOnly={isReadOnly}
                  value={notes}
                />
              </Field>
            </div>
          </Card>

          <Card>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="eyebrow">Services to enable on launch</div>
                <h3 className="mt-1 text-[1.1rem] leading-none">Pick the catalogue this market will start with</h3>
              </div>
              <StatusBadge tone={seedServiceIds.length === 0 ? "warning" : "info"}>
                {seedServiceIds.length} selected
              </StatusBadge>
            </div>
            <p className="mt-2 text-[12px] leading-5 text-stone">
              Subcategories, packages, and providers are configured after launch on the location setup page.
            </p>
            <div className="mt-4 grid gap-2 md:grid-cols-2">
              {SEED_SERVICES.map((service) => {
                const checked = seedServiceIds.includes(service.id);
                return (
                  <label
                    className={[
                      "flex cursor-pointer items-start gap-3 rounded-2xl border px-3 py-2.5 transition",
                      checked
                        ? "border-gold bg-gold/10"
                        : "border-line bg-panel-muted hover:border-line-strong hover:bg-panel-strong",
                      isReadOnly ? "pointer-events-none opacity-60" : "",
                    ].join(" ")}
                    key={service.id}
                  >
                    <input
                      checked={checked}
                      className="mt-1 h-4 w-4 accent-forest"
                      disabled={isReadOnly}
                      onChange={() => toggleSeedService(service.id)}
                      type="checkbox"
                    />
                    <div>
                      <div className="text-[13px] font-medium text-ink">{service.name}</div>
                      <div className="mt-0.5 text-[11px] leading-4 text-stone">{service.blurb}</div>
                    </div>
                  </label>
                );
              })}
            </div>
          </Card>
        </div>

        <aside className="grid gap-4">
          <Card>
            <div className="eyebrow">Launch checklist</div>
            <p className="mt-1 text-[12px] leading-5 text-stone">
              All required fields must be complete before a location can go live.
            </p>
            <ul className="mt-3 space-y-2">
              {blockers.length === 0 ? (
                <li className="rounded-xl border border-success/20 bg-success-soft px-3 py-2 text-[12px] leading-5 text-body">
                  Ready to launch. You can still save as draft if you need sign-off.
                </li>
              ) : (
                blockers.map((blocker) => (
                  <li
                    className="rounded-xl border border-line bg-panel-muted px-3 py-2 text-[12px] leading-5 text-body"
                    key={blocker}
                  >
                    {blocker}
                  </li>
                ))
              )}
            </ul>
          </Card>

          <Card>
            <div className="eyebrow">What happens next</div>
            <ol className="mt-3 space-y-3 text-[12px] leading-5 text-body">
              <li className="flex gap-2">
                <span aria-hidden className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-forest text-[11px] font-semibold text-cream">
                  1
                </span>
                Open the location setup page and enable each selected service with notes and pricing mode.
              </li>
              <li className="flex gap-2">
                <span aria-hidden className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-forest text-[11px] font-semibold text-cream">
                  2
                </span>
                Configure subcategories and packages to match customer-facing content.
              </li>
              <li className="flex gap-2">
                <span aria-hidden className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-forest text-[11px] font-semibold text-cream">
                  3
                </span>
                Assign verified local providers and resolve any publish blockers before going live.
              </li>
            </ol>
          </Card>

          <Card>
            <div className="eyebrow">Heads up</div>
            <p className="mt-2 text-[12px] leading-5 text-body">
              This form is mock-only. Creating a location does not persist to the services matrix yet — it mirrors the
              UX flow so the final API wiring can replace it one-for-one.
            </p>
          </Card>
        </aside>
      </div>
    </div>
  );
}
