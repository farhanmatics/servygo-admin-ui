"use client";

import { useState } from "react";
import { useMockAuth, useToast } from "@/components/providers";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Field, Select, Textarea } from "@/components/ui/input";
import { StatusBadge } from "@/components/ui/status-badge";
import { type BookingProfile } from "@/lib/mock/bookings";

export function BookingReassignPage({ booking }: { booking: BookingProfile }) {
  const { isReadOnly } = useMockAuth();
  const { pushToast } = useToast();
  const [nextProvider, setNextProvider] = useState(booking.reassignmentOptions[0] ?? "");
  const [reason, setReason] = useState("");

  return (
    <Card>
      <div className="eyebrow">Reassignment flow</div>
      <h3 className="mt-2 text-[1.2rem] leading-none">Move booking to another provider</h3>
      <div className="mt-3 flex flex-wrap gap-2">
        <StatusBadge tone="warning">Current provider: {booking.providerName}</StatusBadge>
        <StatusBadge tone="info">Current state: {booking.status}</StatusBadge>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <Field hint="Options are mock recommendations from dispatch and ops." label="New provider plan">
          <Select onChange={(event) => setNextProvider(event.target.value)} value={nextProvider}>
            {booking.reassignmentOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Reassignment rationale">
          <Textarea
            onChange={(event) => setReason(event.target.value)}
            placeholder="What happened, why this option, and who approved it..."
            value={reason}
          />
        </Field>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <Button
          disabled={isReadOnly || !nextProvider || !reason.trim()}
          onClick={() =>
            pushToast({
              tone: "success",
              message: `Mock reassignment queued for ${booking.id}.`,
            })
          }
          size="sm"
        >
          Confirm reassignment
        </Button>
        <Button
          onClick={() =>
            pushToast({
              tone: "warning",
              message: "Customer notification preview is staged for future integration.",
            })
          }
          size="sm"
          variant="ghost"
        >
          Notify customer preview
        </Button>
      </div>
    </Card>
  );
}
