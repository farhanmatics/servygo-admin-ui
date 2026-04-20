import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger" | "success";
type ButtonSize = "sm" | "md" | "lg";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "border-gold bg-forest text-cream hover:border-gilt hover:bg-olive",
  secondary:
    "border-line-strong bg-panel text-ink hover:border-gold hover:bg-panel-strong",
  ghost: "border-transparent bg-transparent text-stone hover:border-line hover:bg-panel-muted",
  danger:
    "border-danger/30 bg-danger text-white hover:border-danger hover:brightness-95",
  success:
    "border-success/30 bg-success text-white hover:border-success hover:brightness-95",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-[12px]",
  md: "h-9 px-3.5 text-[12.5px]",
  lg: "h-10 px-4 text-[13px]",
};

export function Button({
  children,
  className = "",
  size = "md",
  variant = "primary",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  size?: ButtonSize;
  variant?: ButtonVariant;
}) {
  return (
    <button
      className={[
        "inline-flex items-center justify-center gap-2 rounded-xl border font-semibold shadow-sm transition-colors",
        "disabled:cursor-not-allowed disabled:opacity-50",
        variantClasses[variant],
        sizeClasses[size],
        className,
      ].join(" ")}
      {...props}
    >
      {children}
    </button>
  );
}
