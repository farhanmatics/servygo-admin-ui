"use client";

import Link from "next/link";
import { useState } from "react";
import { alertItems } from "@/lib/mock/admin-shell";

export function AlertCenterPopover() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        className="rounded-2xl border border-line bg-panel px-3 py-2 text-[12px] font-medium text-ink shadow-sm transition hover:border-line-strong"
        onClick={() => setOpen((current) => !current)}
        type="button"
      >
        6 alerts
      </button>
      {open ? (
        <div className="absolute right-0 z-30 mt-2 w-[320px] rounded-2xl border border-line bg-panel p-3 shadow-floating">
          <div className="eyebrow">Alert center</div>
          <div className="mt-2 space-y-2">
            {alertItems.slice(0, 3).map((item) => (
              <div className="rounded-xl border border-line bg-panel-muted px-3 py-2" key={item.id}>
                <p className="text-[12px] font-semibold text-ink">{item.title}</p>
                <p className="mt-1 text-[12px] text-body">{item.territory}</p>
              </div>
            ))}
          </div>
          <Link className="mt-3 inline-block text-[12px] font-medium text-forest" href="/alerts" onClick={() => setOpen(false)}>
            View all alerts
          </Link>
        </div>
      ) : null}
    </div>
  );
}
