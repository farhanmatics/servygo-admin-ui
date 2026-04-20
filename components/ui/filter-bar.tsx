import type { ReactNode } from "react";

export function ActiveFilters({ items }: { items: string[] }) {
  if (!items.length) return null;
  
  return (
    <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
      {items.map((item) => (
        <span
          key={item}
          className="inline-flex items-center gap-1.5 rounded-md bg-white/5 px-2 py-0.5 text-[10px] font-medium tracking-wide text-stone transition-colors hover:bg-white/8"
        >
          <span className="h-1 w-1 shrink-0 rounded-full bg-ink/25" />
          {item}
        </span>
      ))}
    </div>
  );
}

export function SavedViewMenu({ label }: { label: string }) {
  return (
    <button
      className="group inline-flex items-center gap-1.5 rounded-lg border border-transparent px-2.5 py-1.5 text-[11px] font-medium text-ink/70 transition-all hover:border-line hover:bg-white/5 hover:text-ink"
      type="button"
    >
      {label}
      <svg className="h-3 w-3 text-stone transition-transform group-hover:translate-y-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M6 9l6 6 6-6" />
      </svg>
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
    <div className="rounded-xl border border-line bg-panel/90 p-1.5 shadow-sm backdrop-blur-sm">
      <div className="flex items-center justify-between gap-3">
        {/* Filters Row: Horizontal scroll on tight screens */}
        <div className="flex flex-nowrap items-center gap-1.5 overflow-x-auto px-1 scrollbar-hide">
          {children}
        </div>

        {/* Actions: Pinned right with subtle divider */}
        {actions && (
          <div className="flex shrink-0 items-center gap-1.5 border-l border-line pl-3">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}