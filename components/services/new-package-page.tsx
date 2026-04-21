"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useMockAuth, useToast } from "@/components/providers";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Field, Input, Select, Textarea } from "@/components/ui/input";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import type { LocalService, LocalSubcategory, LocalStatus, PricingMode, ServiceLocation } from "@/lib/mock/services";

type BulletDraft = { id: string; value: string };
type InclusionDraft = { id: string; value: string };
type AddOnDraft = { id: string; name: string; price: string };

function makeId(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 8)}`;
}

export function NewPackagePage({
  location,
  service,
  subcategory,
}: {
  location: ServiceLocation;
  service: LocalService;
  subcategory: LocalSubcategory;
}) {
  const router = useRouter();
  const { isReadOnly } = useMockAuth();
  const { pushToast } = useToast();

  const [name, setName] = useState("");
  const [tagline, setTagline] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [price, setPrice] = useState("");
  const [startingPrice, setStartingPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [pricingMode, setPricingMode] = useState<PricingMode>("fixed");
  const [status, setStatus] = useState<LocalStatus>("pilot");

  const [bullets, setBullets] = useState<BulletDraft[]>([{ id: makeId("blt"), value: "" }]);
  const [inclusions, setInclusions] = useState<InclusionDraft[]>([
    { id: makeId("inc"), value: "" },
    { id: makeId("inc"), value: "" },
    { id: makeId("inc"), value: "" },
  ]);
  const [addOns, setAddOns] = useState<AddOnDraft[]>([{ id: makeId("ao"), name: "", price: "" }]);

  const filledBullets = bullets.filter((item) => item.value.trim().length > 0);
  const filledInclusions = inclusions.filter((item) => item.value.trim().length > 0);
  const filledAddOns = addOns.filter((item) => item.name.trim().length > 0);

  const hasRequired = name.trim().length > 0 && price.trim().length > 0;
  const blockers = useMemo(() => {
    const list: string[] = [];
    if (!name.trim()) list.push("Package name is required.");
    if (!price.trim()) list.push("Customer price is required for dispatch quotes.");
    if (!tagline.trim()) list.push("Tagline recommended so customers understand the package at a glance.");
    if (filledInclusions.length < 3) list.push("Add at least 3 inclusions so customers know what they are paying for.");
    if (filledAddOns.length === 0) list.push("Add at least one add-on to support bookable upsells.");
    return list;
  }, [name, price, tagline, filledInclusions.length, filledAddOns.length]);
  const canCreate = !isReadOnly && hasRequired;

  function handleCreate(next: "configure" | "stay") {
    if (!canCreate) {
      if (!isReadOnly) {
        pushToast({ tone: "danger", message: "Fix required fields before creating the package." });
      }
      return;
    }

    pushToast({
      tone: "success",
      message: `${name} created as a ${status} draft under ${subcategory.name} (mock). Continue to configure.`,
    });

    const packagesListHref = `/services/locations/${location.id}/services/${service.id}/subcategories/${subcategory.id}`;
    if (next === "configure") {
      router.push(packagesListHref);
    } else {
      router.push(packagesListHref);
    }
  }

  return (
    <div className="admin-grid">
      <PageHeader
        actions={
          <>
            <Button
              onClick={() =>
                router.push(
                  `/services/locations/${location.id}/services/${service.id}/subcategories/${subcategory.id}`,
                )
              }
              size="md"
              variant="secondary"
            >
              Cancel
            </Button>
            <Button
              disabled={!canCreate}
              onClick={() => handleCreate("stay")}
              size="md"
              title={
                isReadOnly
                  ? "Read-only access"
                  : !hasRequired
                    ? "Fill required fields before saving"
                    : undefined
              }
              variant="secondary"
            >
              Save draft
            </Button>
            <Button
              disabled={!canCreate}
              onClick={() => handleCreate("configure")}
              size="md"
              title={
                isReadOnly
                  ? "Read-only access"
                  : !hasRequired
                    ? "Fill required fields before continuing"
                    : undefined
              }
            >
              Create and configure
            </Button>
          </>
        }
        breadcrumbs={[
          { href: "/services", label: "Services" },
          { href: `/services/locations/${location.id}`, label: `${location.city}, ${location.province}` },
          { href: `/services/locations/${location.id}/services/${service.id}`, label: service.name },
          {
            href: `/services/locations/${location.id}/services/${service.id}/subcategories/${subcategory.id}`,
            label: subcategory.name,
          },
          { label: "New package" },
        ]}
        description={`Seed a new package under ${subcategory.name}. Customer content and providers are completed after creation.`}
        eyebrow="Package intake"
        title="Create a new package"
      />

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.6fr)_minmax(320px,0.9fr)]">
        <div className="grid gap-4">
          <Card>
            <div className="eyebrow">Identity</div>
            <h3 className="mt-1 text-[1.1rem] leading-none">How the package is introduced</h3>
            <div className="mt-5 grid gap-4">
              <Field hint="Shown as the package title on the customer page." label="Package name">
                <Input
                  disabled={isReadOnly}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Apartment Essentials"
                  readOnly={isReadOnly}
                  value={name}
                />
              </Field>
              <Field hint="One-line sell. Appears under the title." label="Tagline">
                <Input
                  disabled={isReadOnly}
                  onChange={(event) => setTagline(event.target.value)}
                  placeholder="A dependable weekly refresh for studios and 1-bed condos."
                  readOnly={isReadOnly}
                  value={tagline}
                />
              </Field>
              <Field hint="Optional at creation. Expand later on the configure page." label="Long description">
                <Textarea
                  disabled={isReadOnly}
                  onChange={(event) => setLongDescription(event.target.value)}
                  placeholder="Kitchen, bathroom, living area and bedroom - top-to-bottom tidy with eco-safe products."
                  readOnly={isReadOnly}
                  value={longDescription}
                />
              </Field>
            </div>
          </Card>

          <Card>
            <div className="eyebrow">Pricing and duration</div>
            <h3 className="mt-1 text-[1.1rem] leading-none">Base pricing for the local market</h3>
            <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <Field hint="Internal reference price." label="Customer price">
                <Input
                  disabled={isReadOnly}
                  onChange={(event) => setPrice(event.target.value)}
                  placeholder="CAD 109 / 2h"
                  readOnly={isReadOnly}
                  value={price}
                />
              </Field>
              <Field hint="Shown on the customer card as 'From CAD 79'." label="Starting price">
                <Input
                  disabled={isReadOnly}
                  onChange={(event) => setStartingPrice(event.target.value)}
                  placeholder="From CAD 79"
                  readOnly={isReadOnly}
                  value={startingPrice}
                />
              </Field>
              <Field hint="Estimated window used for dispatch planning." label="Duration">
                <Input
                  disabled={isReadOnly}
                  onChange={(event) => setDuration(event.target.value)}
                  placeholder="3 hours"
                  readOnly={isReadOnly}
                  value={duration}
                />
              </Field>
              <Field label="Pricing mode">
                <Select
                  disabled={isReadOnly}
                  onChange={(event) => setPricingMode(event.target.value as PricingMode)}
                  value={pricingMode}
                >
                  <option value="fixed">fixed</option>
                  <option value="bidding">bidding</option>
                  <option value="hybrid">hybrid</option>
                </Select>
              </Field>
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <Field hint="Pilot is internal-only. Live requires providers and resolved blockers." label="Initial status">
                <Select
                  disabled={isReadOnly}
                  onChange={(event) => setStatus(event.target.value as LocalStatus)}
                  value={status}
                >
                  <option value="pilot">Pilot</option>
                  <option value="paused">Paused</option>
                  <option value="live">Live</option>
                </Select>
              </Field>
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="eyebrow">Eligibility bullets</div>
                <h3 className="mt-1 text-[1.1rem] leading-none">Self-select constraints for customers</h3>
              </div>
              <Button
                disabled={isReadOnly}
                onClick={() => setBullets((current) => [...current, { id: makeId("blt"), value: "" }])}
                size="sm"
                variant="secondary"
              >
                Add bullet
              </Button>
            </div>
            <p className="mt-2 text-[12px] leading-5 text-stone">
              Example: &quot;Up to 1 bedroom&quot;, &quot;Single bathroom&quot;. Keep them short.
            </p>
            <div className="mt-4 grid gap-2">
              {bullets.map((bullet, index) => (
                <div className="flex gap-2" key={bullet.id}>
                  <Input
                    disabled={isReadOnly}
                    onChange={(event) =>
                      setBullets((current) =>
                        current.map((item) => (item.id === bullet.id ? { ...item, value: event.target.value } : item)),
                      )
                    }
                    placeholder={index === 0 ? "Up to 1 bedroom" : "Another constraint"}
                    readOnly={isReadOnly}
                    value={bullet.value}
                  />
                  <Button
                    disabled={isReadOnly || bullets.length === 1}
                    onClick={() => setBullets((current) => current.filter((item) => item.id !== bullet.id))}
                    size="sm"
                    variant="ghost"
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="eyebrow">What&apos;s included</div>
                <h3 className="mt-1 text-[1.1rem] leading-none">Checklist shown on the customer page</h3>
              </div>
              <Button
                disabled={isReadOnly}
                onClick={() => setInclusions((current) => [...current, { id: makeId("inc"), value: "" }])}
                size="sm"
                variant="secondary"
              >
                Add inclusion
              </Button>
            </div>
            <p className="mt-2 text-[12px] leading-5 text-stone">
              Minimum 3 suggested. You can edit and reorder later on the configure page.
            </p>
            <div className="mt-4 grid gap-2">
              {inclusions.map((inclusion, index) => (
                <div className="flex gap-2" key={inclusion.id}>
                  <Input
                    disabled={isReadOnly}
                    onChange={(event) =>
                      setInclusions((current) =>
                        current.map((item) =>
                          item.id === inclusion.id ? { ...item, value: event.target.value } : item,
                        ),
                      )
                    }
                    placeholder={index === 0 ? "Kitchen surfaces and sink" : "Additional inclusion"}
                    readOnly={isReadOnly}
                    value={inclusion.value}
                  />
                  <Button
                    disabled={isReadOnly || inclusions.length === 1}
                    onClick={() => setInclusions((current) => current.filter((item) => item.id !== inclusion.id))}
                    size="sm"
                    variant="ghost"
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="eyebrow">Add-ons</div>
                <h3 className="mt-1 text-[1.1rem] leading-none">Optional upgrades with pricing</h3>
              </div>
              <Button
                disabled={isReadOnly}
                onClick={() => setAddOns((current) => [...current, { id: makeId("ao"), name: "", price: "" }])}
                size="sm"
                variant="secondary"
              >
                Add add-on
              </Button>
            </div>
            <div className="mt-4 grid gap-2">
              {addOns.map((addOn, index) => (
                <div className="grid gap-2 md:grid-cols-[1fr_200px_auto]" key={addOn.id}>
                  <Input
                    disabled={isReadOnly}
                    onChange={(event) =>
                      setAddOns((current) =>
                        current.map((item) =>
                          item.id === addOn.id ? { ...item, name: event.target.value } : item,
                        ),
                      )
                    }
                    placeholder={index === 0 ? "Inside fridge" : "Add-on name"}
                    readOnly={isReadOnly}
                    value={addOn.name}
                  />
                  <Input
                    disabled={isReadOnly}
                    onChange={(event) =>
                      setAddOns((current) =>
                        current.map((item) =>
                          item.id === addOn.id ? { ...item, price: event.target.value } : item,
                        ),
                      )
                    }
                    placeholder="+CAD 10"
                    readOnly={isReadOnly}
                    value={addOn.price}
                  />
                  <Button
                    disabled={isReadOnly || addOns.length === 1}
                    onClick={() => setAddOns((current) => current.filter((item) => item.id !== addOn.id))}
                    size="sm"
                    variant="ghost"
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <aside className="grid gap-4">
          <Card>
            <div className="eyebrow">Parent context</div>
            <div className="mt-3 grid gap-2 text-[12px] leading-5">
              <div className="flex items-center justify-between gap-3 rounded-xl border border-line bg-panel-muted px-3 py-2">
                <span className="text-stone">Location</span>
                <span className="font-medium text-ink">
                  {location.city}, {location.province}
                </span>
              </div>
              <div className="flex items-center justify-between gap-3 rounded-xl border border-line bg-panel-muted px-3 py-2">
                <span className="text-stone">Service</span>
                <span className="font-medium text-ink">{service.name}</span>
              </div>
              <div className="flex items-center justify-between gap-3 rounded-xl border border-line bg-panel-muted px-3 py-2">
                <span className="text-stone">Subcategory</span>
                <span className="font-medium text-ink">{subcategory.name}</span>
              </div>
            </div>
          </Card>

          <Card>
            <div className="eyebrow">Creation checklist</div>
            <p className="mt-1 text-[12px] leading-5 text-stone">
              Required before creation. Soft hints can be completed later on the configure page.
            </p>
            <ul className="mt-3 space-y-2">
              <li className="flex items-center justify-between gap-3 rounded-xl border border-line bg-panel-muted px-3 py-2">
                <span className="text-[12px] text-body">Name and price filled</span>
                <StatusBadge tone={hasRequired ? "success" : "danger"}>
                  {hasRequired ? "ok" : "missing"}
                </StatusBadge>
              </li>
              <li className="flex items-center justify-between gap-3 rounded-xl border border-line bg-panel-muted px-3 py-2">
                <span className="text-[12px] text-body">Bullets added</span>
                <StatusBadge tone={filledBullets.length > 0 ? "success" : "warning"}>
                  {filledBullets.length} bullet{filledBullets.length === 1 ? "" : "s"}
                </StatusBadge>
              </li>
              <li className="flex items-center justify-between gap-3 rounded-xl border border-line bg-panel-muted px-3 py-2">
                <span className="text-[12px] text-body">Inclusions filled</span>
                <StatusBadge tone={filledInclusions.length >= 3 ? "success" : "warning"}>
                  {filledInclusions.length} of 3+
                </StatusBadge>
              </li>
              <li className="flex items-center justify-between gap-3 rounded-xl border border-line bg-panel-muted px-3 py-2">
                <span className="text-[12px] text-body">Add-ons seeded</span>
                <StatusBadge tone={filledAddOns.length > 0 ? "success" : "warning"}>
                  {filledAddOns.length} ready
                </StatusBadge>
              </li>
            </ul>
            {blockers.length > 0 ? (
              <ul className="mt-3 space-y-2">
                {blockers.map((blocker) => (
                  <li
                    className="rounded-xl border border-line bg-panel-muted px-3 py-2 text-[12px] leading-5 text-body"
                    key={blocker}
                  >
                    {blocker}
                  </li>
                ))}
              </ul>
            ) : null}
          </Card>

          <Card>
            <div className="eyebrow">What happens next</div>
            <ol className="mt-3 space-y-3 text-[12px] leading-5 text-body">
              <li className="flex gap-2">
                <span aria-hidden className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-forest text-[11px] font-semibold text-cream">
                  1
                </span>
                Complete customer copy on the configure page (hero, policies, recurring option, reviews).
              </li>
              <li className="flex gap-2">
                <span aria-hidden className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-forest text-[11px] font-semibold text-cream">
                  2
                </span>
                Assign verified local providers and confirm SLA coverage.
              </li>
              <li className="flex gap-2">
                <span aria-hidden className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-forest text-[11px] font-semibold text-cream">
                  3
                </span>
                Submit for publish review once all blockers are cleared.
              </li>
            </ol>
          </Card>

          <Card>
            <div className="eyebrow">Heads up</div>
            <p className="mt-2 text-[12px] leading-5 text-body">
              This form is mock-only. Creating a package does not persist to the catalogue yet &mdash; it mirrors the UX
              flow so the final API wiring can replace it one-for-one.
            </p>
          </Card>
        </aside>
      </div>
    </div>
  );
}
