"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import { useMockAuth, useToast } from "@/components/providers";
import { Button } from "@/components/ui/button";
import { Card, StatPill } from "@/components/ui/card";
import { Field, Textarea } from "@/components/ui/input";
import { Modal } from "@/components/ui/overlay";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import { bookingPaymentTone, bookingPriorityTone, bookingStatusTone, type BookingProfile } from "@/lib/mock/bookings";

type ActionMode = "cancel" | "reassign" | null;

export function BookingDetailShell({
  booking,
  children,
}: {
  booking: BookingProfile;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const { isReadOnly } = useMockAuth();
  const { pushToast } = useToast();
  const [actionMode, setActionMode] = useState<ActionMode>(null);
  const [reason, setReason] = useState("");

  const links = [
    { href: `/bookings/${booking.id}`, label: "Overview" },
    { href: `/bookings/${booking.id}/assign`, label: "Assign" },
    { href: `/bookings/${booking.id}/reassign`, label: "Reassign" },
    { href: `/bookings/${booking.id}/cancel`, label: "Cancel" },
    { href: `/bookings/${booking.id}/reschedule`, label: "Reschedule" },
    { href: `/bookings/${booking.id}/timeline`, label: "Timeline" },
  ];

  return (
    <div className="admin-grid">
      <PageHeader
        actions={
          <>
            <StatPill label="territory" value={booking.city} />
            <StatusBadge tone={bookingStatusTone[booking.status]}>{booking.status}</StatusBadge>
            <StatusBadge tone={bookingPriorityTone[booking.priority]}>{booking.priority}</StatusBadge>
            <StatusBadge tone={bookingPaymentTone[booking.paymentStatus]}>{booking.paymentStatus}</StatusBadge>
            {!isReadOnly ? (
              <>
                <Button onClick={() => setActionMode("reassign")} size="md" variant="secondary">
                  Quick reassign
                </Button>
                <Button onClick={() => setActionMode("cancel")} size="md" variant="danger">
                  Cancel booking
                </Button>
              </>
            ) : (
              <StatusBadge tone="warning">Read-only</StatusBadge>
            )}
          </>
        }
        description={booking.internalNotes}
        eyebrow={booking.id}
        title={booking.packageName}
      />

      <section className="grid gap-4 xl:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.8fr)]">
        <Card>
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl border border-line bg-panel-muted p-3">
              <div className="eyebrow">Customer</div>
              <p className="mt-2 text-[13px] font-medium text-ink">{booking.customerName}</p>
            </div>
            <div className="rounded-2xl border border-line bg-panel-muted p-3">
              <div className="eyebrow">Provider</div>
              <p className="mt-2 text-[13px] font-medium text-ink">{booking.providerName}</p>
            </div>
            <div className="rounded-2xl border border-line bg-panel-muted p-3">
              <div className="eyebrow">Service window</div>
              <p className="mt-2 text-[13px] font-medium text-ink">{booking.scheduledWindow}</p>
            </div>
            <div className="rounded-2xl border border-line bg-panel-muted p-3">
              <div className="eyebrow">SLA state</div>
              <p className="mt-2 text-[13px] font-medium text-ink">{booking.slaState}</p>
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
          <div className="eyebrow">Linked records</div>
          <h3 className="mt-2 text-[1.15rem] leading-none">Cross-module visibility</h3>
          <div className="mt-4 space-y-3">
            {[
              `Documents: ${booking.linkedRecords.documents.join(", ") || "None"}`,
              `Payout references: ${booking.linkedRecords.payouts.join(", ") || "None"}`,
              `Review references: ${booking.linkedRecords.reviews.join(", ") || "None"}`,
            ].map((item) => (
              <div className="rounded-2xl border border-line bg-panel-muted px-3 py-3" key={item}>
                <p className="text-dense text-body">{item}</p>
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
              actions={<StatusBadge tone={actionMode === "cancel" ? "warning" : "info"}>{actionMode}</StatusBadge>}
              title={actionMode === "cancel" ? "Cancel booking" : "Reassign booking"}
            >
              <div className="grid gap-4">
                <p className="text-[13px] leading-6 text-body">
                  Capture operator rationale before confirming. Booking operations should always leave an auditable trail.
                </p>
                <Field label="Reason">
                  <Textarea
                    onChange={(event) => setReason(event.target.value)}
                    placeholder="Explain the trigger, impact, and approved next step..."
                    value={reason}
                  />
                </Field>
                <div className="flex flex-wrap gap-2">
                  <Button onClick={() => setActionMode(null)} size="sm" variant="ghost">
                    Close
                  </Button>
                  <Button
                    disabled={!reason.trim()}
                    onClick={() => {
                      pushToast({
                        tone: actionMode === "cancel" ? "warning" : "success",
                        message:
                          actionMode === "cancel"
                            ? `Cancellation review staged for ${booking.id}.`
                            : `Reassignment review staged for ${booking.id}.`,
                      });
                      setActionMode(null);
                      setReason("");
                    }}
                    size="sm"
                    variant={actionMode === "cancel" ? "danger" : "secondary"}
                  >
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
