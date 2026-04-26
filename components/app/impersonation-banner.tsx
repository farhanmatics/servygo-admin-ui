"use client";

import { useMockAuth } from "@/components/providers";

export function ImpersonationBanner() {
  const { role } = useMockAuth();
  if (role !== "super-admin") return null;

  return (
    <div className="mb-3 rounded-2xl border border-info/20 bg-info-soft px-3 py-2 text-[12px] text-body">
      Impersonation mode is available for support workflows. Current mock session is running with super-admin privileges.
    </div>
  );
}
