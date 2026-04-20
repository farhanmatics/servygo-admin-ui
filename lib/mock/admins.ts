import { adminRoleLabels, type AdminRole } from "./admin-shell";

export type PermissionCategory =
  | "dashboard"
  | "users"
  | "bookings"
  | "finance"
  | "compliance"
  | "disputes"
  | "reports"
  | "settings"
  | "audit";

export type PermissionLevel = "none" | "view" | "manage";

export type AdminUserRecord = {
  assignedTerritory: string;
  createdAt: string;
  email: string;
  id: string;
  lastActiveAt: string;
  name: string;
  role: AdminRole;
  seatsManaged: number;
  status: "active" | "invited" | "suspended";
  team: string;
};

export type AdminAuditEntry = {
  actionType: string;
  actorId: string;
  actorName: string;
  beforeAfter: string;
  entity: string;
  id: string;
  ipAddress: string;
  role: AdminRole;
  severity: "info" | "warning" | "danger" | "success";
  timestamp: string;
};

export type PermissionRow = {
  category: PermissionCategory;
  description: string;
  levels: Record<AdminRole, PermissionLevel>;
};

export type AdminUserProfile = AdminUserRecord & {
  assignedQueues: string[];
  auditNotes: string[];
  permissions: Record<PermissionCategory, PermissionLevel>;
  recentActions: AdminAuditEntry[];
};

export const adminUsers: AdminUserProfile[] = [
  {
    id: "ADM-001",
    name: "Arif Rabbani",
    email: "arif.rabbani@servygo.ca",
    role: "super-admin",
    status: "active",
    team: "Executive operations",
    assignedTerritory: "National oversight",
    lastActiveAt: "2026-04-20 11:42 CST",
    createdAt: "2025-01-10",
    seatsManaged: 18,
    assignedQueues: ["Escalations", "Role approvals", "Audit oversight"],
    auditNotes: [
      "Super Admin changes should always appear in the admin audit log with before/after values.",
      "Role assignment changes require explicit rationale if they affect finance or compliance access.",
    ],
    permissions: {
      dashboard: "manage",
      users: "manage",
      bookings: "manage",
      finance: "manage",
      compliance: "manage",
      disputes: "manage",
      reports: "manage",
      settings: "manage",
      audit: "manage",
    },
    recentActions: [],
  },
  {
    id: "ADM-014",
    name: "Sofia Tremblay",
    email: "sofia.tremblay@servygo.ca",
    role: "operations-admin",
    status: "active",
    team: "Dispatch and live ops",
    assignedTerritory: "Prairie operations",
    lastActiveAt: "2026-04-20 10:58 CST",
    createdAt: "2025-07-04",
    seatsManaged: 6,
    assignedQueues: ["Live ops", "Booking reassignments", "SLA escalations"],
    auditNotes: [
      "Operations admins can manage users and bookings but should not change finance or role settings.",
    ],
    permissions: {
      dashboard: "manage",
      users: "manage",
      bookings: "manage",
      finance: "none",
      compliance: "view",
      disputes: "manage",
      reports: "view",
      settings: "none",
      audit: "view",
    },
    recentActions: [],
  },
  {
    id: "ADM-022",
    name: "Meera Khanna",
    email: "meera.khanna@servygo.ca",
    role: "finance-admin",
    status: "active",
    team: "Finance and payouts",
    assignedTerritory: "National finance desk",
    lastActiveAt: "2026-04-20 09:47 CST",
    createdAt: "2025-08-19",
    seatsManaged: 4,
    assignedQueues: ["Payout exceptions", "Refund approvals"],
    auditNotes: [
      "Finance admins should not access role settings. High-value payout approvals require clean audit notes.",
    ],
    permissions: {
      dashboard: "view",
      users: "none",
      bookings: "view",
      finance: "manage",
      compliance: "none",
      disputes: "view",
      reports: "manage",
      settings: "none",
      audit: "view",
    },
    recentActions: [],
  },
  {
    id: "ADM-031",
    name: "Lina Sandhu",
    email: "lina.sandhu@servygo.ca",
    role: "compliance-admin",
    status: "active",
    team: "Verification and compliance",
    assignedTerritory: "National compliance desk",
    lastActiveAt: "2026-04-20 08:53 CST",
    createdAt: "2025-11-21",
    seatsManaged: 5,
    assignedQueues: ["Document review", "Expiry monitoring"],
    auditNotes: [
      "Compliance changes should preserve who reviewed what and when.",
    ],
    permissions: {
      dashboard: "view",
      users: "manage",
      bookings: "view",
      finance: "none",
      compliance: "manage",
      disputes: "view",
      reports: "view",
      settings: "none",
      audit: "view",
    },
    recentActions: [],
  },
  {
    id: "ADM-040",
    name: "Daniel Noor",
    email: "daniel.noor@servygo.ca",
    role: "support-admin",
    status: "invited",
    team: "Support escalation",
    assignedTerritory: "Ontario and enterprise support",
    lastActiveAt: "Invitation pending",
    createdAt: "2026-04-18",
    seatsManaged: 3,
    assignedQueues: ["Dispute review", "Customer escalations"],
    auditNotes: [
      "Invited admins should show permission intent before they ever sign in.",
    ],
    permissions: {
      dashboard: "view",
      users: "manage",
      bookings: "manage",
      finance: "none",
      compliance: "view",
      disputes: "manage",
      reports: "view",
      settings: "none",
      audit: "view",
    },
    recentActions: [],
  },
  {
    id: "ADM-055",
    name: "Rhea Banerjee",
    email: "rhea.banerjee@servygo.ca",
    role: "read-only-admin",
    status: "active",
    team: "Internal audit",
    assignedTerritory: "Audit access only",
    lastActiveAt: "2026-04-20 07:21 CST",
    createdAt: "2025-10-06",
    seatsManaged: 0,
    assignedQueues: ["Audit reviews", "Exception log verification"],
    auditNotes: [
      "Read-only admins can review admin actions but cannot edit assignments or platform settings.",
    ],
    permissions: {
      dashboard: "view",
      users: "view",
      bookings: "view",
      finance: "view",
      compliance: "view",
      disputes: "view",
      reports: "view",
      settings: "none",
      audit: "manage",
    },
    recentActions: [],
  },
];

export const adminAuditEntries: AdminAuditEntry[] = [
  {
    id: "AUD-501",
    actorId: "ADM-001",
    actorName: "Arif Rabbani",
    role: "super-admin",
    actionType: "Role updated",
    entity: "ADM-040 / Daniel Noor",
    timestamp: "2026-04-19 15:44 CST",
    ipAddress: "198.51.100.44",
    beforeAfter: "Before: invited support-admin access pending. After: disputes + user-management permissions confirmed.",
    severity: "warning",
  },
  {
    id: "AUD-498",
    actorId: "ADM-022",
    actorName: "Meera Khanna",
    role: "finance-admin",
    actionType: "Payout exception approved",
    entity: "PAYOUT-W17 / Prairie Shine",
    timestamp: "2026-04-19 11:06 CST",
    ipAddress: "198.51.100.73",
    beforeAfter: "Before: blocked for bank mismatch. After: released with manual note and finance approval.",
    severity: "success",
  },
  {
    id: "AUD-493",
    actorId: "ADM-014",
    actorName: "Sofia Tremblay",
    role: "operations-admin",
    actionType: "User suspension",
    entity: "USR-1004 / Avery McLeod",
    timestamp: "2026-04-18 16:31 CST",
    ipAddress: "198.51.100.51",
    beforeAfter: "Before: active customer account. After: suspended after fraud review approval.",
    severity: "danger",
  },
  {
    id: "AUD-487",
    actorId: "ADM-031",
    actorName: "Lina Sandhu",
    role: "compliance-admin",
    actionType: "Document review completed",
    entity: "USR-1002 / Insurance certificate",
    timestamp: "2026-04-18 09:14 CST",
    ipAddress: "198.51.100.61",
    beforeAfter: "Before: needs-review. After: expiry flagged and follow-up requested.",
    severity: "info",
  },
  {
    id: "AUD-474",
    actorId: "ADM-055",
    actorName: "Rhea Banerjee",
    role: "read-only-admin",
    actionType: "Audit export generated",
    entity: "Admin action log / weekly review",
    timestamp: "2026-04-17 17:58 CST",
    ipAddress: "198.51.100.88",
    beforeAfter: "Before: audit log only in console. After: weekly CSV export generated for compliance archive.",
    severity: "warning",
  },
];

export const permissionRows: PermissionRow[] = [
  {
    category: "dashboard",
    description: "Overview pages, alerts, and operational queue visibility.",
    levels: {
      "super-admin": "manage",
      "operations-admin": "manage",
      "finance-admin": "view",
      "compliance-admin": "view",
      "support-admin": "view",
      "read-only-admin": "view",
    },
  },
  {
    category: "users",
    description: "User directory, profile review, and account status actions.",
    levels: {
      "super-admin": "manage",
      "operations-admin": "manage",
      "finance-admin": "none",
      "compliance-admin": "manage",
      "support-admin": "manage",
      "read-only-admin": "view",
    },
  },
  {
    category: "bookings",
    description: "Booking oversight, assignment, and operational controls.",
    levels: {
      "super-admin": "manage",
      "operations-admin": "manage",
      "finance-admin": "view",
      "compliance-admin": "view",
      "support-admin": "manage",
      "read-only-admin": "view",
    },
  },
  {
    category: "finance",
    description: "Transactions, payouts, refunds, and commission data.",
    levels: {
      "super-admin": "manage",
      "operations-admin": "none",
      "finance-admin": "manage",
      "compliance-admin": "none",
      "support-admin": "none",
      "read-only-admin": "view",
    },
  },
  {
    category: "compliance",
    description: "Verification queues, document expiry, and review history.",
    levels: {
      "super-admin": "manage",
      "operations-admin": "view",
      "finance-admin": "none",
      "compliance-admin": "manage",
      "support-admin": "view",
      "read-only-admin": "view",
    },
  },
  {
    category: "disputes",
    description: "Case review, evidence, escalations, and decisions.",
    levels: {
      "super-admin": "manage",
      "operations-admin": "manage",
      "finance-admin": "view",
      "compliance-admin": "view",
      "support-admin": "manage",
      "read-only-admin": "view",
    },
  },
  {
    category: "reports",
    description: "Analytics dashboards, finance exports, and scheduled reports.",
    levels: {
      "super-admin": "manage",
      "operations-admin": "view",
      "finance-admin": "manage",
      "compliance-admin": "view",
      "support-admin": "view",
      "read-only-admin": "view",
    },
  },
  {
    category: "settings",
    description: "Platform-wide settings, templates, commission, and emergency controls.",
    levels: {
      "super-admin": "manage",
      "operations-admin": "none",
      "finance-admin": "none",
      "compliance-admin": "none",
      "support-admin": "none",
      "read-only-admin": "none",
    },
  },
  {
    category: "audit",
    description: "Admin action logs, export access, and internal access review.",
    levels: {
      "super-admin": "manage",
      "operations-admin": "view",
      "finance-admin": "view",
      "compliance-admin": "view",
      "support-admin": "view",
      "read-only-admin": "manage",
    },
  },
];

adminUsers.forEach((admin) => {
  admin.recentActions = adminAuditEntries.filter((entry) => entry.actorId === admin.id);
});

export const adminDirectoryMetrics = [
  { label: "Admin seats", value: "36", delta: "6 active roles", tone: "info" as const },
  { label: "Pending invites", value: "3", delta: "Need assignment review", tone: "warning" as const },
  { label: "Suspended admins", value: "1", delta: "Audit follow-up required", tone: "danger" as const },
  { label: "Role changes this week", value: "5", delta: "All logged", tone: "success" as const },
];

export const adminRoleOptions: AdminRole[] = [
  "super-admin",
  "operations-admin",
  "finance-admin",
  "compliance-admin",
  "support-admin",
  "read-only-admin",
];

export function getAdminUsers() {
  return adminUsers;
}

export function getAdminById(id: string) {
  return adminUsers.find((admin) => admin.id === id);
}

export function getPermissionLabel(level: PermissionLevel) {
  if (level === "manage") return "Manage";
  if (level === "view") return "View";
  return "None";
}

export function getPermissionTone(level: PermissionLevel) {
  if (level === "manage") return "success" as const;
  if (level === "view") return "info" as const;
  return "neutral" as const;
}

export function getRoleSummary(role: AdminRole) {
  return {
    label: adminRoleLabels[role],
    manageCount: permissionRows.filter((row) => row.levels[role] === "manage").length,
    viewCount: permissionRows.filter((row) => row.levels[role] === "view").length,
  };
}
