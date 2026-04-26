import type { AdminRole } from "./admin-shell";

export type TrendPoint = {
  label: string;
  value: string;
};

export const analyticsAllowedRoles: AdminRole[] = [
  "super-admin",
  "finance-admin",
  "operations-admin",
  "read-only-admin",
];

export const analyticsMetrics = [
  { label: "Revenue (30d)", value: "CAD 1.28M", delta: "+11.4% vs prior period", tone: "success" as const },
  { label: "Bookings (30d)", value: "7,942", delta: "+8.1% vs prior period", tone: "info" as const },
  { label: "Active providers", value: "426", delta: "92% verification-complete", tone: "warning" as const },
  { label: "Avg completion SLA", value: "94.6%", delta: "National blended", tone: "success" as const },
];

export const revenueTrend: TrendPoint[] = [
  { label: "Week 1", value: "CAD 278k" },
  { label: "Week 2", value: "CAD 294k" },
  { label: "Week 3", value: "CAD 331k" },
  { label: "Week 4", value: "CAD 377k" },
];

export const bookingTrend: TrendPoint[] = [
  { label: "Week 1", value: "1,812" },
  { label: "Week 2", value: "1,906" },
  { label: "Week 3", value: "2,021" },
  { label: "Week 4", value: "2,203" },
];

export const userGrowth: TrendPoint[] = [
  { label: "New customers", value: "2,411" },
  { label: "New providers", value: "74" },
  { label: "New workers", value: "139" },
  { label: "Net active accounts", value: "13,204" },
];

export const providerPerformance: TrendPoint[] = [
  { label: "Top SLA provider", value: "Evergreen Facility (98.9%)" },
  { label: "Top booking volume", value: "Prairie Shine Co. (418 jobs)" },
  { label: "At-risk providers", value: "9 need intervention" },
  { label: "Avg rating", value: "4.71 / 5" },
];

export const servicePerformance: TrendPoint[] = [
  { label: "Top revenue", value: "Cleaning (CAD 612k)" },
  { label: "Fastest growth", value: "Logistics (+19%)" },
  { label: "Most disputes", value: "Moving support (14%)" },
  { label: "Best completion", value: "Car detailing (97.2%)" },
];

export const scheduledReports = [
  "Daily operations pulse (07:00 local)",
  "Weekly finance summary (Friday 18:00)",
  "Compliance expiry digest (Monday 09:00)",
  "Dispute risk snapshot (Daily 16:00)",
];
