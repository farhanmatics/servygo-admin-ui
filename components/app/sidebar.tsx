"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMockAuth } from "@/components/providers";
import { adminRoleLabels, navGroups, roleTerritories } from "@/lib/mock/admin-shell";

export function Sidebar() {
  const pathname = usePathname();
  const { isReadOnly, role } = useMockAuth();
  return (
    <aside className="admin-sidebar px-4 py-5 md:px-3">
      <div className="flex h-full flex-col gap-5">
        <div className="rounded-2xl border border-white/10 bg-white/6 px-4 py-4">
          <div className="eyebrow text-[rgb(245_240_228_/_0.7)]">ServyGo</div>
          <div className="mt-2 flex items-baseline justify-between gap-3">
            <h1 className="font-serif text-[1.55rem] text-cream">Admin</h1>
            <span className="rounded-full border border-white/10 bg-white/8 px-2.5 py-1 text-[11px] font-medium text-cream/80">
              Mock
            </span>
          </div>
          <p className="mt-2 text-xs leading-5 text-cream/70">
            Dense operational workspace tuned for quick review, approval, and intervention.
          </p>
        </div>

        <div className="hidden md:block rounded-2xl border border-line bg-panel p-3 shadow-sm">
          <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-stone">
            Active role
          </div>
          <div className="mt-2 text-sm font-semibold text-ink">
            {adminRoleLabels[role]}
          </div>
          <div className="mt-1 text-xs text-stone">
            {roleTerritories[role]}
          </div>
        </div>

        <nav className="flex-1 space-y-4 overflow-y-auto pr-1">
          {navGroups.map((group) => (
            <div key={group.label}>
              <div className="px-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-cream/42">
                {group.label}
              </div>
              <ul className="mt-2 space-y-1.5">
                {group.items.map((item, index) => {
                  const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
                  const allowed = item.roles.includes(role);

                  return (
                    <li key={item.name}>
                      <Link
                        aria-disabled={!allowed}
                        className={[
                          "flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-[13px] transition",
                          active
                            ? "bg-white/12 text-cream shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]"
                            : "text-cream/78 hover:bg-white/6 hover:text-cream",
                          !allowed ? "cursor-not-allowed opacity-35 hover:bg-transparent hover:text-cream/78" : "",
                          index === 0 ? "animate-panel-in" : "",
                        ].join(" ")}
                        href={allowed ? item.href : "#"}
                      >
                        <span className="truncate font-medium">{item.name}</span>
                        <span
                          className={[
                            "rounded-full px-2 py-0.5 text-[10px] font-semibold",
                            active
                              ? "bg-gold/18 text-gilt"
                              : "bg-white/8 text-cream/68",
                          ].join(" ")}
                        >
                          {item.badge}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        <div className="rounded-2xl border border-white/10 bg-white/6 p-3">
          <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-cream/45">
            Read-only mode
          </div>
          <p className="mt-2 text-xs leading-5 text-cream/72">
            {isReadOnly
              ? "You are in a restricted review state. Destructive and editing flows should stay disabled."
              : "Permissions, impersonation, and read-only banners should live in shared shell space, not per-page hacks."}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/6 p-3">
          <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-cream/45">
            Privacy note
          </div>
          <p className="mt-2 text-xs leading-5 text-cream/72">
            Lists should minimize exposed PII. Full details belong inside focused review surfaces.
          </p>
        </div>
      </div>
    </aside>
  );
}
