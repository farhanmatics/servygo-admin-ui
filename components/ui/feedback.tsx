export function Skeleton({
  className = "",
}: {
  className?: string;
}) {
  return <div className={["animate-pulse rounded-xl bg-panel-muted", className].join(" ")} />;
}

export function EmptyState({
  description,
  title,
}: {
  description: string;
  title: string;
}) {
  return (
    <div className="rounded-2xl border border-dashed border-line-strong bg-panel p-5 text-center">
      <div className="eyebrow">Empty state</div>
      <h3 className="mt-2 text-[1.15rem] leading-none">{title}</h3>
      <p className="mt-2 text-[13px] leading-6 text-stone">{description}</p>
    </div>
  );
}

export function ErrorState({
  description,
  title,
}: {
  description: string;
  title: string;
}) {
  return (
    <div className="rounded-2xl border border-danger/20 bg-danger-soft p-5">
      <div className="eyebrow text-danger">Error state</div>
      <h3 className="mt-2 text-[1.15rem] leading-none text-danger">{title}</h3>
      <p className="mt-2 text-[13px] leading-6 text-body">{description}</p>
    </div>
  );
}
