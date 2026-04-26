import type { ReactNode } from "react";
import { Card } from "./card";
import { StatusBadge } from "./status-badge";

export function AuditTimeline({
  events,
}: {
  events: { actor: string; details: string; timestamp: string; tone: "success" | "warning" | "danger" | "info"; title: string }[];
}) {
  return (
    <Card>
      <div className="eyebrow">Audit timeline</div>
      <div className="mt-3 space-y-2">
        {events.map((event) => (
          <div className="rounded-xl border border-line bg-panel-muted px-3 py-2" key={`${event.timestamp}-${event.title}`}>
            <div className="flex items-center justify-between gap-2">
              <p className="text-[12px] font-semibold text-ink">{event.title}</p>
              <StatusBadge tone={event.tone}>{event.tone}</StatusBadge>
            </div>
            <p className="mt-1 text-[12px] text-stone">
              {event.timestamp} - {event.actor}
            </p>
            <p className="mt-1 text-[12px] text-body">{event.details}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}

export function DateRangePicker({
  end,
  onEndChange,
  onStartChange,
  start,
}: {
  end: string;
  onEndChange: (value: string) => void;
  onStartChange: (value: string) => void;
  start: string;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <label className="text-[12px] text-stone">
        Start
        <input className="ml-2 rounded-lg border border-line bg-panel px-2 py-1 text-[12px]" onChange={(event) => onStartChange(event.target.value)} type="date" value={start} />
      </label>
      <label className="text-[12px] text-stone">
        End
        <input className="ml-2 rounded-lg border border-line bg-panel px-2 py-1 text-[12px]" onChange={(event) => onEndChange(event.target.value)} type="date" value={end} />
      </label>
    </div>
  );
}

export function KpiTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-line bg-panel-muted p-3">
      <div className="eyebrow">{label}</div>
      <p className="mt-2 text-[1rem] font-semibold text-ink">{value}</p>
    </div>
  );
}

export function ChartCard({ children, title }: { children: ReactNode; title: string }) {
  return (
    <Card>
      <div className="eyebrow">Chart</div>
      <h3 className="mt-2 text-[1.1rem] leading-none">{title}</h3>
      <div className="mt-3">{children}</div>
    </Card>
  );
}

export function MapPanel({ items }: { items: string[] }) {
  return (
    <Card>
      <div className="eyebrow">Map panel</div>
      <div className="mt-3 space-y-2">
        {items.map((item) => (
          <div className="rounded-xl border border-line bg-panel-muted px-3 py-2 text-[12px] text-body" key={item}>
            {item}
          </div>
        ))}
      </div>
    </Card>
  );
}

export function ExpiryTag({ date, tone = "warning" }: { date: string; tone?: "success" | "warning" | "danger" | "info" }) {
  return <StatusBadge tone={tone}>Expires {date}</StatusBadge>;
}

export function DocumentCard({ children, title }: { children: ReactNode; title: string }) {
  return (
    <Card>
      <div className="eyebrow">Document</div>
      <h3 className="mt-2 text-[1.1rem] leading-none">{title}</h3>
      <div className="mt-3">{children}</div>
    </Card>
  );
}

export function FilePreview({ fileLabel }: { fileLabel: string }) {
  return <div className="rounded-xl border border-line bg-panel-muted px-3 py-2 text-[12px] text-body">Preview: {fileLabel}</div>;
}

export function EvidenceGallery({ items }: { items: string[] }) {
  return (
    <Card>
      <div className="eyebrow">Evidence gallery</div>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {items.map((item) => (
          <div className="rounded-xl border border-line bg-panel-muted px-3 py-2 text-[12px] text-body" key={item}>
            {item}
          </div>
        ))}
      </div>
    </Card>
  );
}
