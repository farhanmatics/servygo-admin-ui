"use client";

import Link from "next/link";
import { useMockAuth, useToast } from "@/components/providers";
import { adminRoleLabels, type AdminRole } from "@/lib/mock/admin-shell";
import { ProfileMenu } from "./profile-menu";

export function TopBar() {
  const { role, setRole } = useMockAuth();
  const { pushToast } = useToast();

  return (
    <header className="surface-blur sticky top-0 z-20 rounded-[20px] border border-line/80 px-4 py-3 shadow-panel">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0">
          <div className="eyebrow">Operations overview</div>
          <div className="mt-1 flex flex-wrap items-center gap-2">
            <h2 className="text-[1.7rem] leading-none">Control Center</h2>
            <span className="rounded-full border border-success/20 bg-success-soft px-2.5 py-1 text-[11px] font-semibold text-success">
              System healthy
            </span>
            <span className="rounded-full border border-line-strong/70 bg-panel px-2.5 py-1 text-[11px] font-medium text-stone">
              Updated 11:42 AM CST
            </span>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-2 sm:flex-row lg:max-w-2xl lg:justify-end">
          <label className="flex min-w-0 flex-1 items-center gap-2 rounded-2xl border border-line bg-panel px-3 py-2 shadow-sm">
            <span className="text-sm text-stone">Search</span>
            <input
              aria-label="Global search"
              className="min-w-0 flex-1 border-0 bg-transparent text-[13px] outline-none placeholder:text-stone/70"
              placeholder="Users, bookings, disputes, providers..."
              type="text"
            />
            <span className="rounded-md bg-panel-muted px-2 py-1 text-[11px] font-medium text-stone">
              /
            </span>
          </label>

          <div className="flex items-center gap-2">
            <button
              type="button"
              className="rounded-2xl border border-line bg-panel px-3 py-2 text-[12px] font-medium text-ink shadow-sm transition hover:border-line-strong"
            >
              Saskatoon
            </button>
            <Link
              className="rounded-2xl border border-line bg-panel px-3 py-2 text-[12px] font-medium text-ink shadow-sm transition hover:border-line-strong"
              href="/alerts"
              onClick={() => pushToast({ message: "6 alerts are queued for review.", tone: "warning" })}
            >
              6 alerts
            </Link>
            <select
              aria-label="Role preview"
              className="rounded-2xl border border-line bg-panel px-3 py-2 text-[12px] font-medium text-ink shadow-sm transition hover:border-line-strong"
              onChange={(event) => setRole(event.target.value as AdminRole)}
              value={role}
            >
              {(Object.keys(adminRoleLabels) as AdminRole[]).map((roleOption) => (
                <option key={roleOption} value={roleOption}>
                  {adminRoleLabels[roleOption]}
                </option>
              ))}
            </select>
            <div className="hidden xl:block">
              <ProfileMenu />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
