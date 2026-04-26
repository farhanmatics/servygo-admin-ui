export type AdminRole =
  | "super-admin"
  | "operations-admin"
  | "finance-admin"
  | "compliance-admin"
  | "support-admin"
  | "read-only-admin";

export type StatusTone = "success" | "warning" | "danger" | "info" | "neutral";

export type NavItem = {
  badge?: string;
  href: string;
  name: string;
  roles: AdminRole[];
};

export type DashboardMetric = {
  delta: string;
  label: string;
  tone: StatusTone;
  value: string;
};

export type LiveBookingRow = {
  booking: string;
  customer: string;
  eta: string;
  provider: string;
  service: string;
  status: string;
  territory: string;
  tone: Exclude<StatusTone, "neutral">;
};

export type QueueCard = {
  items: string[];
  summary: string;
  title: string;
};

export type AlertItem = {
  age: string;
  id: string;
  owner: string;
  source: string;
  summary: string;
  territory: string;
  title: string;
  tone: Exclude<StatusTone, "neutral">;
};

export type TaskItem = {
  due: string;
  id: string;
  queue: string;
  roles: AdminRole[];
  status: string;
  summary: string;
  title: string;
  tone: Exclude<StatusTone, "neutral">;
};

export const adminRoleLabels: Record<AdminRole, string> = {
  "super-admin": "Super Admin",
  "operations-admin": "Operations Admin",
  "finance-admin": "Finance Admin",
  "compliance-admin": "Compliance Admin",
  "support-admin": "Support Admin",
  "read-only-admin": "Read-only Admin",
};

export const roleTerritories: Record<AdminRole, string> = {
  "super-admin": "National oversight",
  "operations-admin": "Central Canada territory",
  "finance-admin": "Finance and payouts desk",
  "compliance-admin": "Verification and compliance desk",
  "support-admin": "Support escalation queue",
  "read-only-admin": "Read-only audit access",
};

export const roleDashboardCopy: Record<
  AdminRole,
  {
    description: string;
    focusLabel: string;
    highlight: string;
    primaryAction: string;
    secondaryAction: string;
  }
> = {
  "super-admin": {
    description:
      "National control view across operations, payouts, disputes, and compliance. Escalations and backlog shifts should be obvious within a single pass.",
    focusLabel: "Enterprise health",
    highlight: "Cross-functional backlog is stable, but Alberta payout exceptions need executive review before tonight's batch.",
    primaryAction: "Review escalations",
    secondaryAction: "Open audit trail",
  },
  "operations-admin": {
    description:
      "Operations focus keeps live bookings, SLA pressure, and territory coverage front and center so assignments can move quickly.",
    focusLabel: "Live operations",
    highlight: "Saskatoon and Calgary are carrying the highest reassignment load for the next four service windows.",
    primaryAction: "Open dispatch queue",
    secondaryAction: "View live ops",
  },
  "finance-admin": {
    description:
      "Finance view emphasizes payout blockers, refund exposure, and transaction exceptions while keeping raw instrument data masked.",
    focusLabel: "Payout controls",
    highlight: "Two provider payout batches remain blocked on bank reference mismatches. Refund exposure is concentrated in commercial cleanups.",
    primaryAction: "Inspect payout backlog",
    secondaryAction: "Export finance snapshot",
  },
  "compliance-admin": {
    description:
      "Compliance view prioritizes pending verifications, expiring credentials, and redaction-aware review flows for provider records.",
    focusLabel: "Verification backlog",
    highlight: "Insurance and business-license renewals are the main risk this week. Three franchise accounts still need secondary review.",
    primaryAction: "Review documents",
    secondaryAction: "Open expiry board",
  },
  "support-admin": {
    description:
      "Support view keeps disputes, customer escalations, and outcome deadlines together so casework is easy to triage and defend.",
    focusLabel: "Customer escalations",
    highlight: "Five disputes are older than 48 hours and one enterprise customer escalation now requires a same-day resolution note.",
    primaryAction: "Open dispute queue",
    secondaryAction: "Check task inbox",
  },
  "read-only-admin": {
    description:
      "Read-only access is tuned for audit and oversight. The interface stays dense and traceable while edit actions remain locked.",
    focusLabel: "Audit visibility",
    highlight: "You can review live platform status, queues, and operator activity, but any destructive or editing actions stay disabled.",
    primaryAction: "Review alerts",
    secondaryAction: "Read audit notes",
  },
};

export const navGroups: { items: NavItem[]; label: string }[] = [
  {
    label: "Operations",
    items: [
      {
        badge: "Live",
        href: "/dashboard",
        name: "Dashboard",
        roles: Object.keys(adminRoleLabels) as AdminRole[],
      },
      {
        badge: "6",
        href: "/alerts",
        name: "Alerts",
        roles: Object.keys(adminRoleLabels) as AdminRole[],
      },
      {
        badge: "18",
        href: "/tasks",
        name: "Tasks",
        roles: [
          "super-admin",
          "operations-admin",
          "compliance-admin",
          "support-admin",
          "read-only-admin",
        ],
      },
      {
        badge: "324",
        href: "/bookings",
        name: "Bookings",
        roles: ["super-admin", "operations-admin", "support-admin", "read-only-admin"],
      },
      {
        badge: "12",
        href: "/users",
        name: "Users",
        roles: ["super-admin", "operations-admin", "compliance-admin", "support-admin", "read-only-admin"],
      },
      {
        badge: "36",
        href: "/admins",
        name: "Admins",
        roles: ["super-admin", "read-only-admin"],
      },
      {
        badge: "18",
        href: "/services",
        name: "Services",
        roles: ["super-admin", "operations-admin", "read-only-admin"],
      },
      {
        badge: "9",
        href: "/operations/live",
        name: "Live Ops",
        roles: ["super-admin", "operations-admin", "read-only-admin"],
      },
    ],
  },
  {
    label: "Controls",
    items: [
      {
        badge: "7",
        href: "/finance/transactions",
        name: "Finance",
        roles: ["super-admin", "finance-admin", "read-only-admin"],
      },
      {
        badge: "18",
        href: "/disputes",
        name: "Disputes",
        roles: ["super-admin", "operations-admin", "support-admin", "read-only-admin"],
      },
      {
        badge: "14",
        href: "/compliance",
        name: "Compliance",
        roles: ["super-admin", "compliance-admin", "read-only-admin"],
      },
      {
        badge: "New",
        href: "/analytics",
        name: "Reports",
        roles: ["super-admin", "finance-admin", "operations-admin", "read-only-admin"],
      },
      {
        badge: "Logs",
        href: "/audit/admin-actions",
        name: "Audit",
        roles: ["super-admin", "read-only-admin"],
      },
    ],
  },
  {
    label: "Franchises",
    items: [
      {
        badge: "5",
        href: "/franchises",
        name: "Territories",
        roles: ["super-admin", "operations-admin", "finance-admin", "read-only-admin"],
      },
      {
        badge: "4",
        href: "/finance/franchise-payouts",
        name: "Franchise Payouts",
        roles: ["super-admin", "finance-admin", "read-only-admin"],
      },
    ],
  },
  {
    label: "Platform",
    items: [
      {
        href: "/settings/promos",
        name: "Promos & Campaigns",
        roles: ["super-admin", "operations-admin", "finance-admin", "read-only-admin"],
      },
      {
        href: "/settings/content",
        name: "CMS Content",
        roles: ["super-admin", "read-only-admin"],
      },
      {
        href: "/settings/channels",
        name: "Email & SMS",
        roles: ["super-admin", "read-only-admin"],
      },
      {
        href: "/settings/fraud-rules",
        name: "Fraud Rules",
        roles: ["super-admin", "compliance-admin", "read-only-admin"],
      },
      {
        href: "/settings/ads",
        name: "Ad Slots",
        roles: ["super-admin", "read-only-admin"],
      },
    ],
  },
];

export const routePermissions: { pattern: string; roles: AdminRole[] }[] = [
  { pattern: "/dashboard", roles: Object.keys(adminRoleLabels) as AdminRole[] },
  { pattern: "/alerts", roles: Object.keys(adminRoleLabels) as AdminRole[] },
  {
    pattern: "/tasks",
    roles: ["super-admin", "operations-admin", "compliance-admin", "support-admin", "read-only-admin"],
  },
  {
    pattern: "/bookings",
    roles: ["super-admin", "operations-admin", "support-admin", "read-only-admin"],
  },
  {
    pattern: "/users",
    roles: ["super-admin", "operations-admin", "compliance-admin", "support-admin", "read-only-admin"],
  },
  {
    pattern: "/admins",
    roles: ["super-admin", "read-only-admin"],
  },
  {
    pattern: "/settings/roles",
    roles: ["super-admin", "read-only-admin"],
  },
  {
    pattern: "/audit/admin-actions",
    roles: ["super-admin", "read-only-admin"],
  },
  {
    pattern: "/services",
    roles: ["super-admin", "operations-admin", "read-only-admin"],
  },
  {
    pattern: "/operations",
    roles: ["super-admin", "operations-admin", "read-only-admin"],
  },
  {
    pattern: "/finance",
    roles: ["super-admin", "finance-admin", "read-only-admin"],
  },
  {
    pattern: "/disputes",
    roles: ["super-admin", "operations-admin", "support-admin", "read-only-admin"],
  },
  {
    pattern: "/compliance",
    roles: ["super-admin", "compliance-admin", "read-only-admin"],
  },
  {
    pattern: "/reviews",
    roles: ["super-admin", "support-admin", "read-only-admin"],
  },
  {
    pattern: "/risk/reviews",
    roles: ["super-admin", "support-admin", "read-only-admin"],
  },
  {
    pattern: "/analytics",
    roles: ["super-admin", "finance-admin", "operations-admin", "read-only-admin"],
  },
  {
    pattern: "/notifications",
    roles: ["super-admin", "operations-admin", "compliance-admin", "support-admin", "read-only-admin"],
  },
  {
    pattern: "/settings",
    roles: ["super-admin", "read-only-admin"],
  },
  {
    pattern: "/privacy",
    roles: ["super-admin", "compliance-admin", "read-only-admin"],
  },
  {
    pattern: "/maintenance",
    roles: Object.keys(adminRoleLabels) as AdminRole[],
  },
  {
    pattern: "/readonly",
    roles: Object.keys(adminRoleLabels) as AdminRole[],
  },
  {
    pattern: "/offline",
    roles: Object.keys(adminRoleLabels) as AdminRole[],
  },
  {
    pattern: "/franchises",
    roles: ["super-admin", "operations-admin", "finance-admin", "read-only-admin"],
  },
  {
    pattern: "/users/form-templates",
    roles: ["super-admin", "compliance-admin", "read-only-admin"],
  },
  {
    pattern: "/finance/franchise-payouts",
    roles: ["super-admin", "finance-admin", "read-only-admin"],
  },
  {
    pattern: "/reviews/responses",
    roles: ["super-admin", "support-admin", "read-only-admin"],
  },
  {
    pattern: "/settings/promos",
    roles: ["super-admin", "operations-admin", "finance-admin", "read-only-admin"],
  },
  {
    pattern: "/settings/content",
    roles: ["super-admin", "read-only-admin"],
  },
  {
    pattern: "/settings/ads",
    roles: ["super-admin", "read-only-admin"],
  },
  {
    pattern: "/settings/channels",
    roles: ["super-admin", "read-only-admin"],
  },
  {
    pattern: "/settings/fraud-rules",
    roles: ["super-admin", "compliance-admin", "read-only-admin"],
  },
];

export const dashboardMetrics: DashboardMetric[] = [
  { label: "Active jobs", value: "186", delta: "+12 today", tone: "success" },
  { label: "Pending disputes", value: "18", delta: "4 critical", tone: "warning" },
  { label: "Docs expiring", value: "27", delta: "next 7 days", tone: "danger" },
  { label: "Payouts queued", value: "91", delta: "CAD 42.8k", tone: "info" },
];

export const liveBookings: LiveBookingRow[] = [
  {
    booking: "BK-20491",
    customer: "Northline Office Park",
    service: "Office Deep Cleaning",
    territory: "Saskatoon",
    provider: "Prairie Shine",
    status: "Delayed",
    tone: "warning",
    eta: "18 min late",
  },
  {
    booking: "BK-20483",
    customer: "WestGrid Leasing",
    service: "Fleet Detailing",
    territory: "Regina",
    provider: "ShineHaus Auto",
    status: "In progress",
    tone: "success",
    eta: "On time",
  },
  {
    booking: "BK-20464",
    customer: "Beacon Relocation",
    service: "Moving Support",
    territory: "Calgary",
    provider: "Northline Logistics",
    status: "Needs reassignment",
    tone: "danger",
    eta: "Worker cancelled",
  },
  {
    booking: "BK-20451",
    customer: "Everline Retail",
    service: "Commercial Janitorial",
    territory: "Edmonton",
    provider: "Evergreen Facility",
    status: "Scheduled",
    tone: "info",
    eta: "Starts 2:30 PM",
  },
  {
    booking: "BK-20438",
    customer: "Maplewell Medical",
    service: "Sanitization",
    territory: "Winnipeg",
    provider: "SteriCare North",
    status: "SLA at risk",
    tone: "danger",
    eta: "17 min to breach",
  },
];

export const dashboardQueues: QueueCard[] = [
  {
    title: "Compliance queue",
    summary: "14 providers waiting for document review",
    items: [
      "7 business license renewals due in under 5 days",
      "4 insurance certificates missing expiry metadata",
      "3 franchise accounts blocked pending ID verification",
    ],
  },
  {
    title: "Support queue",
    summary: "18 disputes open, 5 older than 48h",
    items: [
      "2 refund requests include photo evidence",
      "1 VIP business customer escalation",
      "3 cases waiting on provider response",
    ],
  },
];

export const dashboardWatchlist = [
  "3 providers are one failed upload away from suspension",
  "2 payout batches stopped on bank reference mismatch",
  "1 territory is below minimum worker availability tonight",
];

export const alertItems: AlertItem[] = [
  {
    id: "ALT-301",
    title: "SLA breach risk escalating in Calgary",
    summary: "Two moving-support bookings are within 20 minutes of breach after a provider cancellation.",
    owner: "Operations desk",
    territory: "Calgary, AB",
    source: "Live Ops",
    age: "8 min",
    tone: "danger",
  },
  {
    id: "ALT-294",
    title: "Provider insurance expiry approaching",
    summary: "Prairie Shine insurance certificate expires in 3 days and still needs secondary review metadata.",
    owner: "Compliance desk",
    territory: "Saskatoon, SK",
    source: "Documents",
    age: "21 min",
    tone: "warning",
  },
  {
    id: "ALT-289",
    title: "Payout batch halted on bank mismatch",
    summary: "Batch `PAYOUT-W17` stopped after one provider account failed bank reference validation.",
    owner: "Finance desk",
    territory: "National",
    source: "Payouts",
    age: "33 min",
    tone: "danger",
  },
  {
    id: "ALT-283",
    title: "Fraud review spike in home cleaning reviews",
    summary: "Six recent 5-star reviews share overlapping device fingerprints and timing patterns.",
    owner: "Support desk",
    territory: "Toronto, ON",
    source: "Risk",
    age: "58 min",
    tone: "warning",
  },
  {
    id: "ALT-277",
    title: "Daily revenue snapshot refreshed",
    summary: "Today's gross bookings are up 11.8% versus the prior Monday with commercial demand leading.",
    owner: "Analytics feed",
    territory: "National",
    source: "Reporting",
    age: "1h 12m",
    tone: "info",
  },
  {
    id: "ALT-265",
    title: "Manual review requested for enterprise refund",
    summary: "Large refund over CAD 2,000 needs manager approval before final settlement.",
    owner: "Finance desk",
    territory: "Vancouver, BC",
    source: "Refunds",
    age: "2h 03m",
    tone: "warning",
  },
];

export const taskItems: TaskItem[] = [
  {
    id: "TASK-118",
    title: "Review missing insurance expiry metadata",
    summary: "Three provider files were uploaded without expiry fields and need a compliance decision.",
    queue: "Compliance",
    due: "Today, 2:00 PM",
    status: "Needs review",
    tone: "warning",
    roles: ["super-admin", "compliance-admin", "read-only-admin"],
  },
  {
    id: "TASK-112",
    title: "Resolve delayed relocation booking",
    summary: "Customer requested manual reassignment after original provider cancelled within the arrival window.",
    queue: "Operations",
    due: "Today, 12:45 PM",
    status: "Urgent",
    tone: "danger",
    roles: ["super-admin", "operations-admin", "support-admin", "read-only-admin"],
  },
  {
    id: "TASK-109",
    title: "Document dispute rationale for refund decision",
    summary: "Outcome was approved verbally. Internal notes and evidence references still need to be logged.",
    queue: "Support",
    due: "Today, 4:30 PM",
    status: "In progress",
    tone: "info",
    roles: ["super-admin", "support-admin", "operations-admin", "read-only-admin"],
  },
  {
    id: "TASK-102",
    title: "Approve payout exception batch",
    summary: "Seven completed orders are eligible, but one provider transfer needs manual release after verification.",
    queue: "Finance",
    due: "Tomorrow, 9:00 AM",
    status: "Awaiting approval",
    tone: "warning",
    roles: ["super-admin", "finance-admin", "read-only-admin"],
  },
  {
    id: "TASK-094",
    title: "Audit high-risk review cluster",
    summary: "Check linked devices, timing pattern, and provider overlap before deciding whether to hide the set.",
    queue: "Moderation",
    due: "Tomorrow, 11:30 AM",
    status: "Queued",
    tone: "info",
    roles: ["super-admin", "support-admin", "read-only-admin"],
  },
];

export const taskQueueSummary = [
  {
    label: "Urgent today",
    value: "6",
    detail: "Two need same-hour attention",
    tone: "danger" as const,
  },
  {
    label: "Awaiting compliance",
    value: "14",
    detail: "Expiry checks and resubmissions",
    tone: "warning" as const,
  },
  {
    label: "Ready to close",
    value: "9",
    detail: "Need notes or final approval",
    tone: "success" as const,
  },
];

export function isRouteAllowed(pathname: string, role: AdminRole) {
  const match = routePermissions.find((route) => pathname === route.pattern || pathname.startsWith(`${route.pattern}/`));
  return match ? match.roles.includes(role) : true;
}
