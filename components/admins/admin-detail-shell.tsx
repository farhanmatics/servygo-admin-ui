"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import { useMockAuth, useToast } from "@/components/providers";
import { Button } from "@/components/ui/button";
import { Card, StatPill } from "@/components/ui/card";
import { Field, Select, Textarea } from "@/components/ui/input";
import { Modal } from "@/components/ui/overlay";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import { adminRoleLabels, type AdminRole } from "@/lib/mock/admin-shell";
import { adminRoleOptions, type AdminUserProfile } from "@/lib/mock/admins";

type ActionMode = "assign-role" | "suspend" | "invite" | null;

export function AdminDetailShell({
  admin,
  children,
}: {
  admin: AdminUserProfile;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const { isReadOnly, role } = useMockAuth();
  const { pushToast } = useToast();
  const [actionMode, setActionMode] = useState<ActionMode>(null);
  const [nextRole, setNextRole] = useState<AdminRole>(admin.role);
  const [reason, setReason] = useState("");

  const links = [
    { href: `/admins/${admin.id}`, label: "Overview" },
    { href: "/settings/roles", label: "Role matrix" },
    { href: "/audit/admin-actions", label: "Admin audit log" },
  ];

  const canEdit = role === "super-admin" && !isReadOnly;

  const submitAction = () => {
    pushToast({
      tone: actionMode === "suspend" ? "warning" : "success",
      message:
        actionMode === "assign-role"
          ? `${admin.name} is staged to move to ${adminRoleLabels[nextRole]}. Change rationale captured.`
          : actionMode === "invite"
            ? `Invite reminder prepared for ${admin.email}.`
            : `${admin.name} marked for suspension review with audit note attached.`,
    });
    setActionMode(null);
    setReason("");
  };

  return (
    <div className="admin-grid">
      <PageHeader
        actions={
          <>
            <StatPill label="team" value={admin.team} />
            <StatusBadge tone={admin.status === "active" ? "success" : admin.status === "invited" ? "warning" : "danger"}>
              {admin.status}
            </StatusBadge>
            <StatusBadge tone="info">{adminRoleLabels[admin.role]}</StatusBadge>
            {canEdit ? (
              <>
                <Button onClick={() => setActionMode("assign-role")} size="md" variant="secondary">
                  Assign role
                </Button>
                <Button
                  onClick={() => setActionMode(admin.status === "invited" ? "invite" : "suspend")}
                  size="md"
                  variant={admin.status === "invited" ? "success" : "danger"}
                >
                  {admin.status === "invited" ? "Resend invite" : "Suspend admin"}
                </Button>
              </>
            ) : (
              <StatusBadge tone="warning">View-only access</StatusBadge>
            )}
          </>
        }
        description={`Assigned territory: ${admin.assignedTerritory}. This detail surface should make permission intent, queue ownership, and auditability obvious at a glance.`}
        eyebrow={admin.id}
        title={admin.name}
      />

      <section className="grid gap-4 xl:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.8fr)]">
        <Card>
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl border border-line bg-panel-muted p-3">
              <div className="eyebrow">Role</div>
              <p className="mt-2 text-[13px] font-medium text-ink">{adminRoleLabels[admin.role]}</p>
            </div>
            <div className="rounded-2xl border border-line bg-panel-muted p-3">
              <div className="eyebrow">Last active</div>
              <p className="mt-2 text-[13px] font-medium text-ink">{admin.lastActiveAt}</p>
            </div>
            <div className="rounded-2xl border border-line bg-panel-muted p-3">
              <div className="eyebrow">Created</div>
              <p className="mt-2 text-[13px] font-medium text-ink">{admin.createdAt}</p>
            </div>
            <div className="rounded-2xl border border-line bg-panel-muted p-3">
              <div className="eyebrow">Seats managed</div>
              <p className="mt-2 text-[13px] font-medium text-ink">{admin.seatsManaged}</p>
            </div>
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
          <div className="eyebrow">Assigned queues</div>
          <h3 className="mt-2 text-[1.15rem] leading-none">Operational ownership</h3>
          <div className="mt-4 space-y-3">
            {admin.assignedQueues.map((queue) => (
              <div key={queue} className="rounded-2xl border border-line bg-panel-muted px-3 py-3">
                <p className="text-dense text-body">{queue}</p>
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
                actionMode === "assign-role"
                  ? "Assign internal role"
                  : actionMode === "invite"
                    ? "Resend admin invite"
                    : "Suspend admin access"
              }
            >
              <div className="grid gap-4">
                {actionMode === "assign-role" ? (
                  <Field hint="Role changes should explain why scope is expanding or shrinking." label="New role">
                    <Select onChange={(event) => setNextRole(event.target.value as AdminRole)} value={nextRole}>
                      {adminRoleOptions.map((option) => (
                        <option key={option} value={option}>
                          {adminRoleLabels[option]}
                        </option>
                      ))}
                    </Select>
                  </Field>
                ) : null}
                <Field label={actionMode === "invite" ? "Internal note" : "Reason"}>
                  <Textarea
                    onChange={(event) => setReason(event.target.value)}
                    placeholder="Capture rationale for the admin audit trail..."
                    value={reason}
                  />
                </Field>
                <div className="grid gap-2 rounded-2xl border border-line bg-panel-muted p-3">
                  {admin.auditNotes.map((note) => (
                    <div key={note} className="text-[12px] leading-5 text-body">
                      {note}
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button onClick={() => setActionMode(null)} size="sm" variant="ghost">
                    Cancel
                  </Button>
                  <Button
                    disabled={!reason.trim()}
                    onClick={submitAction}
                    size="sm"
                    variant={actionMode === "suspend" ? "danger" : actionMode === "invite" ? "success" : "secondary"}
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
