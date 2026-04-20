"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { useMockAuth, useToast } from "@/components/providers";
import { Button } from "@/components/ui/button";
import { Card, StatPill } from "@/components/ui/card";
import { Field, Input, Textarea } from "@/components/ui/input";
import { Modal } from "@/components/ui/overlay";
import { PageHeader } from "@/components/ui/page-header";
import { RiskBadge } from "@/components/ui/risk-badge";
import { StatusBadge } from "@/components/ui/status-badge";
import { getRiskLevel, riskTone, userStatusTone, userTypeLabels, type UserProfile } from "@/lib/mock/users";

type ActionMode = "activate" | "reset-password" | "suspend" | null;

export function UserDetailShell({
  children,
  user,
}: {
  children: ReactNode;
  user: UserProfile;
}) {
  const pathname = usePathname();
  const { isReadOnly } = useMockAuth();
  const { pushToast } = useToast();
  const [actionMode, setActionMode] = useState<ActionMode>(null);
  const [reason, setReason] = useState("");

  const riskLevel = getRiskLevel(user);
  const links = [
    { href: `/users/${user.id}`, label: "Overview" },
    { href: `/users/${user.id}/activity`, label: "Activity" },
    { href: `/users/${user.id}/documents`, label: "Documents" },
    { href: `/users/${user.id}/financials`, label: "Financials" },
  ];

  const submitAction = () => {
    pushToast({
      tone: actionMode === "suspend" ? "warning" : "success",
      message:
        actionMode === "suspend"
          ? `Mock suspension flow saved for ${user.name}. Reason captured for audit review.`
          : actionMode === "activate"
            ? `Mock reactivation prepared for ${user.name}.`
            : `Password reset email queued for ${user.email}.`,
    });
    setActionMode(null);
    setReason("");
  };

  return (
    <div className="admin-grid">
      <PageHeader
        actions={
          <>
            <StatPill label="type" value={userTypeLabels[user.type]} />
            <StatusBadge tone={userStatusTone[user.status]}>{user.status}</StatusBadge>
            <RiskBadge level={riskTone[riskLevel]} />
            {isReadOnly ? (
              <StatusBadge tone="warning">Read-only</StatusBadge>
            ) : (
              <>
                <Button onClick={() => setActionMode(user.status === "suspended" ? "activate" : "suspend")} size="md" variant={user.status === "suspended" ? "success" : "danger"}>
                  {user.status === "suspended" ? "Activate account" : "Suspend account"}
                </Button>
                <Button onClick={() => setActionMode("reset-password")} size="md" variant="secondary">
                  Reset password
                </Button>
              </>
            )}
          </>
        }
        description={user.notes}
        eyebrow={user.id}
        title={user.name}
      />

      <section className="grid gap-4 xl:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.8fr)]">
        <Card>
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl border border-line bg-panel-muted p-3">
              <div className="eyebrow">Primary service</div>
              <p className="mt-2 text-[13px] font-medium text-ink">{user.primaryService}</p>
            </div>
            <div className="rounded-2xl border border-line bg-panel-muted p-3">
              <div className="eyebrow">Location</div>
              <p className="mt-2 text-[13px] font-medium text-ink">
                {user.city}, {user.province}
              </p>
            </div>
            <div className="rounded-2xl border border-line bg-panel-muted p-3">
              <div className="eyebrow">Owner</div>
              <p className="mt-2 text-[13px] font-medium text-ink">{user.internalOwner}</p>
            </div>
            <div className="rounded-2xl border border-line bg-panel-muted p-3">
              <div className="eyebrow">Last seen</div>
              <p className="mt-2 text-[13px] font-medium text-ink">{user.lastSeen}</p>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {user.tags.map((tag) => (
              <StatusBadge key={tag} tone="info">
                {tag}
              </StatusBadge>
            ))}
          </div>

          <div className="mt-4 flex flex-wrap gap-2 border-t border-line pt-4">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  className={[
                    "rounded-xl border px-3 py-2 text-[12px] font-medium transition",
                    active
                      ? "border-gold bg-panel-strong text-ink shadow-sm"
                      : "border-line bg-panel text-stone hover:text-ink",
                  ].join(" ")}
                  href={link.href}
                  key={link.href}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </Card>

        <Card>
          <div className="eyebrow">Audit posture</div>
          <h3 className="mt-2 text-[1.15rem] leading-none">Action guardrails</h3>
          <p className="mt-2 text-[13px] leading-6 text-stone">{user.auditNote}</p>
          <div className="mt-4 space-y-3">
            {user.flags.map((flag) => (
              <div key={flag} className="rounded-2xl border border-line bg-panel-muted px-3 py-3">
                <p className="text-dense text-body">{flag}</p>
              </div>
            ))}
          </div>
        </Card>
      </section>

      {children}

      {actionMode ? (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-ink/25 px-4 backdrop-blur-sm">
          <div className="w-full max-w-xl">
            <Modal
              actions={<StatusBadge tone={actionMode === "suspend" ? "warning" : "info"}>{actionMode.replace("-", " ")}</StatusBadge>}
              title={
                actionMode === "suspend"
                  ? "Suspend account"
                  : actionMode === "activate"
                    ? "Reactivate account"
                    : "Reset password"
              }
            >
              <div className="grid gap-4">
                <p className="text-[13px] leading-6 text-body">
                  {actionMode === "suspend"
                    ? "Suspensions should capture a clear reason, impact, and operator note before the status changes."
                    : actionMode === "activate"
                      ? "Reactivations should capture why the account is safe to restore and who approved it."
                      : "Password resets should confirm the recipient and leave an audit note for support history."}
                </p>
                {actionMode === "reset-password" ? (
                  <Field label="Destination email">
                    <Input defaultValue={user.email} />
                  </Field>
                ) : null}
                <Field
                  hint="This audit note will later feed the admin action log."
                  label={actionMode === "reset-password" ? "Internal note" : "Reason"}
                >
                  <Textarea
                    onChange={(event) => setReason(event.target.value)}
                    placeholder="Capture the why before confirming..."
                    value={reason}
                  />
                </Field>
                <div className="flex flex-wrap gap-2">
                  <Button onClick={() => setActionMode(null)} size="sm" variant="ghost">
                    Cancel
                  </Button>
                  <Button
                    disabled={!reason.trim()}
                    onClick={submitAction}
                    size="sm"
                    variant={actionMode === "suspend" ? "danger" : actionMode === "activate" ? "success" : "secondary"}
                  >
                    Confirm
                  </Button>
                </div>
              </div>
            </Modal>
          </div>
        </div>
      ) : null}
    </div>
  );
}
