"use client";

import { useState } from "react";
import { useMockAuth, useToast } from "@/components/providers";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Field, Select, Textarea } from "@/components/ui/input";
import { StatusBadge } from "@/components/ui/status-badge";
import { type BookingProfile } from "@/lib/mock/bookings";

const reasons = [
  "Provider no-show",
  "Customer requested cancellation",
  "Compliance hold",
  "Duplicate booking",
  "Weather or emergency event",
];

export function BookingCancelPage({ booking }: { booking: BookingProfile }) {
  const { isReadOnly } = useMockAuth();
  const { pushToast } = useToast();
  const [reason, setReason] = useState(reasons[0]);
  const [note, setNote] = useState("");

  return (
    <Card>
      <div className="eyebrow text-danger">Cancellation flow</div>
      <h3 className="mt-2 text-[1.2rem] leading-none">Cancel booking {booking.id}</h3>
      <p className="mt-2 text-[13px] leading-6 text-body">
        Cancellation should always capture a reason, internal note, and follow-up instruction. This protects support and finance audit trails.
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {booking.cancellationPolicies.map((policy) => (
          <StatusBadge key={policy} tone="warning">
            {policy}
          </StatusBadge>
        ))}
      </div>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <Field label="Cancellation reason">
          <Select onChange={(event) => setReason(event.target.value)} value={reason}>
            {reasons.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Internal note">
          <Textarea
            onChange={(event) => setNote(event.target.value)}
            placeholder="Capture customer/provider impact and next actions..."
            value={note}
          />
        </Field>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <Button
          disabled={isReadOnly || !note.trim()}
          onClick={() =>
            pushToast({
              tone: "warning",
              message: `Mock cancellation staged for ${booking.id} with reason: ${reason}.`,
            })
          }
          size="sm"
          variant="danger"
        >
          Confirm cancellation
        </Button>
      </div>
    </Card>
  );
}
