"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMockAuth } from "@/components/providers";
import { adminRoleLabels, navGroups, roleTerritories } from "@/lib/mock/admin-shell";
import Image from "next/image";
export function Sidebar() {
  const pathname = usePathname();
  const { isReadOnly, role } = useMockAuth();
  return (
    <aside className="admin-sidebar px-4 py-5 md:px-3">
      <div className="flex h-full flex-col gap-5">
        {/* Mobile: stacked minimal version */}
        <div className="hidden md:flex items-center gap-4 rounded-2xl border border-line bg-panel px-4 py-3 shadow-sm">
          {/* Logo */}
          <div className="shrink-0 overflow-hidden rounded-lg bg-white/5 p-1">
            <Image
              src="/logos/sm/1.png"
              alt="ServyGo Logo"
              width={56}
              height={56}
              className="h-14 w-14 object-contain"
            />
          </div>

          {/* Divider */}
          <div className="h-8 w-px bg-line" />

          {/* Role Info */}
          <div className="min-w-0">
            <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-stone">
              Active role
            </div>
            <div className="mt-1 truncate text-sm font-semibold text-ink">
              {adminRoleLabels[role]}
            </div>
            <div className="truncate text-xs text-stone">
              {roleTerritories[role]}
            </div>
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
