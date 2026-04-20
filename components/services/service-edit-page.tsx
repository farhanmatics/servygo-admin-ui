"use client";

import { useState } from "react";
import { useMockAuth, useToast } from "@/components/providers";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/choice-controls";
import { Field, Input, Select, Textarea } from "@/components/ui/input";
import { type ServiceProfile } from "@/lib/mock/services";

export function ServiceEditPage({ service }: { service: ServiceProfile }) {
  const { role } = useMockAuth();
  const { pushToast } = useToast();
  const [name, setName] = useState(service.name);
  const [segment, setSegment] = useState(service.segment);
  const [packageName, setPackageName] = useState(service.package);
  const [description, setDescription] = useState(service.description);

  const canEdit = role === "super-admin" || role === "operations-admin";

  return (
    <Card>
      <div className="eyebrow">Edit service</div>
      <h3 className="mt-2 text-[1.2rem] leading-none">Category and package configuration</h3>
      <p className="mt-2 text-[13px] leading-6 text-stone">
        This stays UI-only for now, but it already shows the kind of structured editing surface we need for service hierarchy, lifecycle, and description updates.
      </p>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <Field label="Service name">
          <Input disabled={!canEdit} onChange={(event) => setName(event.target.value)} value={name} />
        </Field>
        <Field label="Segment">
          <Input disabled={!canEdit} onChange={(event) => setSegment(event.target.value)} value={segment} />
        </Field>
        <Field label="Package">
          <Input disabled={!canEdit} onChange={(event) => setPackageName(event.target.value)} value={packageName} />
        </Field>
        <Field label="State">
          <Select defaultValue={service.state} disabled={!canEdit}>
            <option value="live">live</option>
            <option value="paused">paused</option>
            <option value="limited">limited</option>
          </Select>
        </Field>
      </div>

      <div className="mt-4">
        <Field label="Description">
          <Textarea disabled={!canEdit} onChange={(event) => setDescription(event.target.value)} value={description} />
        </Field>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <Checkbox defaultChecked={service.biddingEnabled} label="Enable bidding mode" />
        <Checkbox defaultChecked={service.state === "live"} label="Visible in customer booking flow" />
        <Checkbox defaultChecked label="Show add-ons at quote step" />
        <Checkbox defaultChecked={service.segment === "Commercial"} label="Require commercial-qualified providers" />
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <Button
          disabled={!canEdit}
          onClick={() =>
            pushToast({
              tone: "success",
              message: `${name} changes saved to the mock draft state.`,
            })
          }
          size="md"
        >
          Save draft
        </Button>
        <Button
          disabled={!canEdit}
          onClick={() =>
            pushToast({
              tone: "warning",
              message: `${name} changes marked ready for rollout review.`,
            })
          }
          size="md"
          variant="secondary"
        >
          Submit for review
        </Button>
      </div>
    </Card>
  );
}
