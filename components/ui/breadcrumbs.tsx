import Link from "next/link";
import type { ReactNode } from "react";

export type BreadcrumbItem = {
  href?: string;
  label: ReactNode;
};

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  if (items.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="min-w-0">
      <ol className="flex flex-wrap items-center gap-1 text-[12px] text-stone">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li className="flex items-center gap-1" key={`${index}-${String(item.label)}`}>
              {item.href && !isLast ? (
                <Link
                  className="rounded-md px-1.5 py-0.5 text-stone transition hover:bg-panel-muted hover:text-ink focus-visible:bg-panel-muted focus-visible:text-ink"
                  href={item.href}
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current={isLast ? "page" : undefined}
                  className={isLast ? "rounded-md px-1.5 py-0.5 font-medium text-ink" : "rounded-md px-1.5 py-0.5"}
                >
                  {item.label}
                </span>
              )}
              {!isLast ? <span aria-hidden className="text-stone/50">/</span> : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
