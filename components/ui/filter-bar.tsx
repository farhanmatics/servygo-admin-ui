import type { ReactNode } from "react";

export function ActiveFilters({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {items.map((item) => (
        <span
          key={item}
          className="rounded-full border border-line bg-panel px-2.5 py-1 text-[11px] font-medium text-stone"
        >
          {item}
        </span>
      ))}
    </div>
  );
}

export function SavedViewMenu({ label }: { label: string }) {
  return (
    <button
      className="rounded-xl border border-line bg-panel px-3 py-2 text-[12px] font-medium text-ink shadow-sm"
      type="button"
    >
      {label}
    </button>
  );
}

export function FilterBar({
  actions,
  children,
}: {
  actions?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-line bg-panel p-3 shadow-sm">
      <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
        <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-4">{children}</div>
        {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
      </div>
    </div>
  );
}
