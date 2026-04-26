import type { AdminRole } from "./admin-shell";

export const settingsAllowedRoles: AdminRole[] = ["super-admin", "read-only-admin"];

export const platformSettingsHighlights = [
  "Environment banner: Staging",
  "Default territory assignment: Regional auto-detect",
  "Audit retention: 18 months",
  "Data export format defaults: CSV + PDF",
];

export const notificationTemplates = [
  "Booking confirmation template",
  "Provider document expiry reminder",
  "Dispute escalation acknowledgment",
  "Payout release summary",
];

export const cancellationPolicies = [
  "Customer free cancellation until 24h before window.",
  "Provider cancellation inside 2h triggers penalty scoring.",
  "Emergency override requires supervisor note.",
];
