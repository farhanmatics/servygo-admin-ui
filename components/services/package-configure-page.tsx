"use client";

import Link from "next/link";
import { useMockAuth, useToast } from "@/components/providers";
import { Button } from "@/components/ui/button";
import { Card, StatPill } from "@/components/ui/card";
import { Field, Input, Select, Textarea } from "@/components/ui/input";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import {
  getLocalPackage,
  getRelatedPackages,
  localStatusTone,
  pricingModeTone,
  type PackageConfig,
  type ServiceLocation,
} from "@/lib/mock/services";

export function PackageConfigurePage({
  location,
  localPackage,
}: {
  location: ServiceLocation;
  localPackage: PackageConfig;
}) {
  const { isReadOnly } = useMockAuth();
  const { pushToast } = useToast();

  const lineage = getLocalPackage(location.id, localPackage.id);
  const serviceId = lineage?.service.id;
  const serviceName = lineage?.service.name;
  const subcategoryId = lineage?.subcategory.id;
  const subcategoryName = lineage?.subcategory.name;

  const breadcrumbs = [
    { href: "/services", label: "Services" },
    { href: `/services/locations/${location.id}`, label: `${location.city}, ${location.province}` },
    ...(serviceId && serviceName
      ? [{ href: `/services/locations/${location.id}/services/${serviceId}`, label: serviceName }]
      : []),
    ...(serviceId && subcategoryId && subcategoryName
      ? [
          {
            href: `/services/locations/${location.id}/services/${serviceId}/subcategories/${subcategoryId}`,
            label: subcategoryName,
          },
        ]
      : []),
    { label: `${localPackage.name} - Configure` },
  ];

  const hasBlockers = localPackage.publishBlockers.length > 0;
  const canPublish = !isReadOnly && !hasBlockers;
  const readyProviders = localPackage.assignedProviders.filter((provider) => provider.readiness === "ready").length;
  const totalProviders = localPackage.assignedProviders.length;
  const relatedPackages = localPackage.relatedPackageIds
    ? getRelatedPackages(location.id, localPackage.relatedPackageIds)
    : [];

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
        breadcrumbs={breadcrumbs}
        description="Author the customer-visible content, pricing, and readiness for this package in this location."
        eyebrow="Package configuration"
        title={localPackage.name}
      />

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.6fr)_minmax(320px,0.9fr)]">
        <div className="grid gap-4">
          <Card>
            <div className="eyebrow">Customer identity</div>
            <h3 className="mt-1 text-[1.1rem] leading-none">How this package is introduced on the site</h3>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <Field label="Package name">
                <Input defaultValue={localPackage.name} disabled={isReadOnly} readOnly={isReadOnly} />
              </Field>
              <Field label="Tagline">
                <Input
                  defaultValue={localPackage.tagline ?? ""}
                  disabled={isReadOnly}
                  placeholder="One-line sell for this package"
                  readOnly={isReadOnly}
                />
              </Field>
            </div>
            <div className="mt-4">
              <Field label="Long description">
                <Textarea
                  defaultValue={localPackage.longDescription ?? ""}
                  disabled={isReadOnly}
                  placeholder="Describe what's included, who it's for, and what makes it different."
                  readOnly={isReadOnly}
                />
              </Field>
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-[1fr_auto]">
              <Field label="Hero image URL">
                <Input
                  defaultValue={localPackage.heroImage ?? ""}
                  disabled={isReadOnly}
                  placeholder="/mock/cleaning/apartment-essentials.jpg"
                  readOnly={isReadOnly}
                />
              </Field>
              <div className="flex items-end">
                <div className="flex h-20 w-32 items-center justify-center rounded-xl border border-dashed border-line bg-panel-muted text-[11px] uppercase tracking-[0.12em] text-stone">
                  {localPackage.heroImage ? "image mock" : "no image"}
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="eyebrow">Pricing and duration</div>
                <h3 className="mt-1 text-[1.1rem] leading-none">Customer-facing price and window</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  disabled={isReadOnly}
                  onClick={() =>
                    pushToast({
                      tone: "success",
                      message: `${localPackage.name} package configuration saved as a mock draft.`,
                    })
                  }
                  title={isReadOnly ? "Read-only access" : undefined}
                >
                  Save package draft
                </Button>
                <Button
                  disabled={!canPublish}
                  onClick={() =>
                    pushToast({
                      tone: "success",
                      message: `${localPackage.name} submitted for mock publish review.`,
                    })
                  }
                  title={
                    isReadOnly
                      ? "Read-only access"
                      : hasBlockers
                        ? "Resolve publish blockers before submitting"
                        : undefined
                  }
                  variant="secondary"
                >
                  Submit for publish review
                </Button>
              </div>
            </div>
            <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <Field label="Customer price">
                <Input defaultValue={localPackage.price} disabled={isReadOnly} readOnly={isReadOnly} />
              </Field>
              <Field label="Starting price">
                <Input
                  defaultValue={localPackage.startingPrice ?? ""}
                  disabled={isReadOnly}
                  placeholder="From CAD 79"
                  readOnly={isReadOnly}
                />
              </Field>
              <Field label="Duration">
                <Input
                  defaultValue={localPackage.duration ?? ""}
                  disabled={isReadOnly}
                  placeholder="3 hours"
                  readOnly={isReadOnly}
                />
              </Field>
              <Field label="Pricing mode">
                <Select defaultValue={localPackage.pricingMode} disabled={isReadOnly}>
                  <option value="fixed">fixed</option>
                  <option value="bidding">bidding</option>
                  <option value="hybrid">hybrid</option>
                </Select>
              </Field>
            </div>
            {hasBlockers ? (
              <p className="mt-3 text-[12px] leading-5 text-danger">
                {localPackage.publishBlockers.length} blocker{localPackage.publishBlockers.length === 1 ? "" : "s"} must
                be cleared before this package can be published.
              </p>
            ) : null}
          </Card>

          <Card>
            <div className="eyebrow">Eligibility bullets</div>
            <h3 className="mt-1 text-[1.1rem] leading-none">Shown under &quot;Book this package&quot;</h3>
            {localPackage.selectionBullets && localPackage.selectionBullets.length > 0 ? (
              <ul className="mt-4 grid gap-2 md:grid-cols-2">
                {localPackage.selectionBullets.map((bullet) => (
                  <li className="rounded-2xl border border-line bg-panel-muted px-3 py-2.5 text-[13px] text-ink" key={bullet}>
                    {bullet}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 text-[13px] leading-6 text-stone">
                No eligibility bullets configured. Add constraints like &quot;Up to 1 bedroom&quot; so customers can self-select.
              </p>
            )}
          </Card>

          <Card>
            <div className="eyebrow">What&apos;s included</div>
            <h3 className="mt-1 text-[1.1rem] leading-none">Package inclusions checklist</h3>
            {localPackage.inclusions && localPackage.inclusions.length > 0 ? (
              <ul className="mt-4 grid gap-2 md:grid-cols-2">
                {localPackage.inclusions.map((inclusion) => (
                  <li
                    className="flex items-start gap-2 rounded-2xl border border-line bg-panel-muted px-3 py-2.5 text-[13px] text-ink"
                    key={inclusion.id}
                  >
                    <span aria-hidden className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-success/20 text-[10px] font-semibold text-success">
                      ✓
                    </span>
                    <span>{inclusion.label}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 text-[13px] leading-6 text-stone">
                No inclusions configured. Add at least 3 items so customers understand what they are paying for.
              </p>
            )}
          </Card>

          <Card>
            <div className="eyebrow">Add-ons</div>
            <h3 className="mt-1 text-[1.1rem] leading-none">Popular upgrades attached to this package</h3>
            {localPackage.addOns.length === 0 ? (
              <p className="mt-3 text-[13px] leading-6 text-stone">No add-ons configured for this package.</p>
            ) : (
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                {localPackage.addOns.map((addOn) => (
                  <div className="rounded-2xl border border-line bg-panel-muted px-3 py-3" key={addOn.id}>
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-[13px] font-medium text-ink">{addOn.name}</span>
                      {addOn.price ? (
                        <StatusBadge tone="info">{addOn.price}</StatusBadge>
                      ) : (
                        <span className="text-[11px] uppercase tracking-[0.12em] text-stone">no price</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>

          <Card>
            <div className="eyebrow">Recurring option</div>
            <h3 className="mt-1 text-[1.1rem] leading-none">Incentive for repeat bookings</h3>
            {localPackage.recurringOption ? (
              <div className="mt-4 grid gap-4 md:grid-cols-[auto_1fr]">
                <div className="rounded-2xl border border-gold/40 bg-gold/10 px-4 py-3 text-center">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-stone">Save</div>
                  <div className="mt-1 text-[1.5rem] font-semibold text-ink">
                    {localPackage.recurringOption.discountPercent}%
                  </div>
                  <div className="text-[11px] text-stone">recurring discount</div>
                </div>
                <div>
                  <div className="text-[12px] font-semibold uppercase tracking-[0.12em] text-stone">
                    Available cadences
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {localPackage.recurringOption.cadences.map((cadence) => (
                      <StatusBadge key={cadence} tone="success">{cadence}</StatusBadge>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <p className="mt-3 text-[13px] leading-6 text-stone">
                No recurring option configured. Add one to encourage weekly or monthly rebookings.
              </p>
            )}
          </Card>

          <Card>
            <div className="eyebrow">Policies</div>
            <h3 className="mt-1 text-[1.1rem] leading-none">Reschedule, guarantee, and refund copy</h3>
            {localPackage.policies ? (
              <div className="mt-4 grid gap-3 md:grid-cols-3">
                {(
                  [
                    ["Reschedule", localPackage.policies.reschedule],
                    ["Service guarantee", localPackage.policies.guarantee],
                    ["Refunds", localPackage.policies.refund],
                  ] as const
                ).map(([label, copy]) => (
                  <div className="rounded-2xl border border-line bg-panel-muted p-3" key={label}>
                    <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-stone">{label}</div>
                    <p className="mt-2 text-[12px] leading-5 text-body">{copy}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-3 text-[13px] leading-6 text-stone">
                No policies configured. Customers will fall back to global ServyGo defaults.
              </p>
            )}
          </Card>

          <Card>
            <div className="eyebrow">Intake fields</div>
            <h3 className="mt-1 text-[1.1rem] leading-none">What customers enter when booking</h3>
            {localPackage.fields.length === 0 ? (
              <p className="mt-3 text-[13px] leading-6 text-stone">No intake fields are defined for this package.</p>
            ) : (
              <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {localPackage.fields.map((field) => (
                  <div className="rounded-2xl border border-line bg-panel-muted p-3" key={field.id}>
                    <div className="flex items-center justify-between gap-2">
                      <div className="text-[13px] font-semibold text-ink">{field.label}</div>
                      <StatusBadge tone={field.required ? "success" : "info"}>
                        {field.required ? "required" : "optional"}
                      </StatusBadge>
                    </div>
                    <div className="mt-1 text-[12px] text-stone">{field.type}</div>
                    <p className="mt-2 text-[12px] leading-5 text-body">{field.note}</p>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>

        <aside className="grid gap-4">
          <Card>
            <div className="eyebrow">Publish readiness</div>
            <div className="mt-3 grid gap-2">
              <div className="flex items-center justify-between gap-3 rounded-xl border border-line bg-panel-muted px-3 py-2">
                <span className="text-[12px] text-stone">Status</span>
                <StatusBadge tone={localStatusTone[localPackage.status]}>{localPackage.status}</StatusBadge>
              </div>
              <div className="flex items-center justify-between gap-3 rounded-xl border border-line bg-panel-muted px-3 py-2">
                <span className="text-[12px] text-stone">Provider coverage</span>
                <StatusBadge tone={readyProviders > 0 ? "success" : "danger"}>
                  {readyProviders}/{totalProviders} ready
                </StatusBadge>
              </div>
              <div className="flex items-center justify-between gap-3 rounded-xl border border-line bg-panel-muted px-3 py-2">
                <span className="text-[12px] text-stone">Publish blockers</span>
                <StatusBadge tone={hasBlockers ? "danger" : "success"}>
                  {hasBlockers ? `${localPackage.publishBlockers.length} open` : "none"}
                </StatusBadge>
              </div>
            </div>
            {hasBlockers ? (
              <ul className="mt-3 space-y-2">
                {localPackage.publishBlockers.map((blocker) => (
                  <li
                    className="rounded-xl border border-danger/20 bg-danger-soft px-3 py-2 text-[12px] leading-5 text-body"
                    key={blocker}
                  >
                    {blocker}
                  </li>
                ))}
              </ul>
            ) : null}
            {serviceId ? (
              <Link
                className="mt-3 inline-flex text-[12px] font-medium text-forest hover:underline"
                href={`/services/locations/${location.id}/packages/${localPackage.id}/providers`}
              >
                Manage local providers →
              </Link>
            ) : null}
          </Card>

          {localPackage.rating ? (
            <Card>
              <div className="eyebrow">Customer rating</div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-[1.8rem] font-semibold text-ink">{localPackage.rating.score.toFixed(2)}</span>
                <span className="text-[12px] text-stone">/ 5</span>
              </div>
              <p className="mt-1 text-[12px] text-stone">
                Based on {localPackage.rating.reviewCount} customer review{localPackage.rating.reviewCount === 1 ? "" : "s"}.
              </p>
            </Card>
          ) : null}

          {localPackage.reviewHighlights && localPackage.reviewHighlights.length > 0 ? (
            <Card>
              <div className="eyebrow">Review highlights</div>
              <div className="mt-3 space-y-3">
                {localPackage.reviewHighlights.map((review) => (
                  <div className="rounded-2xl border border-line bg-panel-muted p-3" key={`${review.author}-${review.date}`}>
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-[12px] font-semibold text-ink">{review.author}</span>
                      <StatusBadge tone="success">{review.rating.toFixed(1)}</StatusBadge>
                    </div>
                    <p className="mt-2 text-[12px] leading-5 text-body">“{review.quote}”</p>
                    <div className="mt-1 text-[11px] text-stone">{review.date}</div>
                  </div>
                ))}
              </div>
            </Card>
          ) : null}

          {relatedPackages.length > 0 ? (
            <Card>
              <div className="eyebrow">Related packages</div>
              <p className="mt-1 text-[12px] text-stone">Shown as cross-sell under the customer page.</p>
              <ul className="mt-3 space-y-2">
                {relatedPackages.map(({ localPackage: related, subcategory }) => (
                  <li key={related.id}>
                    <Link
                      className="block rounded-xl border border-line bg-panel-muted px-3 py-2 transition hover:border-gold hover:bg-panel-strong"
                      href={`/services/locations/${location.id}/packages/${related.id}/configure`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[13px] font-medium text-ink">{related.name}</span>
                        <StatusBadge tone={localStatusTone[related.status]}>{related.status}</StatusBadge>
                      </div>
                      <div className="mt-1 text-[11px] text-stone">
                        {subcategory.name} · {related.startingPrice ?? related.price}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </Card>
          ) : null}
        </aside>
      </div>
    </div>
  );
}
