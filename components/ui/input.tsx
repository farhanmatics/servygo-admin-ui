import type { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from "react";

export function Field({
  children,
  hint,
  label,
}: {
  children: ReactNode;
  hint?: string;
  label: string;
}) {
  return (
    <label className="grid gap-1.5">
      <span className="text-[12px] font-semibold text-ink">{label}</span>
      {children}
      {hint ? <span className="text-[11px] leading-4 text-stone">{hint}</span> : null}
    </label>
  );
}

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={[
        "h-9 w-full rounded-xl border border-line bg-panel px-3 text-[13px] text-ink shadow-sm",
        "placeholder:text-stone/70",
        props.className ?? "",
      ].join(" ")}
      {...props}
    />
  );
}

export function Textarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={[
        "min-h-24 w-full rounded-xl border border-line bg-panel px-3 py-2.5 text-[13px] text-ink shadow-sm",
        "placeholder:text-stone/70",
        props.className ?? "",
      ].join(" ")}
      {...props}
    />
  );
}

export function Select(props: InputHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={[
        "h-9 w-full rounded-xl border border-line bg-panel px-3 text-[13px] text-ink shadow-sm",
        props.className ?? "",
      ].join(" ")}
      {...props}
    />
  );
}
