"use client";

import Link from "next/link";
import { useToast } from "@/components/providers";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import { territoryCards, territoryHealthTone } from "@/lib/mock/operations";

export function TerritoriesBoardPage() {
  const { pushToast } = useToast();

  return (
    <div className="admin-grid">
      <PageHeader
        actions={
          <>
            <Link href="/operations/live">
              <Button size="md" variant="secondary">
                Back to live monitor
              </Button>
            </Link>
            <Link href="/operations/emergency">
              <Button size="md">Emergency controls</Button>
            </Link>
          </>
        }
        description="Territory operations should make staffing pressure and queue health immediately scannable across regions."
        eyebrow="Operations board"
        title="Territory Operations"
      />

      <section className="grid gap-4 md:grid-cols-2">
        {territoryCards.map((territory) => (
          <Card key={territory.name}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="eyebrow">{territory.lead}</div>
                <h3 className="mt-2 text-[1.15rem] leading-none">{territory.name}</h3>
              </div>
              <StatusBadge tone={territoryHealthTone[territory.health]}>{territory.health}</StatusBadge>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-line bg-panel-muted p-3">
                <div className="eyebrow">Active jobs</div>
                <p className="mt-2 text-[13px] font-medium text-ink">{territory.activeJobs}</p>
              </div>
              <div className="rounded-2xl border border-line bg-panel-muted p-3">
                <div className="eyebrow">Backlog</div>
                <p className="mt-2 text-[13px] font-medium text-ink">{territory.backlog}</p>
              </div>
              <div className="rounded-2xl border border-line bg-panel-muted p-3">
                <div className="eyebrow">Alerts</div>
                <p className="mt-2 text-[13px] font-medium text-ink">{territory.alertCount}</p>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              {territory.notes.map((note) => (
                <div className="rounded-xl border border-line bg-panel-muted px-3 py-2" key={note}>
                  <p className="text-[12px] leading-5 text-body">{note}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button
                onClick={() =>
                  pushToast({
                    tone: "info",
                    message: `Mock escalation queue opened for ${territory.name}.`,
                  })
                }
                size="sm"
                variant="secondary"
              >
                Open queue
              </Button>
              <Button
                onClick={() =>
                  pushToast({
                    tone: "warning",
                    message: `Shift plan review staged for ${territory.name}.`,
                  })
                }
                size="sm"
                variant="ghost"
              >
                Review shifts
              </Button>
            </div>
          </Card>
        ))}
      </section>
    </div>
  );
}
