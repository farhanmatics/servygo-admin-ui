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
    <article className="panel-muted relative p-4">
      {/* Badge: Top-right corner */}
      <div className="absolute -right-2 -top-2">
        <StatusBadge tone={tone}>{delta}</StatusBadge>
      </div>

      {/* Label: Left-aligned, with right padding to avoid badge overlap */}
      <div className="pr-16 text-[11px] font-semibold uppercase tracking-[0.14em] text-stone">
        {label}
      </div>

      {/* Value */}
      <div className="mt-2 text-[1.6rem] font-semibold leading-none text-ink">
        {value}
      </div>
    </article>
  );
}
