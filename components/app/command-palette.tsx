"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const commandItems = [
  { href: "/dashboard", label: "Go to Dashboard" },
  { href: "/bookings", label: "Open Bookings" },
  { href: "/disputes", label: "Open Disputes" },
  { href: "/compliance/documents", label: "Open Compliance Queue" },
  { href: "/finance/transactions", label: "Open Transactions" },
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "/" && !event.metaKey && !event.ctrlKey && !event.altKey) {
        const target = event.target as HTMLElement | null;
        const tag = target?.tagName?.toLowerCase();
        if (tag !== "input" && tag !== "textarea") {
          event.preventDefault();
          setOpen(true);
        }
      }

      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commandItems;
    return commandItems.filter((item) => item.label.toLowerCase().includes(q));
  }, [query]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-start justify-center bg-ink/25 px-4 pt-24 backdrop-blur-sm">
      <div className="w-full max-w-xl rounded-[22px] border border-line bg-panel p-4 shadow-floating">
        <div className="eyebrow">Command palette</div>
        <input
          autoFocus
          className="mt-3 w-full rounded-xl border border-line bg-panel-muted px-3 py-2 text-[13px] outline-none"
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search commands..."
          value={query}
        />
        <div className="mt-3 space-y-2">
          {filtered.map((item) => (
            <Link className="block rounded-xl border border-line bg-panel-muted px-3 py-2 text-[12px] text-body hover:text-ink" href={item.href} key={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
