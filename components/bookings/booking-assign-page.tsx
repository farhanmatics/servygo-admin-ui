"use client";

import { useState } from "react";
import { useMockAuth, useToast } from "@/components/providers";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Field, Select, Textarea } from "@/components/ui/input";
import { type BookingProfile } from "@/lib/mock/bookings";

export function BookingAssignPage({ booking }: { booking: BookingProfile }) {
  const { isReadOnly } = useMockAuth();
  const { pushToast } = useToast();
  const [selectedOption, setSelectedOption] = useState(booking.reassignmentOptions[0] ?? "");
  const [reason, setReason] = useState("");

  return (
    <Card>
      <div className="eyebrow">Manual assignment</div>
      <h3 className="mt-2 text-[1.2rem] leading-none">Assign provider for booking {booking.id}</h3>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <Field label="Provider option">
          <Select onChange={(event) => setSelectedOption(event.target.value)} value={selectedOption}>
            {booking.reassignmentOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Operational reason">
          <Textarea
            onChange={(event) => setReason(event.target.value)}
            placeholder="Capture context before assignment confirmation..."
            value={reason}
          />
        </Field>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <Button
          disabled={isReadOnly || !selectedOption || !reason.trim()}
          onClick={() =>
            pushToast({
              tone: "success",
              message: `Mock assignment update saved for ${booking.id}: ${selectedOption}.`,
            })
          }
          size="sm"
          title={isReadOnly ? "Read-only access" : undefined}
        >
          Confirm assignment
        </Button>
        <Button
          onClick={() =>
            pushToast({
              tone: "info",
              message: "Dispatch comparison drawer will be added with API data.",
            })
          }
          size="sm"
          variant="ghost"
        >
          Compare candidates
        </Button>
      </div>
    </Card>
  );
}
