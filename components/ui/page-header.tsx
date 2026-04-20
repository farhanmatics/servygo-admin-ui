import type { ReactNode } from "react";

export function PageHeader({
  actions,
  description,
  eyebrow,
  title,
}: {
  actions?: ReactNode;
  description?: string;
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="flex flex-col gap-3 border-b border-line/80 pb-4 lg:flex-row lg:items-end lg:justify-between">
      <div className="min-w-0">
        <div className="eyebrow">{eyebrow}</div>
        <h1 className="mt-2 text-[1.8rem] leading-none">{title}</h1>
        {description ? (
          <p className="mt-2 max-w-3xl text-[13px] leading-6 text-stone">{description}</p>
        ) : null}
      </div>
      {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
    </div>
  );
}
