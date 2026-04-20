"use client";

import { useMockAuth } from "@/components/providers";
import { Button } from "@/components/ui/button";
import { Card, MetricCard } from "@/components/ui/card";
import { DataGrid } from "@/components/ui/data-grid";
import { ActiveFilters, FilterBar, SavedViewMenu } from "@/components/ui/filter-bar";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import { taskItems, taskQueueSummary } from "@/lib/mock/admin-shell";

export function TasksPage() {
  const { role } = useMockAuth();

  const visibleTasks = taskItems.filter((task) => task.roles.includes(role));

  const columns = [
    {
      header: "Task",
      key: "task",
      render: (item: (typeof visibleTasks)[number]) => (
        <>
          <div className="font-medium text-ink">{item.title}</div>
          <div className="mt-1 text-[12px] text-stone">{item.id}</div>
        </>
      ),
    },
    {
      header: "Queue",
      key: "queue",
      render: (item: (typeof visibleTasks)[number]) => (
        <span className="text-[13px] text-body">{item.queue}</span>
      ),
    },
    {
      header: "Summary",
      key: "summary",
      render: (item: (typeof visibleTasks)[number]) => (
        <p className="max-w-lg text-[13px] leading-6 text-body">{item.summary}</p>
      ),
    },
    {
      header: "Due",
      key: "due",
      render: (item: (typeof visibleTasks)[number]) => (
        <span className="text-[13px] text-body">{item.due}</span>
      ),
    },
    {
      header: "Status",
      key: "status",
      render: (item: (typeof visibleTasks)[number]) => (
        <StatusBadge tone={item.tone}>{item.status}</StatusBadge>
      ),
    },
  ];

  return (
    <div className="admin-grid">
      <PageHeader
        actions={
          <>
            <Button size="md" variant="secondary">
              Saved queues
            </Button>
            <Button size="md">Claim next task</Button>
          </>
        }
        description="Task inbox for pending verification, disputes, review flags, and operator follow-ups. This queue should help teams clear work intentionally instead of letting it hide inside module pages."
        eyebrow="Work inbox"
        title="Task Queue"
      />

      <section className="grid gap-4 xl:grid-cols-3">
        {taskQueueSummary.map((metric) => (
          <MetricCard
            delta={metric.detail}
            key={metric.label}
            label={metric.label}
            tone={metric.tone}
            value={metric.value}
          />
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-[minmax(0,1.5fr)_minmax(320px,0.85fr)]">
        <Card className="overflow-hidden p-0">
          <div className="border-b border-line px-4 py-3">
            <FilterBar
              actions={
                <>
                  <SavedViewMenu label="Saved view: My desk" />
                  <Button size="sm" variant="secondary">
                    Reassign
                  </Button>
                </>
              }
            >
              <div className="rounded-xl border border-line bg-panel px-3 py-2 text-[12px] text-stone">
                Owner: <span className="font-medium text-ink">Current role</span>
              </div>
              <div className="rounded-xl border border-line bg-panel px-3 py-2 text-[12px] text-stone">
                Status: <span className="font-medium text-ink">Open</span>
              </div>
              <div className="rounded-xl border border-line bg-panel px-3 py-2 text-[12px] text-stone">
                Due: <span className="font-medium text-ink">Today + tomorrow</span>
              </div>
              <div className="rounded-xl border border-line bg-panel px-3 py-2 text-[12px] text-stone">
                Queue: <span className="font-medium text-ink">All assigned</span>
              </div>
            </FilterBar>
            <div className="mt-3 px-4 pb-4">
              <ActiveFilters items={["Role-scoped tasks", "Urgent first", `${visibleTasks.length} visible items`]} />
            </div>
          </div>
          <DataGrid columns={columns} rows={visibleTasks} />
        </Card>

        <div className="grid gap-4">
          <Card>
            <div className="eyebrow">Queue guidance</div>
            <h3 className="mt-2 text-[1.15rem] leading-none">How operators should use this inbox</h3>
            <div className="mt-4 space-y-3">
              {[
                "Urgent operational issues should be resolved before same-day document follow-ups.",
                "If a task changes customer or provider state, capture the reason in notes before closure.",
                "Read-only admins can review queue load and history, but ownership changes stay disabled.",
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-line bg-panel-muted px-3 py-3">
                  <p className="text-dense text-body">{item}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <div className="eyebrow">Queue health</div>
            <h3 className="mt-2 text-[1.15rem] leading-none">Closest deadlines</h3>
            <div className="mt-4 grid gap-3">
              {visibleTasks.slice(0, 3).map((task) => (
                <div key={task.id} className="rounded-2xl border border-line bg-panel-muted px-3 py-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-[12px] font-semibold text-ink">{task.title}</div>
                      <div className="mt-1 text-[11px] text-stone">{task.due}</div>
                    </div>
                    <StatusBadge tone={task.tone}>{task.status}</StatusBadge>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
