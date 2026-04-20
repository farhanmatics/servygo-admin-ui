"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useMockAuth, useToast } from "@/components/providers";
import { Button } from "@/components/ui/button";
import { Card, MetricCard } from "@/components/ui/card";
import { DataGrid } from "@/components/ui/data-grid";
import { ActiveFilters, FilterBar, SavedViewMenu } from "@/components/ui/filter-bar";
import { Field, Input } from "@/components/ui/input";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import { adminRoleLabels, type AdminRole } from "@/lib/mock/admin-shell";
import { adminDirectoryMetrics, getAdminUsers } from "@/lib/mock/admins";

export function AdminListPage() {
  const { role } = useMockAuth();
  const { pushToast } = useToast();
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<AdminRole | "all">("all");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "invited" | "suspended">("all");

  const admins = getAdminUsers();
  const filtered = useMemo(
    () =>
      admins.filter((admin) => {
        const query = search.trim().toLowerCase();
        const matchesSearch =
          query.length === 0
            ? true
            : [admin.name, admin.email, admin.id, admin.team].some((value) =>
                value.toLowerCase().includes(query),
              );
        const matchesRole = roleFilter === "all" ? true : admin.role === roleFilter;
        const matchesStatus = statusFilter === "all" ? true : admin.status === statusFilter;
        return matchesSearch && matchesRole && matchesStatus;
      }),
    [admins, roleFilter, search, statusFilter],
  );

  const columns = [
    {
      header: "Admin",
      key: "admin",
      render: (admin: (typeof admins)[number]) => (
        <>
          <Link className="font-medium text-ink hover:text-forest" href={`/admins/${admin.id}`}>
            {admin.name}
          </Link>
          <div className="mt-1 text-[12px] text-stone">
            {admin.id} • {admin.team}
          </div>
        </>
      ),
    },
    {
      header: "Role",
      key: "role",
      render: (admin: (typeof admins)[number]) => (
        <StatusBadge tone="info">{adminRoleLabels[admin.role]}</StatusBadge>
      ),
    },
    {
      header: "Territory",
      key: "territory",
      render: (admin: (typeof admins)[number]) => (
        <span className="text-[13px] text-body">{admin.assignedTerritory}</span>
      ),
    },
    {
      header: "Status",
      key: "status",
      render: (admin: (typeof admins)[number]) => (
        <StatusBadge tone={admin.status === "active" ? "success" : admin.status === "invited" ? "warning" : "danger"}>
          {admin.status}
        </StatusBadge>
      ),
    },
    {
      header: "Last active",
      key: "lastActiveAt",
      render: (admin: (typeof admins)[number]) => (
        <span className="text-[13px] text-body">{admin.lastActiveAt}</span>
      ),
    },
    {
      header: "Actions",
      key: "actions",
      render: (admin: (typeof admins)[number]) => (
        <div className="flex flex-wrap gap-2">
          <Link href={`/admins/${admin.id}`}>
            <Button size="sm" variant="secondary">
              Open
            </Button>
          </Link>
          {role === "super-admin" ? (
            <Button
              onClick={() =>
                pushToast({
                  tone: "success",
                  message: `Mock invite or assignment action queued for ${admin.name}.`,
                })
              }
              size="sm"
              variant="ghost"
            >
              Manage
            </Button>
          ) : null}
        </div>
      ),
    },
  ];

  return (
    <div className="admin-grid">
      <PageHeader
        actions={
          <>
            <Button
              onClick={() =>
                pushToast({
                  tone: "success",
                  message: "Mock admin export queued for internal review.",
                })
              }
              size="md"
              variant="secondary"
            >
              Export admin list
            </Button>
            {role === "super-admin" ? <Button size="md">Invite admin</Button> : null}
          </>
        }
        description="Internal access should be explicit and reviewable. This directory shows who has access, what role they hold, where they operate, and whether their seat is active or pending."
        eyebrow="Internal access"
        title="Admin Users"
      />

      <section className="grid gap-4 xl:grid-cols-4">
        {adminDirectoryMetrics.map((metric) => (
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
                  <SavedViewMenu label="Saved view: Active seats" />
                  <Button
                    onClick={() => {
                      setSearch("");
                      setRoleFilter("all");
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
                  placeholder="Name, email, team, or admin ID"
                  value={search}
                />
              </Field>
              <div className="rounded-xl border border-line bg-panel p-2">
                <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-stone">
                  Role
                </div>
                <div className="flex flex-wrap gap-1">
                  {(["all", "super-admin", "operations-admin", "finance-admin", "compliance-admin", "support-admin", "read-only-admin"] as const).map((value) => (
                    <button
                      className={[
                        "rounded-lg px-2.5 py-1.5 text-[12px] font-medium transition",
                        roleFilter === value ? "bg-panel-muted text-ink shadow-sm" : "text-stone hover:text-ink",
                      ].join(" ")}
                      key={value}
                      onClick={() => setRoleFilter(value)}
                      type="button"
                    >
                      {value === "all" ? "All roles" : adminRoleLabels[value]}
                    </button>
                  ))}
                </div>
              </div>
              <div className="rounded-xl border border-line bg-panel p-2">
                <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-stone">
                  Status
                </div>
                <div className="flex flex-wrap gap-1">
                  {(["all", "active", "invited", "suspended"] as const).map((value) => (
                    <button
                      className={[
                        "rounded-lg px-2.5 py-1.5 text-[12px] font-medium transition",
                        statusFilter === value ? "bg-panel-muted text-ink shadow-sm" : "text-stone hover:text-ink",
                      ].join(" ")}
                      key={value}
                      onClick={() => setStatusFilter(value)}
                      type="button"
                    >
                      {value}
                    </button>
                  ))}
                </div>
              </div>
              <div className="rounded-xl border border-line bg-panel px-3 py-2 text-[12px] text-stone">
                Visible seats: <span className="font-medium text-ink">{filtered.length}</span>
              </div>
            </FilterBar>
            <div className="mt-3 px-4 pb-4">
              <ActiveFilters
                items={[
                  roleFilter === "all" ? "All roles" : adminRoleLabels[roleFilter],
                  statusFilter === "all" ? "All statuses" : statusFilter,
                  search.trim() ? `Search: ${search.trim()}` : "No search query",
                ]}
              />
            </div>
          </div>
          <DataGrid columns={columns} rows={filtered} />
        </Card>

        <div className="grid gap-4">
          <Card>
            <div className="eyebrow">Access guardrails</div>
            <h3 className="mt-2 text-[1.15rem] leading-none">What this module should protect</h3>
            <div className="mt-4 space-y-3">
              {[
                "Only Super Admin should change role assignments or invite new internal users.",
                "Read-only Admin can inspect seats and audit logs without editing permissions.",
                "All role and access changes should leave visible before/after context in the audit trail.",
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-line bg-panel-muted px-3 py-3">
                  <p className="text-dense text-body">{item}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
