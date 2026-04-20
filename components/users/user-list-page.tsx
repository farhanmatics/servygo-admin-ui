"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useMockAuth, useToast } from "@/components/providers";
import { Button } from "@/components/ui/button";
import { Card, MetricCard } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/choice-controls";
import { DataGrid } from "@/components/ui/data-grid";
import { ActiveFilters, FilterBar, SavedViewMenu } from "@/components/ui/filter-bar";
import { Field, Input, Textarea } from "@/components/ui/input";
import { Modal } from "@/components/ui/overlay";
import { PageHeader } from "@/components/ui/page-header";
import { RiskBadge } from "@/components/ui/risk-badge";
import { StatusBadge } from "@/components/ui/status-badge";
import { getRiskLevel, getTypeCount, getUsers, riskTone, userDirectoryMetrics, userStatusTone, userTypeLabels, type UserRecord, type UserType } from "@/lib/mock/users";

type ActionMode = "activate" | "suspend" | null;

export function UserListPage() {
  const { isReadOnly } = useMockAuth();
  const { pushToast } = useToast();
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<UserType | "all">("all");
  const [statusFilter, setStatusFilter] = useState<"all" | UserRecord["status"]>("all");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [actionTarget, setActionTarget] = useState<UserRecord | null>(null);
  const [actionMode, setActionMode] = useState<ActionMode>(null);
  const [reason, setReason] = useState("");

  const users = getUsers();
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesType = typeFilter === "all" ? true : user.type === typeFilter;
      const matchesStatus = statusFilter === "all" ? true : user.status === statusFilter;
      const query = search.trim().toLowerCase();
      const matchesSearch =
        query.length === 0
          ? true
          : [user.name, user.email, user.phone, user.city, user.id].some((value) =>
              value.toLowerCase().includes(query),
            );
      return matchesType && matchesStatus && matchesSearch;
    });
  }, [search, statusFilter, typeFilter, users]);

  const columns = [
    {
      header: "Select",
      key: "select",
      render: (user: UserRecord) => (
        <Checkbox
          checked={selectedIds.includes(user.id)}
          label=""
          onChange={() =>
            setSelectedIds((current) =>
              current.includes(user.id) ? current.filter((id) => id !== user.id) : [...current, user.id],
            )
          }
        />
      ),
    },
    {
      header: "User",
      key: "user",
      render: (user: UserRecord) => (
        <>
          <Link className="font-medium text-ink hover:text-forest" href={`/users/${user.id}`}>
            {user.name}
          </Link>
          <div className="mt-1 text-[12px] text-stone">
            {user.id} • {userTypeLabels[user.type]}
          </div>
        </>
      ),
    },
    {
      header: "Contact",
      key: "contact",
      render: (user: UserRecord) => (
        <div className="text-[13px] leading-6 text-body">
          <div>{user.email}</div>
          <div className="text-stone">{user.phone}</div>
        </div>
      ),
    },
    {
      header: "Location",
      key: "location",
      render: (user: UserRecord) => (
        <span className="text-[13px] text-body">
          {user.city}, {user.province}
        </span>
      ),
    },
    {
      header: "Primary service",
      key: "service",
      render: (user: UserRecord) => <span className="text-[13px] text-body">{user.primaryService}</span>,
    },
    {
      header: "Status",
      key: "status",
      render: (user: UserRecord) => (
        <div className="flex flex-wrap items-center gap-2">
          <StatusBadge tone={userStatusTone[user.status]}>{user.status}</StatusBadge>
          <RiskBadge level={riskTone[getRiskLevel(user)]} />
        </div>
      ),
    },
    {
      header: "Actions",
      key: "actions",
      render: (user: UserRecord) => (
        <div className="flex flex-wrap gap-2">
          <Link href={`/users/${user.id}`}>
            <Button size="sm" variant="secondary">
              Open
            </Button>
          </Link>
          {!isReadOnly ? (
            <Button
              onClick={() => {
                setActionTarget(user);
                setActionMode(user.status === "suspended" ? "activate" : "suspend");
              }}
              size="sm"
              variant={user.status === "suspended" ? "success" : "ghost"}
            >
              {user.status === "suspended" ? "Activate" : "Suspend"}
            </Button>
          ) : null}
        </div>
      ),
    },
  ];

  const activeFilters = [
    typeFilter === "all" ? "All user types" : userTypeLabels[typeFilter],
    statusFilter === "all" ? "All statuses" : statusFilter,
    search.trim() ? `Search: ${search.trim()}` : "No search query",
  ];

  const submitAction = () => {
    if (!actionTarget || !actionMode) return;
    pushToast({
      tone: actionMode === "suspend" ? "warning" : "success",
      message:
        actionMode === "suspend"
          ? `${actionTarget.name} marked for suspension review. Reason captured for audit log.`
          : `${actionTarget.name} marked for reactivation review.`,
    });
    setActionMode(null);
    setActionTarget(null);
    setReason("");
  };

  return (
    <div className="admin-grid">
      <PageHeader
        actions={
          <>
            <Button
              onClick={() =>
                pushToast({
                  tone: "success",
                  message: `Mock export queued for ${filteredUsers.length} users. CSV/XLSX delivery will be wired later.`,
                })
              }
              size="md"
              variant="secondary"
            >
              Export users
            </Button>
            {!isReadOnly ? (
              <Button
                disabled={selectedIds.length === 0}
                onClick={() =>
                  pushToast({
                    tone: "warning",
                    message: `${selectedIds.length} selected account(s) prepared for a future batch action flow.`,
                  })
                }
                size="md"
              >
                Batch actions
              </Button>
            ) : null}
          </>
        }
        description="User management should feel safe under pressure: strong filters, visible status, quick review links, and no destructive change without a captured reason."
        eyebrow="User management"
        title="All Users"
      />

      <section className="grid gap-4 xl:grid-cols-4">
        {userDirectoryMetrics.map((metric) => (
          <MetricCard
            delta={metric.delta}
            key={metric.label}
            label={metric.label}
            tone={metric.tone}
            value={metric.value}
          />
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-[minmax(0,1.55fr)_minmax(320px,0.8fr)]">
        <Card className="overflow-hidden p-0">
          <div className="border-b border-line px-4 py-3">
            <FilterBar
              actions={
                <>
                  <SavedViewMenu label="Saved view: Pending providers" />
                  <Button
                    onClick={() => {
                      setSearch("");
                      setTypeFilter("all");
                      setStatusFilter("all");
                    }}
                    size="sm"
                    variant="ghost"
                  >
                    Reset filters
                  </Button>
                </>
              }
            >
              <Field label="Search">
                <Input
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Name, email, phone, or user ID"
                  value={search}
                />
              </Field>
              <div className="rounded-xl border border-line bg-panel p-2">
                <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-stone">
                  User type
                </div>
                <div className="flex flex-wrap gap-1">
                  {(["all", "customer", "provider", "franchise"] as const).map((type) => (
                    <button
                      className={[
                        "rounded-lg px-2.5 py-1.5 text-[12px] font-medium transition",
                        typeFilter === type ? "bg-panel-muted text-ink shadow-sm" : "text-stone hover:text-ink",
                      ].join(" ")}
                      key={type}
                      onClick={() => setTypeFilter(type)}
                      type="button"
                    >
                      {type === "all" ? `All (${users.length})` : `${userTypeLabels[type]} (${getTypeCount(type)})`}
                    </button>
                  ))}
                </div>
              </div>
              <div className="rounded-xl border border-line bg-panel p-2">
                <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-stone">
                  Status
                </div>
                <div className="flex flex-wrap gap-1">
                  {(["all", "active", "pending-review", "limited", "suspended"] as const).map((status) => (
                    <button
                      className={[
                        "rounded-lg px-2.5 py-1.5 text-[12px] font-medium transition",
                        statusFilter === status ? "bg-panel-muted text-ink shadow-sm" : "text-stone hover:text-ink",
                      ].join(" ")}
                      key={status}
                      onClick={() => setStatusFilter(status)}
                      type="button"
                    >
                      {status === "all" ? "All statuses" : status}
                    </button>
                  ))}
                </div>
              </div>
              <div className="rounded-xl border border-line bg-panel px-3 py-2 text-[12px] text-stone">
                Selected: <span className="font-medium text-ink">{selectedIds.length}</span>
              </div>
            </FilterBar>
            <div className="mt-3 px-4 pb-4">
              <ActiveFilters items={activeFilters} />
            </div>
          </div>
          <DataGrid columns={columns} rows={filteredUsers} />
        </Card>

        <div className="grid gap-4">
          <Card>
            <div className="eyebrow">Safe operations</div>
            <h3 className="mt-2 text-[1.15rem] leading-none">Bulk workflow principles</h3>
            <div className="mt-4 space-y-3">
              {[
                "Suspensions and reactivations must capture an operator note before confirmation.",
                "Provider and franchise accounts need visible document context before status changes.",
                "Export flows should be explicit because user lists often contain regulated contact data.",
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-line bg-panel-muted px-3 py-3">
                  <p className="text-dense text-body">{item}</p>
                </div>
              ))}
            </div>
          </Card>
          <Card>
            <div className="eyebrow">Pipeline snapshot</div>
            <h3 className="mt-2 text-[1.15rem] leading-none">What is waiting right now</h3>
            <div className="mt-4 space-y-3">
              <div className="rounded-2xl border border-warning/20 bg-warning-soft px-3 py-3">
                <div className="text-[12px] font-semibold text-warning">Provider reviews</div>
                <p className="mt-1 text-[12px] leading-5 text-body">
                  Insurance renewal and payout-bank verification are the biggest current blockers.
                </p>
              </div>
              <div className="rounded-2xl border border-danger/20 bg-danger-soft px-3 py-3">
                <div className="text-[12px] font-semibold text-danger">Suspension appeals</div>
                <p className="mt-1 text-[12px] leading-5 text-body">
                  Fraud-linked customer accounts should only be restored after support lead review.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {actionTarget && actionMode ? (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-ink/25 px-4 backdrop-blur-sm">
          <div className="w-full max-w-xl">
            <Modal
              actions={<StatusBadge tone={actionMode === "suspend" ? "warning" : "success"}>{actionMode}</StatusBadge>}
              title={actionMode === "suspend" ? "Suspend selected user" : "Reactivate user"}
            >
              <div className="grid gap-4">
                <p className="text-[13px] leading-6 text-body">
                  {actionTarget.name} ({userTypeLabels[actionTarget.type]}) will remain unchanged until the
                  reason is captured. This keeps bulk-style account changes auditable.
                </p>
                <Field label="Reason">
                  <Textarea
                    onChange={(event) => setReason(event.target.value)}
                    placeholder="Capture the operational reason and any manual override note..."
                    value={reason}
                  />
                </Field>
                <div className="flex flex-wrap gap-2">
                  <Button
                    onClick={() => {
                      setActionTarget(null);
                      setActionMode(null);
                      setReason("");
                    }}
                    size="sm"
                    variant="ghost"
                  >
                    Cancel
                  </Button>
                  <Button disabled={!reason.trim()} onClick={submitAction} size="sm" variant={actionMode === "suspend" ? "danger" : "success"}>
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
