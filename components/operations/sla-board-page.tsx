"use client";

import Link from "next/link";
import { useToast } from "@/components/providers";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DataGrid } from "@/components/ui/data-grid";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import { slaIncidents, type SlaIncident } from "@/lib/mock/operations";

export function SlaBoardPage() {
  const { pushToast } = useToast();

  const columns = [
    {
      header: "Booking",
      key: "booking",
      render: (incident: SlaIncident) => (
        <>
          <Link className="font-medium text-ink hover:text-forest" href={`/bookings/${incident.bookingId}`}>
            {incident.bookingId}
          </Link>
          <div className="mt-1 text-[12px] text-stone">{incident.customer}</div>
        </>
      ),
    },
    {
      header: "Territory",
      key: "territory",
      render: (incident: SlaIncident) => <span className="text-[13px] text-body">{incident.territory}</span>,
    },
    {
      header: "Reason",
      key: "reason",
      render: (incident: SlaIncident) => <span className="text-[13px] text-body">{incident.reason}</span>,
    },
    {
      header: "Age",
      key: "age",
      render: (incident: SlaIncident) => <StatusBadge tone="warning">{incident.age}</StatusBadge>,
    },
    {
      header: "Breach ETA",
      key: "breachAt",
      render: (incident: SlaIncident) => <StatusBadge tone="danger">{incident.breachAt}</StatusBadge>,
    },
    {
      header: "Desk",
      key: "desk",
      render: (incident: SlaIncident) => <span className="text-[13px] text-body">{incident.assignedDesk}</span>,
    },
  ];

  return (
    <div className="admin-grid">
      <PageHeader
        actions={
          <>
            <Link href="/operations/live">
              <Button size="md" variant="secondary">
                Live monitor
              </Button>
            </Link>
            <Button
              onClick={() =>
                pushToast({
                  tone: "warning",
                  message: "Mock escalation playbook opened.",
                })
              }
              size="md"
            >
              Escalation playbook
            </Button>
          </>
        }
        description="SLA board prioritizes aging incidents and intervention windows. Focus on clear ownership and fastest feasible recovery path."
        eyebrow="SLA monitoring"
        title="SLA Breach Board"
      />

      <Card className="overflow-hidden p-0">
        <div className="border-b border-line px-4 py-3">
          <div className="eyebrow">Active incidents</div>
          <h3 className="mt-1 text-[1.2rem] leading-none">Aging and delayed jobs</h3>
        </div>
        <DataGrid columns={columns} rows={slaIncidents} />
      </Card>
    </div>
  );
}
