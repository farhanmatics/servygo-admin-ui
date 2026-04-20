import type { InputHTMLAttributes } from "react";

export function Checkbox({
  label,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="flex items-center gap-2 text-[12px] text-body">
      <input
        className="h-4 w-4 rounded border-line text-forest accent-[var(--color-forest)]"
        type="checkbox"
        {...props}
      />
      <span>{label}</span>
    </label>
  );
}

export function Radio({
  label,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="flex items-center gap-2 text-[12px] text-body">
      <input
        className="h-4 w-4 border-line accent-[var(--color-forest)]"
        type="radio"
        {...props}
      />
      <span>{label}</span>
    </label>
  );
}

export function Switch({
  checked,
  label,
}: {
  checked?: boolean;
  label: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-line bg-panel px-3 py-2">
      <span className="text-[12px] font-medium text-body">{label}</span>
      <span
        aria-hidden="true"
        className={[
          "relative inline-flex h-5 w-9 rounded-full border transition",
          checked
            ? "border-forest bg-forest"
            : "border-line-strong bg-panel-muted",
        ].join(" ")}
      >
        <span
          className={[
            "absolute top-0.5 h-3.5 w-3.5 rounded-full bg-white transition",
            checked ? "left-[18px]" : "left-0.5",
          ].join(" ")}
        />
      </span>
    </div>
  );
}
