"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { useMockAuth, useToast } from "@/components/providers";
import { Button } from "@/components/ui/button";
import { Card, MetricCard } from "@/components/ui/card";
import { DataGrid } from "@/components/ui/data-grid";
import { ActiveFilters, FilterBar, SavedViewMenu } from "@/components/ui/filter-bar";
import { Field, Input, Select } from "@/components/ui/input";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import {
  bookingDirectoryMetrics,
  bookingPaymentTone,
  bookingPriorityTone,
  bookingStatusTone,
  getBookings,
  type BookingPaymentStatus,
  type BookingPriority,
  type BookingRecord,
  type BookingStatus,
} from "@/lib/mock/bookings";
import { setFilterParam } from "@/lib/url-state";

export function BookingListPage() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isReadOnly } = useMockAuth();
  const { pushToast } = useToast();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<BookingStatus | "all">(
    (searchParams.get("status") as BookingStatus | null) ?? "all",
  );
  const [priorityFilter, setPriorityFilter] = useState<BookingPriority | "all">(
    (searchParams.get("priority") as BookingPriority | null) ?? "all",
  );
  const [paymentFilter, setPaymentFilter] = useState<BookingPaymentStatus | "all">(
    (searchParams.get("payment") as BookingPaymentStatus | null) ?? "all",
  );
  const bookings = getBookings();

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return bookings.filter((booking) => {
      const statusMatch = statusFilter === "all" ? true : booking.status === statusFilter;
      const priorityMatch = priorityFilter === "all" ? true : booking.priority === priorityFilter;
      const paymentMatch = paymentFilter === "all" ? true : booking.paymentStatus === paymentFilter;
      const searchMatch =
        query.length === 0
          ? true
          : [
              booking.id,
              booking.customerName,
              booking.providerName,
              booking.service,
              booking.packageName,
              booking.city,
              booking.territory,
            ].some((value) => value.toLowerCase().includes(query));
      return statusMatch && priorityMatch && paymentMatch && searchMatch;
    });
  }, [bookings, paymentFilter, priorityFilter, search, statusFilter]);

  const columns = [
    {
      header: "Booking",
      key: "booking",
      render: (booking: BookingRecord) => (
        <>
          <Link className="font-medium text-ink hover:text-forest" href={`/bookings/${booking.id}`}>
            {booking.id}
          </Link>
          <div className="mt-1 text-[12px] text-stone">{booking.scheduledWindow}</div>
        </>
      ),
    },
    {
      header: "Customer / Provider",
      key: "party",
      render: (booking: BookingRecord) => (
        <div className="text-[13px] leading-6 text-body">
          <div>{booking.customerName}</div>
          <div className="text-stone">{booking.providerName}</div>
        </div>
      ),
    },
    {
      header: "Service",
      key: "service",
      render: (booking: BookingRecord) => (
        <div className="text-[13px] leading-6 text-body">
          <div>{booking.service}</div>
          <div className="text-stone">{booking.packageName}</div>
        </div>
      ),
    },
    {
      header: "Territory",
      key: "territory",
      render: (booking: BookingRecord) => (
        <span className="text-[13px] text-body">
          {booking.city} - {booking.territory}
        </span>
      ),
    },
    {
      header: "Status",
      key: "status",
      render: (booking: BookingRecord) => (
        <div className="flex flex-wrap items-center gap-2">
          <StatusBadge tone={bookingStatusTone[booking.status]}>{booking.status}</StatusBadge>
          <StatusBadge tone={bookingPriorityTone[booking.priority]}>{booking.priority}</StatusBadge>
        </div>
      ),
    },
    {
      header: "Payment",
      key: "payment",
      render: (booking: BookingRecord) => (
        <div className="flex flex-wrap items-center gap-2">
          <StatusBadge tone={bookingPaymentTone[booking.paymentStatus]}>{booking.paymentStatus}</StatusBadge>
          <span className="text-[12px] text-stone">{booking.amount}</span>
        </div>
      ),
    },
    {
      header: "Actions",
      key: "actions",
      render: (booking: BookingRecord) => (
        <div className="flex flex-wrap gap-2">
          <Link href={`/bookings/${booking.id}`}>
            <Button size="sm" variant="secondary">
              Open
            </Button>
          </Link>
          <Link href={`/bookings/${booking.id}/timeline`}>
            <Button size="sm" variant="ghost">
              Timeline
            </Button>
          </Link>
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
                  tone: "info",
                  message: `Mock saved view applied for ${filtered.length} booking(s).`,
                })
              }
              size="md"
              variant="secondary"
            >
              Apply queue view
            </Button>
            <Button
              disabled={isReadOnly}
              onClick={() =>
                pushToast({
                  tone: "warning",
                  message: "Bulk reassignment flow is staged for API integration.",
                })
              }
              size="md"
              title={isReadOnly ? "Read-only access" : undefined}
            >
              Bulk actions
            </Button>
          </>
        }
        description="High-frequency booking operations should stay fast: strong filtering, clear SLA state, and one-click access to assignment, reassign, cancel, reschedule, and timeline workflows."
        eyebrow="Booking management"
        title="All Bookings"
      />

      <section className="grid gap-4 xl:grid-cols-4">
        {bookingDirectoryMetrics.map((metric) => (
          <MetricCard key={metric.label} delta={metric.delta} label={metric.label} tone={metric.tone} value={metric.value} />
        ))}
      </section>

      <Card className="overflow-hidden p-0">
        <div className="border-b border-line px-4 py-3">
          <FilterBar
            actions={
              <>
                <SavedViewMenu label="Saved view: SLA risk queue" />
                <Button
                  onClick={() => {
                    setSearch("");
                    setStatusFilter("all");
                    setPriorityFilter("all");
                    setPaymentFilter("all");
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
                placeholder="Booking ID, customer, provider, city, or service"
                value={search}
              />
            </Field>
            <Field label="Status">
              <Select
                onChange={(event) => {
                  const next = event.target.value as BookingStatus | "all";
                  setStatusFilter(next);
                  router.replace(setFilterParam(pathname, new URLSearchParams(searchParams.toString()), "status", next), { scroll: false });
                }}
                value={statusFilter}
              >
                <option value="all">All statuses</option>
                <option value="scheduled">scheduled</option>
                <option value="in-progress">in-progress</option>
                <option value="completed">completed</option>
                <option value="cancelled">cancelled</option>
                <option value="reassignment-needed">reassignment-needed</option>
                <option value="sla-risk">sla-risk</option>
              </Select>
            </Field>
            <Field label="Priority">
              <Select
                onChange={(event) => {
                  const next = event.target.value as BookingPriority | "all";
                  setPriorityFilter(next);
                  router.replace(setFilterParam(pathname, new URLSearchParams(searchParams.toString()), "priority", next), { scroll: false });
                }}
                value={priorityFilter}
              >
                <option value="all">All priorities</option>
                <option value="low">low</option>
                <option value="normal">normal</option>
                <option value="high">high</option>
                <option value="critical">critical</option>
              </Select>
            </Field>
            <Field label="Payment">
              <Select
                onChange={(event) => {
                  const next = event.target.value as BookingPaymentStatus | "all";
                  setPaymentFilter(next);
                  router.replace(setFilterParam(pathname, new URLSearchParams(searchParams.toString()), "payment", next), { scroll: false });
                }}
                value={paymentFilter}
              >
                <option value="all">All payment states</option>
                <option value="authorized">authorized</option>
                <option value="captured">captured</option>
                <option value="refunded">refunded</option>
                <option value="pending">pending</option>
              </Select>
            </Field>
          </FilterBar>
          <div className="mt-3 px-4 pb-4">
            <ActiveFilters
              items={[
                statusFilter === "all" ? "All statuses" : `Status: ${statusFilter}`,
                priorityFilter === "all" ? "All priorities" : `Priority: ${priorityFilter}`,
                paymentFilter === "all" ? "All payment states" : `Payment: ${paymentFilter}`,
                search.trim() ? `Search: ${search.trim()}` : "No search query",
              ]}
            />
          </div>
        </div>
        <DataGrid columns={columns} rows={filtered} />
      </Card>
    </div>
  );
}
