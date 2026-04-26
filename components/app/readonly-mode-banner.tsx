"use client";

import { useMockAuth } from "@/components/providers";

export function ReadonlyModeBanner() {
  const { isReadOnly } = useMockAuth();
  if (!isReadOnly) return null;

  return (
    <div className="mb-3 rounded-2xl border border-warning/20 bg-warning-soft px-3 py-2 text-[12px] text-body">
      Read-only mode enabled. Update, delete, and destructive workflows are disabled for this session.
    </div>
  );
}
