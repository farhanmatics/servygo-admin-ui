"use client";

import { useToast } from "@/components/providers";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { coverageStateTone, type ServiceProfile } from "@/lib/mock/services";

export function ServiceCoveragePage({ service }: { service: ServiceProfile }) {
  const { pushToast } = useToast();

  return (
    <div className="grid gap-4 xl:grid-cols-[minmax(0,1.3fr)_minmax(320px,0.75fr)]">
      <Card>
        <div className="eyebrow">Coverage matrix</div>
        <h3 className="mt-2 text-[1.2rem] leading-none">Availability by province and city</h3>
        <div className="mt-4 space-y-3">
          {service.coverage.map((row) => (
            <div key={`${row.province}-${row.cities}`} className="rounded-2xl border border-line bg-panel-muted p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-[13px] font-semibold text-ink">{row.province}</div>
                  <div className="mt-1 text-[12px] text-stone">{row.cities}</div>
                </div>
                <StatusBadge tone={coverageStateTone[row.state]}>{row.state}</StatusBadge>
              </div>
              <p className="mt-3 text-[13px] leading-6 text-body">{row.note}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <div className="eyebrow">Rollout controls</div>
        <h3 className="mt-2 text-[1.15rem] leading-none">Territory expansion notes</h3>
        <div className="mt-4 space-y-3">
          {[
            "Use live for fully bookable cities with stable provider supply.",
            "Use pilot when a market is visible internally but still guarded for rollout review.",
            "Use paused when coverage exists conceptually but should not appear as active to customers.",
          ].map((note) => (
            <div key={note} className="rounded-2xl border border-line bg-panel-muted px-3 py-3">
              <p className="text-dense text-body">{note}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button
            onClick={() =>
              pushToast({
                tone: "warning",
                message: `${service.name} coverage changes marked for operational rollout review.`,
              })
            }
            size="md"
          >
            Queue coverage review
          </Button>
        </div>
      </Card>
    </div>
  );
}
