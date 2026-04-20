"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import { useMockAuth, useToast } from "@/components/providers";
import { Button } from "@/components/ui/button";
import { Card, StatPill } from "@/components/ui/card";
import { Field, Select, Textarea } from "@/components/ui/input";
import { Modal } from "@/components/ui/overlay";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import { pricingModeTone, serviceStateTone, type PricingMode, type ServiceProfile, type ServiceState } from "@/lib/mock/services";

type ActionMode = "toggle-state" | "toggle-bidding" | null;

export function ServiceDetailShell({
  children,
  service,
}: {
  children: ReactNode;
  service: ServiceProfile;
}) {
  const pathname = usePathname();
  const { role } = useMockAuth();
  const { pushToast } = useToast();
  const [actionMode, setActionMode] = useState<ActionMode>(null);
  const [nextState, setNextState] = useState<ServiceState>(service.state);
  const [nextPricingMode, setNextPricingMode] = useState<PricingMode>(service.pricingMode);
  const [reason, setReason] = useState("");

  const canEdit = role === "super-admin" || role === "operations-admin";
  const links = [
    { href: `/services/${service.id}`, label: "Overview" },
    { href: `/services/${service.id}/edit`, label: "Edit" },
    { href: `/services/${service.id}/pricing`, label: "Pricing" },
    { href: `/services/${service.id}/coverage`, label: "Coverage" },
    { href: `/services/${service.id}/forms`, label: "Forms" },
  ];

  const submitAction = () => {
    pushToast({
      tone: actionMode === "toggle-state" ? "warning" : "success",
      message:
        actionMode === "toggle-state"
          ? `${service.name} staged to move to ${nextState}. Operational note captured.`
          : `${service.name} pricing mode staged for ${nextPricingMode}${nextPricingMode !== "fixed" ? " with bidding enabled" : ""}.`,
    });
    setActionMode(null);
    setReason("");
  };

  return (
    <div className="admin-grid">
      <PageHeader
        actions={
          <>
            <StatPill label="segment" value={service.segment} />
            <StatusBadge tone={serviceStateTone[service.state]}>{service.state}</StatusBadge>
            <StatusBadge tone={pricingModeTone[service.pricingMode]}>{service.pricingMode}</StatusBadge>
            {service.biddingEnabled ? <StatusBadge tone="warning">Bidding enabled</StatusBadge> : null}
            {canEdit ? (
              <>
                <Button onClick={() => setActionMode("toggle-state")} size="md" variant="secondary">
                  Change state
                </Button>
                <Button onClick={() => setActionMode("toggle-bidding")} size="md">
                  Pricing mode
                </Button>
              </>
            ) : (
              <StatusBadge tone="warning">View-only</StatusBadge>
            )}
          </>
        }
        description={service.description}
        eyebrow={service.id}
        title={service.name}
      />

      <section className="grid gap-4 xl:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.8fr)]">
        <Card>
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl border border-line bg-panel-muted p-3">
              <div className="eyebrow">Segment</div>
              <p className="mt-2 text-[13px] font-medium text-ink">{service.segment}</p>
            </div>
            <div className="rounded-2xl border border-line bg-panel-muted p-3">
              <div className="eyebrow">Package</div>
              <p className="mt-2 text-[13px] font-medium text-ink">{service.package}</p>
            </div>
            <div className="rounded-2xl border border-line bg-panel-muted p-3">
              <div className="eyebrow">Live regions</div>
              <p className="mt-2 text-[13px] font-medium text-ink">{service.liveRegions}</p>
            </div>
            <div className="rounded-2xl border border-line bg-panel-muted p-3">
              <div className="eyebrow">Created</div>
              <p className="mt-2 text-[13px] font-medium text-ink">{service.createdAt}</p>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2 border-t border-line pt-4">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  className={[
                    "rounded-xl border px-3 py-2 text-[12px] font-medium transition",
                    active
                      ? "border-gold bg-panel-strong text-ink shadow-sm"
                      : "border-line bg-panel text-stone hover:text-ink",
                  ].join(" ")}
                  href={link.href}
                  key={link.href}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </Card>

        <Card>
          <div className="eyebrow">Rollout note</div>
          <h3 className="mt-2 text-[1.15rem] leading-none">How this service behaves</h3>
          <p className="mt-2 text-[13px] leading-6 text-stone">{service.rolloutNote}</p>
          <div className="mt-4 space-y-3">
            {service.auditNotes.map((note) => (
              <div key={note} className="rounded-2xl border border-line bg-panel-muted px-3 py-3">
                <p className="text-dense text-body">{note}</p>
              </div>
            ))}
          </div>
        </Card>
      </section>

      {children}

      {actionMode ? (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-ink/25 px-4 backdrop-blur-sm">
          <div className="w-full max-w-xl">
            <Modal
              actions={<StatusBadge tone={actionMode === "toggle-state" ? "warning" : "info"}>{actionMode === "toggle-state" ? "state change" : "pricing mode"}</StatusBadge>}
              title={actionMode === "toggle-state" ? "Change service availability state" : "Configure pricing mode"}
            >
              <div className="grid gap-4">
                {actionMode === "toggle-state" ? (
                  <Field hint="Use live, paused, or limited to make rollout posture explicit." label="Next state">
                    <Select onChange={(event) => setNextState(event.target.value as ServiceState)} value={nextState}>
                      <option value="live">live</option>
                      <option value="paused">paused</option>
                      <option value="limited">limited</option>
                    </Select>
                  </Field>
                ) : (
                  <Field hint="Switching modes should explain why pricing logic is changing." label="Pricing mode">
                    <Select onChange={(event) => setNextPricingMode(event.target.value as PricingMode)} value={nextPricingMode}>
                      <option value="fixed">fixed</option>
                      <option value="bidding">bidding</option>
                      <option value="hybrid">hybrid</option>
                    </Select>
                  </Field>
                )}
                <Field label="Reason">
                  <Textarea
                    onChange={(event) => setReason(event.target.value)}
                    placeholder="Capture why the service behavior is changing..."
                    value={reason}
                  />
                </Field>
                <div className="flex flex-wrap gap-2">
                  <Button onClick={() => setActionMode(null)} size="sm" variant="ghost">
                    Cancel
                  </Button>
                  <Button disabled={!reason.trim()} onClick={submitAction} size="sm">
                    Confirm
                  </Button>
                </div>
              </div>
            </Modal>
          </div>
        </div>
      ) : null}
    </div>
  );
}
