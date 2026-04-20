export function RiskBadge({
  level,
}: {
  level: "low" | "medium" | "high";
}) {
  const classes =
    level === "high"
      ? "border-danger/20 bg-danger-soft text-danger"
      : level === "medium"
        ? "border-warning/20 bg-warning-soft text-warning"
        : "border-success/20 bg-success-soft text-success";

  return (
    <span className={["inline-flex rounded-full border px-2.5 py-1 text-[11px] font-semibold", classes].join(" ")}>
      {level} risk
    </span>
  );
}
