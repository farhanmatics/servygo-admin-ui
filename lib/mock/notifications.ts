import type { AdminRole } from "./admin-shell";

export type NotificationChannel = "email" | "sms" | "push" | "in-app";
export type NotificationSeverity = "info" | "warning" | "danger" | "success";

export type NotificationItem = {
  channel: NotificationChannel;
  id: string;
  message: string;
  severity: NotificationSeverity;
  source: string;
  timestamp: string;
  title: string;
};

export const notificationAllowedRoles: AdminRole[] = [
  "super-admin",
  "operations-admin",
  "compliance-admin",
  "support-admin",
  "read-only-admin",
];

export const notificationItems: NotificationItem[] = [
  {
    id: "NTF-8841",
    title: "Provider insurance expiry alert",
    message: "SteriCare North insurance expires within 14 days.",
    source: "Compliance",
    channel: "in-app",
    severity: "warning",
    timestamp: "Today 10:14",
  },
  {
    id: "NTF-8829",
    title: "SLA breach watch",
    message: "Booking BK-20491 reached critical threshold.",
    source: "Live Ops",
    channel: "push",
    severity: "danger",
    timestamp: "Today 09:48",
  },
  {
    id: "NTF-8811",
    title: "Payout batch ready",
    message: "Weekly payout summary prepared for finance review.",
    source: "Finance",
    channel: "email",
    severity: "success",
    timestamp: "Today 08:11",
  },
];

export const channelOptions: NotificationChannel[] = ["email", "sms", "push", "in-app"];
