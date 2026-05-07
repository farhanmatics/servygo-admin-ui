import type { ReactNode } from "react";

export function Tabs({
  items,
  onChange,
  tabs,
  value,
}: {
  items?: { active?: boolean; label: string }[];
  onChange?: (next: number) => void;
  tabs?: string[];
  value?: number;
}) {
  const resolvedItems = items ?? tabs?.map((label, index) => ({ active: value === index, label })) ?? [];

  return (
    <div className="inline-flex flex-wrap items-center gap-1 rounded-2xl border border-line bg-panel p-1">
      {resolvedItems.map((item, index) => (
        <button
          className={[
            "rounded-xl px-3 py-2 text-[12px] font-medium transition",
            item.active ? "bg-panel-muted text-ink shadow-sm" : "text-stone hover:text-ink",
          ].join(" ")}
          key={item.label}
          onClick={() => onChange?.(index)}
          type="button"
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}

export function Segmented({
  items,
}: {
  items: { active?: boolean; label: string; meta?: ReactNode }[];
}) {
  return (
    <div className="inline-flex flex-wrap items-center gap-1 rounded-2xl border border-line bg-panel p-1">
      {items.map((item) => (
        <button
          className={[
            "inline-flex items-center gap-2 rounded-xl px-3 py-2 text-[12px] font-medium transition",
            item.active ? "bg-forest text-cream shadow-sm" : "text-stone hover:text-ink",
          ].join(" ")}
          key={item.label}
          type="button"
        >
          <span>{item.label}</span>
          {item.meta}
        </button>
      ))}
    </div>
  );
}
