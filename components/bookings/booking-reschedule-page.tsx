"use client";

import { useState } from "react";
import { useMockAuth, useToast } from "@/components/providers";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Field, Input, Textarea } from "@/components/ui/input";
import { type BookingProfile } from "@/lib/mock/bookings";

export function BookingReschedulePage({ booking }: { booking: BookingProfile }) {
  const { isReadOnly } = useMockAuth();
  const { pushToast } = useToast();
  const [newWindow, setNewWindow] = useState("");
  const [reason, setReason] = useState("");

  return (
    <Card>
      <div className="eyebrow">Reschedule flow</div>
      <h3 className="mt-2 text-[1.2rem] leading-none">Reschedule booking window</h3>
      <p className="mt-2 text-[13px] leading-6 text-body">
        Current window: <span className="font-medium text-ink">{booking.scheduledWindow}</span>
      </p>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <Field hint="Use a clear local time window." label="New date/time window">
          <Input
            onChange={(event) => setNewWindow(event.target.value)}
            placeholder="Example: Tomorrow 15:00 - 17:00"
            value={newWindow}
          />
        </Field>
        <Field label="Reschedule reason">
          <Textarea
            onChange={(event) => setReason(event.target.value)}
            placeholder="Capture why the schedule moved and who approved it..."
            value={reason}
          />
        </Field>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <Button
          disabled={isReadOnly || !newWindow.trim() || !reason.trim()}
          onClick={() =>
            pushToast({
              tone: "success",
              message: `Mock reschedule saved for ${booking.id}: ${newWindow}.`,
            })
          }
          size="sm"
        >
          Confirm reschedule
        </Button>
        <Button
          onClick={() =>
            pushToast({
              tone: "info",
              message: "Conflict checker and capacity matrix will be wired with backend data.",
            })
          }
          size="sm"
          variant="ghost"
        >
          Check conflicts
        </Button>
      </div>
    </Card>
  );
}
