"use client";

import { useRouter } from "next/navigation";
import { useMockAuth, useToast } from "@/components/providers";
import { adminRoleLabels } from "@/lib/mock/admin-shell";
import { Button } from "@/components/ui/button";
import { LogOut, Settings } from "lucide-react";

export function ProfileMenu() {
  const { isReadOnly, role, signOut } = useMockAuth();
  const { pushToast } = useToast();
  const router = useRouter();

  return (
    <div className="flex items-center gap-3 rounded-2xl border border-line bg-panel px-3 py-2 shadow-sm">
      {/* Profile Info */}
      <div className="flex items-center gap-2 min-w-0">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-forest text-[12px] font-semibold text-cream">
          AR
        </div>
        <div className="min-w-0">
          <div className="truncate text-[12px] font-semibold text-ink">Arif Rabbani</div>
          <div className="truncate text-[11px] text-stone">{adminRoleLabels[role]}</div>
        </div>
      </div>

      {/* Read-only Badge - inline */}
      {isReadOnly && (
        <span className="shrink-0 rounded-md border border-warning/20 bg-warning-soft px-2 py-0.5 text-[10px] font-medium text-warning">
          Read-only
        </span>
      )}

      {/* Spacer */}
      <div className="ml-auto" />

      {/* Actions */}
      <div className="flex items-center gap-1.5">
        <Button
          onClick={() =>
            pushToast({ message: "Settings screens are planned after dashboard and workflow modules land.", tone: "default" })
          }
          size="sm"
          variant="secondary"
          className="h-10 w-10 rounded-full p-0 flex items-center justify-center hover:scale-105 transition-transform"
        >
          <Settings size={24} />
        </Button>
        <Button
          onClick={() => {
            signOut();
            router.replace("/login");
          }}
          size="sm"
          variant="ghost"
          className="h-10 w-10 rounded-full p-0 flex items-center justify-center hover:scale-105 transition-transform"
        >
          <LogOut size={24} />
        </Button>
      </div>
    </div>
  );
}