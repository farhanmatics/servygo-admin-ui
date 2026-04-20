import type { AdminRole } from "./admin-shell";

export type UserType = "customer" | "provider" | "franchise";
export type UserStatus = "active" | "pending-review" | "suspended" | "limited";
export type RiskLevel = "low" | "medium" | "high";

export type UserRecord = {
  city: string;
  createdAt: string;
  email: string;
  flags: string[];
  id: string;
  lastSeen: string;
  name: string;
  notes: string;
  phone: string;
  primaryService: string;
  province: string;
  signupStage: string;
  status: UserStatus;
  tags: string[];
  type: UserType;
};

export type UserActivityEvent = {
  action: string;
  actor: string;
  details: string;
  timestamp: string;
  tone: "info" | "warning" | "danger" | "success";
};

export type UserDocumentRecord = {
  expiry: string;
  name: string;
  note: string;
  requestedFor: string;
  status: "approved" | "needs-review" | "missing" | "expiring";
};

export type UserFinancialRecord = {
  amount: string;
  category: string;
  counterparty: string;
  id: string;
  note: string;
  status: "paid" | "pending" | "failed" | "under-review";
  when: string;
};

export type UserFinancialSummary = {
  disputeExposure: string;
  lastSettlement: string;
  lifetimeValue: string;
  outstandingBalance: string;
};

export type UserProfile = UserRecord & {
  activity: UserActivityEvent[];
  auditNote: string;
  documentTemplate: string[];
  documents: UserDocumentRecord[];
  financials: UserFinancialRecord[];
  financialSummary: UserFinancialSummary;
  internalOwner: string;
};

export const userTypeLabels: Record<UserType, string> = {
  customer: "Customer",
  provider: "Provider",
  franchise: "Franchise",
};

export const userStatusTone: Record<UserStatus, "success" | "warning" | "danger" | "info"> = {
  active: "success",
  "pending-review": "warning",
  suspended: "danger",
  limited: "info",
};

export const riskTone: Record<RiskLevel, "low" | "medium" | "high"> = {
  low: "low",
  medium: "medium",
  high: "high",
};

const userProfiles: UserProfile[] = [
  {
    id: "USR-1001",
    name: "Nadia Chowdhury",
    type: "customer",
    status: "active",
    email: "nadia.chowdhury@northgate.example",
    phone: "+1 (306) 555-0128",
    city: "Saskatoon",
    province: "SK",
    primaryService: "Recurring home cleaning",
    createdAt: "2026-01-18",
    lastSeen: "2026-04-20 11:04 CST",
    signupStage: "Complete",
    tags: ["VIP", "Card on file"],
    flags: ["One chargeback in prior 12 months"],
    notes:
      "High-retention customer with one resolved billing dispute. Keep service continuity clear before any account action.",
    internalOwner: "Support desk",
    auditNote: "Refund exceptions for this account require support lead approval.",
    documentTemplate: ["Photo ID if fraud review is triggered", "Business proof when switching to franchise billing"],
    documents: [
      {
        name: "Chargeback response packet",
        requestedFor: "Billing review",
        expiry: "Not applicable",
        status: "approved",
        note: "Stored as case evidence only.",
      },
    ],
    financialSummary: {
      lifetimeValue: "CAD 4,820",
      outstandingBalance: "CAD 0",
      lastSettlement: "2026-04-16",
      disputeExposure: "CAD 180 under review",
    },
    financials: [
      {
        id: "PAY-24061",
        category: "Customer payment",
        amount: "CAD 214.00",
        status: "paid",
        when: "2026-04-16",
        counterparty: "ServyGo checkout",
        note: "Commercial add-on applied.",
      },
      {
        id: "DSP-912",
        category: "Dispute reserve",
        amount: "CAD 180.00",
        status: "under-review",
        when: "2026-03-29",
        counterparty: "Support adjudication",
        note: "Partial refund decision pending customer confirmation.",
      },
    ],
    activity: [
      {
        timestamp: "2026-04-20 10:52 CST",
        action: "Booking updated",
        actor: "Operations Admin",
        details: "Recurring booking window adjusted from 1:00 PM to 2:00 PM.",
        tone: "info",
      },
      {
        timestamp: "2026-04-12 14:11 CST",
        action: "Refund reviewed",
        actor: "Support Admin",
        details: "Chargeback support packet attached to dispute case DSP-912.",
        tone: "warning",
      },
    ],
  },
  {
    id: "USR-1002",
    name: "Prairie Shine Co.",
    type: "provider",
    status: "pending-review",
    email: "ops@prairieshine.example",
    phone: "+1 (306) 555-0192",
    city: "Saskatoon",
    province: "SK",
    primaryService: "Office deep cleaning",
    createdAt: "2025-11-02",
    lastSeen: "2026-04-20 09:27 CST",
    signupStage: "Awaiting compliance review",
    tags: ["Commercial", "Weekly payout"],
    flags: ["Insurance expiry in 3 days", "Missing secondary reviewer note"],
    notes:
      "Provider remains operational but should not be approved for additional territories until insurance metadata is corrected.",
    internalOwner: "Compliance desk",
    auditNote: "Any suspension must document business-impact reason and affected future bookings.",
    documentTemplate: [
      "Government-issued ID",
      "Business registration",
      "Insurance certificate with expiry date",
      "Proof of address",
      "Banking details for weekly payout",
    ],
    documents: [
      {
        name: "Insurance certificate",
        requestedFor: "Provider onboarding",
        expiry: "2026-04-23",
        status: "expiring",
        note: "Expiry metadata present, but renewal upload pending.",
      },
      {
        name: "Business registration",
        requestedFor: "Provider onboarding",
        expiry: "2027-03-01",
        status: "approved",
        note: "Verified against Saskatchewan registry.",
      },
      {
        name: "Void cheque",
        requestedFor: "Weekly payout setup",
        expiry: "Not applicable",
        status: "needs-review",
        note: "Bank branch code mismatch with profile entry.",
      },
    ],
    financialSummary: {
      lifetimeValue: "CAD 12,480",
      outstandingBalance: "CAD 2,140 pending payout",
      lastSettlement: "2026-04-12",
      disputeExposure: "CAD 320 in open cases",
    },
    financials: [
      {
        id: "PAYOUT-771",
        category: "Provider payout",
        amount: "CAD 2,140.00",
        status: "pending",
        when: "2026-04-21",
        counterparty: "Finance weekly batch",
        note: "Held pending bank reference confirmation.",
      },
      {
        id: "PAY-24022",
        category: "Completed order earnings",
        amount: "CAD 860.00",
        status: "paid",
        when: "2026-04-12",
        counterparty: "Weekly payout batch",
        note: "Commission deducted before settlement.",
      },
    ],
    activity: [
      {
        timestamp: "2026-04-20 09:04 CST",
        action: "Document flagged",
        actor: "Compliance Admin",
        details: "Insurance expiry was marked high priority due to renewal timing.",
        tone: "warning",
      },
      {
        timestamp: "2026-04-18 17:30 CST",
        action: "Payout held",
        actor: "Finance Admin",
        details: "Batch paused until bank details are confirmed.",
        tone: "danger",
      },
      {
        timestamp: "2026-04-10 13:11 CST",
        action: "Territory coverage updated",
        actor: "Operations Admin",
        details: "Commercial service radius increased to include Martensville.",
        tone: "success",
      },
    ],
  },
  {
    id: "USR-1003",
    name: "Northline Franchise East",
    type: "franchise",
    status: "limited",
    email: "dispatch.east@northlinefranchise.example",
    phone: "+1 (204) 555-0144",
    city: "Winnipeg",
    province: "MB",
    primaryService: "Moving support",
    createdAt: "2025-09-07",
    lastSeen: "2026-04-20 08:42 CST",
    signupStage: "Active with restrictions",
    tags: ["Franchise", "Manual assignment watch"],
    flags: ["Two SLA breaches this week", "Escalated payout reconciliation"],
    notes:
      "Franchise remains live but dispatch permissions are limited while SLA remediation plan is tracked.",
    internalOwner: "Operations desk",
    auditNote: "Manual overrides need territory lead note until the SLA watch clears.",
    documentTemplate: [
      "Master franchise agreement",
      "Business license",
      "Insurance certificate",
      "Primary contact ID",
      "Branch banking verification",
    ],
    documents: [
      {
        name: "Franchise agreement",
        requestedFor: "Franchise activation",
        expiry: "2028-09-07",
        status: "approved",
        note: "Executed agreement on file.",
      },
      {
        name: "Branch insurance renewal",
        requestedFor: "Annual compliance",
        expiry: "2026-05-03",
        status: "needs-review",
        note: "Renewal uploaded, awaiting secondary compliance review.",
      },
    ],
    financialSummary: {
      lifetimeValue: "CAD 84,120",
      outstandingBalance: "CAD 4,680 pending release",
      lastSettlement: "2026-04-11",
      disputeExposure: "CAD 640 in active disputes",
    },
    financials: [
      {
        id: "PAYOUT-760",
        category: "Franchise payout",
        amount: "CAD 4,680.00",
        status: "under-review",
        when: "2026-04-18",
        counterparty: "Finance weekly batch",
        note: "Held for reconciliation after dispute reserve increase.",
      },
      {
        id: "DSP-901",
        category: "Dispute reserve",
        amount: "CAD 640.00",
        status: "under-review",
        when: "2026-04-14",
        counterparty: "Support adjudication",
        note: "Three open moving-support disputes tied to same territory.",
      },
    ],
    activity: [
      {
        timestamp: "2026-04-19 19:18 CST",
        action: "Restriction applied",
        actor: "Operations Admin",
        details: "Manual reassignment now required for priority bookings in East Winnipeg.",
        tone: "danger",
      },
      {
        timestamp: "2026-04-17 11:42 CST",
        action: "Compliance review started",
        actor: "Compliance Admin",
        details: "Insurance renewal submitted for secondary verification.",
        tone: "info",
      },
    ],
  },
  {
    id: "USR-1004",
    name: "Avery McLeod",
    type: "customer",
    status: "suspended",
    email: "avery.mcleod@example.ca",
    phone: "+1 (587) 555-0176",
    city: "Calgary",
    province: "AB",
    primaryService: "One-time move-out cleaning",
    createdAt: "2026-02-11",
    lastSeen: "2026-04-05 16:14 CST",
    signupStage: "Suspended",
    tags: ["Fraud watch"],
    flags: ["Repeated refund abuse", "Phone verification mismatch"],
    notes:
      "Account was suspended after repeated refund attempts and inconsistent verification details. Only support lead should reactivate.",
    internalOwner: "Support desk",
    auditNote: "Reactivation must capture reason and approver.",
    documentTemplate: ["Photo ID for reactivation", "Address proof if account appeal is granted"],
    documents: [
      {
        name: "Appeal ID upload",
        requestedFor: "Reactivation review",
        expiry: "Not applicable",
        status: "missing",
        note: "No appeal documents received yet.",
      },
    ],
    financialSummary: {
      lifetimeValue: "CAD 690",
      outstandingBalance: "CAD 0",
      lastSettlement: "2026-03-27",
      disputeExposure: "CAD 0",
    },
    financials: [
      {
        id: "REF-181",
        category: "Refund",
        amount: "CAD 95.00",
        status: "paid",
        when: "2026-03-27",
        counterparty: "Support resolution",
        note: "Final refund before suspension decision.",
      },
    ],
    activity: [
      {
        timestamp: "2026-04-05 16:14 CST",
        action: "Account suspended",
        actor: "Support Admin",
        details: "Suspended after repeated refund abuse review was approved.",
        tone: "danger",
      },
      {
        timestamp: "2026-04-03 09:28 CST",
        action: "Fraud flag raised",
        actor: "Risk monitor",
        details: "Phone verification mismatch matched prior abuse pattern.",
        tone: "warning",
      },
    ],
  },
  {
    id: "USR-1005",
    name: "Evergreen Facility Group",
    type: "provider",
    status: "active",
    email: "hello@evergreenfacility.example",
    phone: "+1 (780) 555-0161",
    city: "Edmonton",
    province: "AB",
    primaryService: "Commercial janitorial",
    createdAt: "2024-12-19",
    lastSeen: "2026-04-20 07:58 CST",
    signupStage: "Complete",
    tags: ["Enterprise", "Stable SLA"],
    flags: ["No active concerns"],
    notes:
      "Reliable enterprise provider. Safe benchmark record for onboarding comparisons and payout timing.",
    internalOwner: "Operations desk",
    auditNote: "No current restrictions.",
    documentTemplate: [
      "Business registration",
      "Insurance certificate",
      "Primary contact ID",
      "WHMIS certification",
      "Banking verification",
    ],
    documents: [
      {
        name: "Insurance certificate",
        requestedFor: "Annual compliance",
        expiry: "2026-10-19",
        status: "approved",
        note: "Verified and current.",
      },
      {
        name: "WHMIS certification",
        requestedFor: "Service qualification",
        expiry: "2027-02-11",
        status: "approved",
        note: "Provider meets commercial safety requirements.",
      },
    ],
    financialSummary: {
      lifetimeValue: "CAD 126,440",
      outstandingBalance: "CAD 1,260 pending payout",
      lastSettlement: "2026-04-19",
      disputeExposure: "CAD 0",
    },
    financials: [
      {
        id: "PAYOUT-775",
        category: "Provider payout",
        amount: "CAD 1,260.00",
        status: "pending",
        when: "2026-04-21",
        counterparty: "Weekly payout batch",
        note: "Normal weekly settlement.",
      },
      {
        id: "PAY-24074",
        category: "Completed order earnings",
        amount: "CAD 1,980.00",
        status: "paid",
        when: "2026-04-19",
        counterparty: "ServyGo settlement",
        note: "Includes overnight premium.",
      },
    ],
    activity: [
      {
        timestamp: "2026-04-19 20:44 CST",
        action: "Payout queued",
        actor: "Finance Admin",
        details: "Weekly payout approved for standard batch.",
        tone: "success",
      },
      {
        timestamp: "2026-04-16 12:06 CST",
        action: "Coverage expanded",
        actor: "Operations Admin",
        details: "Added Nisku industrial coverage after performance review.",
        tone: "info",
      },
    ],
  },
  {
    id: "USR-1006",
    name: "Leah Desjardins",
    type: "customer",
    status: "pending-review",
    email: "leah.desjardins@example.ca",
    phone: "+1 (204) 555-0180",
    city: "Winnipeg",
    province: "MB",
    primaryService: "Deep cleaning",
    createdAt: "2026-04-19",
    lastSeen: "2026-04-20 10:31 CST",
    signupStage: "Verification pending",
    tags: ["New signup"],
    flags: ["Email verification pending"],
    notes:
      "New customer account awaiting verification completion before promotional credits are released.",
    internalOwner: "Support desk",
    auditNote: "Do not manually credit until verification clears.",
    documentTemplate: ["Identity document only if fraud review is triggered"],
    documents: [
      {
        name: "Verification email confirmation",
        requestedFor: "Account activation",
        expiry: "2026-04-22",
        status: "needs-review",
        note: "Confirmation link requested again by user.",
      },
    ],
    financialSummary: {
      lifetimeValue: "CAD 0",
      outstandingBalance: "CAD 0",
      lastSettlement: "Not yet billed",
      disputeExposure: "CAD 0",
    },
    financials: [],
    activity: [
      {
        timestamp: "2026-04-20 10:31 CST",
        action: "Verification reminder sent",
        actor: "System",
        details: "Reminder email triggered after incomplete signup flow.",
        tone: "info",
      },
      {
        timestamp: "2026-04-19 17:02 CST",
        action: "Account created",
        actor: "System",
        details: "Customer signup captured for Winnipeg deep cleaning.",
        tone: "success",
      },
    ],
  },
];

export const userDirectoryMetrics = [
  { label: "Customers", value: "2,418", delta: "+42 this week", tone: "success" as const },
  { label: "Providers", value: "318", delta: "14 pending review", tone: "warning" as const },
  { label: "Franchises", value: "36", delta: "3 restricted", tone: "info" as const },
  { label: "Suspended accounts", value: "27", delta: "needs oversight", tone: "danger" as const },
];

export const userListAllowedRoles: AdminRole[] = [
  "super-admin",
  "operations-admin",
  "compliance-admin",
  "support-admin",
  "read-only-admin",
];

export function getUsers() {
  return userProfiles;
}

export function getUserById(id: string) {
  return userProfiles.find((profile) => profile.id === id);
}

export function getRiskLevel(user: UserRecord): RiskLevel {
  if (user.status === "suspended") return "high";
  if (user.flags.some((flag) => /expiry|refund|restriction|review/i.test(flag))) return "medium";
  return "low";
}

export function getTypeCount(type: UserType) {
  return userProfiles.filter((user) => user.type === type).length;
}
