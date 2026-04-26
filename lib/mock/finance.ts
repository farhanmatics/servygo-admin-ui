import type { AdminRole } from "./admin-shell";

export type TransactionStatus = "captured" | "authorized" | "refunded" | "failed" | "pending-review";
export type PayoutStatus = "queued" | "approved" | "processing" | "paid" | "blocked";

export type TransactionRecord = {
  amount: string;
  bookingId: string;
  customer: string;
  id: string;
  provider: string;
  status: TransactionStatus;
  territory: string;
  timestamp: string;
  type: "booking-charge" | "refund" | "adjustment";
};

export type TransactionProfile = TransactionRecord & {
  auditNotes: string[];
  feeBreakdown: { label: string; value: string }[];
  reference: string;
};

export type PayoutRecord = {
  amount: string;
  id: string;
  provider: string;
  schedule: string;
  status: PayoutStatus;
  territory: string;
  volume: string;
};

export type PayoutProfile = PayoutRecord & {
  blockers: string[];
  lineItems: { bookingId: string; net: string; service: string }[];
  settlementReference: string;
};

export const financeAllowedRoles: AdminRole[] = ["super-admin", "finance-admin", "read-only-admin"];

export const financeMetrics = [
  { label: "Captured today", value: "CAD 41,880", delta: "Gross platform intake", tone: "success" as const },
  { label: "Refund exposure", value: "CAD 8,420", delta: "Pending decisions", tone: "warning" as const },
  { label: "Payout queue", value: "91", delta: "Weekly disbursement cycle", tone: "info" as const },
  { label: "Blocked settlements", value: "7", delta: "Need manual review", tone: "danger" as const },
];

export const transactionStatusTone: Record<TransactionStatus, "success" | "warning" | "danger" | "info"> = {
  captured: "success",
  authorized: "info",
  refunded: "warning",
  failed: "danger",
  "pending-review": "warning",
};

export const payoutStatusTone: Record<PayoutStatus, "success" | "warning" | "danger" | "info"> = {
  queued: "info",
  approved: "success",
  processing: "info",
  paid: "success",
  blocked: "danger",
};

const transactions: TransactionProfile[] = [
  {
    id: "TX-99812",
    bookingId: "BK-20491",
    customer: "Northline Office Park",
    provider: "Prairie Shine Co.",
    amount: "CAD 489",
    status: "authorized",
    type: "booking-charge",
    territory: "Central Saskatchewan",
    timestamp: "Today 13:59",
    reference: "pi_3NQ7K6AX...",
    feeBreakdown: [
      { label: "Gross", value: "CAD 489" },
      { label: "Platform commission", value: "CAD 73" },
      { label: "Processor fee", value: "CAD 9" },
      { label: "Provider net", value: "CAD 407" },
    ],
    auditNotes: [
      "Authorization held while SLA incident is active.",
      "Capture proceeds automatically after completion confirmation.",
    ],
  },
  {
    id: "TX-99775",
    bookingId: "BK-20483",
    customer: "WestGrid Leasing",
    provider: "ShineHaus Auto",
    amount: "CAD 329",
    status: "captured",
    type: "booking-charge",
    territory: "Regina Metro",
    timestamp: "Today 11:36",
    reference: "pi_3NQ2ZF2L...",
    feeBreakdown: [
      { label: "Gross", value: "CAD 329" },
      { label: "Platform commission", value: "CAD 49" },
      { label: "Processor fee", value: "CAD 6" },
      { label: "Provider net", value: "CAD 274" },
    ],
    auditNotes: ["Settled in normal flow."],
  },
  {
    id: "TX-99698",
    bookingId: "BK-20318",
    customer: "Elmwood Dental",
    provider: "Evergreen Facility Group",
    amount: "CAD 220",
    status: "refunded",
    type: "refund",
    territory: "Northern Alberta",
    timestamp: "Yesterday 16:14",
    reference: "re_3NPk31AQ...",
    feeBreakdown: [
      { label: "Original charge", value: "CAD 220" },
      { label: "Refund amount", value: "CAD 220" },
      { label: "Provider clawback", value: "CAD 170" },
      { label: "Platform cost", value: "CAD 50" },
    ],
    auditNotes: ["Refund approved after verified missed-service evidence."],
  },
];

const payouts: PayoutProfile[] = [
  {
    id: "PO-8821",
    provider: "Prairie Shine Co.",
    territory: "Central Saskatchewan",
    amount: "CAD 12,490",
    volume: "38 bookings",
    schedule: "Week 17, Friday",
    status: "blocked",
    settlementReference: "tr_8849A0...",
    blockers: ["Bank account holder name mismatch", "Secondary verification pending"],
    lineItems: [
      { bookingId: "BK-20491", service: "Commercial Deep Cleaning", net: "CAD 407" },
      { bookingId: "BK-20432", service: "Apartment Deep Clean", net: "CAD 182" },
      { bookingId: "BK-20411", service: "Office Weekly Clean", net: "CAD 231" },
    ],
  },
  {
    id: "PO-8792",
    provider: "ShineHaus Auto",
    territory: "Regina Metro",
    amount: "CAD 8,210",
    volume: "29 bookings",
    schedule: "Week 17, Friday",
    status: "approved",
    settlementReference: "tr_8722NQ...",
    blockers: [],
    lineItems: [
      { bookingId: "BK-20483", service: "Fleet Detailing", net: "CAD 274" },
      { bookingId: "BK-20461", service: "Basic Wash", net: "CAD 89" },
    ],
  },
  {
    id: "PO-8711",
    provider: "Northline Logistics",
    territory: "Southern Alberta",
    amount: "CAD 15,930",
    volume: "44 bookings",
    schedule: "Week 17, Friday",
    status: "processing",
    settlementReference: "tr_8620PP...",
    blockers: [],
    lineItems: [
      { bookingId: "BK-20464", service: "Moving Support", net: "CAD 386" },
      { bookingId: "BK-20450", service: "Van Delivery Run", net: "CAD 121" },
    ],
  },
];

export function getTransactions() {
  return transactions;
}

export function getTransactionById(id: string) {
  return transactions.find((transaction) => transaction.id === id);
}

export function getPayouts() {
  return payouts;
}

export function getPayoutById(id: string) {
  return payouts.find((payout) => payout.id === id);
}
