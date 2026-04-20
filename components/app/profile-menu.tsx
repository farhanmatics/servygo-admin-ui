"use client";

import { useRouter } from "next/navigation";
import { useMockAuth, useToast } from "@/components/providers";
import { adminRoleLabels } from "@/lib/mock/admin-shell";
import { Button } from "@/components/ui/button";

export function ProfileMenu() {
  const { isReadOnly, role, signOut } = useMockAuth();
  const { pushToast } = useToast();
  const router = useRouter();

  return (
    <div className="rounded-2xl border border-line bg-panel p-2 shadow-sm">
      <div className="flex items-center gap-3 rounded-xl px-2 py-1.5">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-forest text-[12px] font-semibold text-cream">
          AR
        </div>
        <div className="min-w-0">
          <div className="truncate text-[12px] font-semibold text-ink">Arif Rabbani</div>
          <div className="truncate text-[11px] text-stone">{adminRoleLabels[role]}</div>
        </div>
      </div>
      {isReadOnly ? (
        <div className="mt-2 rounded-xl border border-warning/20 bg-warning-soft px-3 py-2 text-[11px] text-warning">
          Read-only mode enabled
        </div>
      ) : null}
      <div className="mt-2 flex flex-wrap gap-2">
        <Button
          onClick={() =>
            pushToast({ message: "Settings screens are planned after dashboard and workflow modules land.", tone: "default" })
          }
          size="sm"
          variant="secondary"
        >
          Settings
        </Button>
        <Button
          onClick={() => {
            signOut();
            router.replace("/login");
          }}
          size="sm"
          variant="ghost"
        >
          Sign out
        </Button>
      </div>
    </div>
  );
}
