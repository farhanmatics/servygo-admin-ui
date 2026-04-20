import type { ReactNode } from "react";
import { StatusBadge } from "./status-badge";

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <section className={["panel p-4", className].join(" ")}>{children}</section>;
}

export function StatPill({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-full border border-line bg-panel px-3 py-1.5 text-[11px] text-stone">
      <span className="font-semibold text-ink">{value}</span> {label}
    </div>
  );
}

export function MetricCard({
  delta,
  label,
  tone,
  value,
}: {
  delta: string;
  label: string;
  tone: Parameters<typeof StatusBadge>[0]["tone"];
  value: string;
}) {
  return (
    <article className="panel-muted p-3">
      <div className="flex items-center justify-between gap-2">
        <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-stone">
          {label}
        </div>
        <StatusBadge tone={tone}>{delta}</StatusBadge>
      </div>
      <div className="mt-3 text-[1.6rem] font-semibold leading-none text-ink">{value}</div>
    </article>
  );
}
