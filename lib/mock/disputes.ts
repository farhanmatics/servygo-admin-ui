import type { AdminRole } from "./admin-shell";

export type DisputeStatus = "open" | "investigating" | "awaiting-response" | "resolved" | "escalated";
export type DisputePriority = "low" | "normal" | "high" | "critical";

export type DisputeRecord = {
  bookingId: string;
  createdAt: string;
  customer: string;
  id: string;
  priority: DisputePriority;
  provider: string;
  reason: string;
  status: DisputeStatus;
  territory: string;
};

export type DisputeProfile = DisputeRecord & {
  evidence: string[];
  internalNotes: string[];
  outcomeOptions: string[];
  timeline: {
    actor: string;
    details: string;
    timestamp: string;
    tone: "info" | "warning" | "danger" | "success";
    title: string;
  }[];
};

export const disputeAllowedRoles: AdminRole[] = ["super-admin", "operations-admin", "support-admin", "read-only-admin"];

export const disputeStatusTone: Record<DisputeStatus, "success" | "warning" | "danger" | "info"> = {
  open: "info",
  investigating: "warning",
  "awaiting-response": "warning",
  resolved: "success",
  escalated: "danger",
};

export const disputePriorityTone: Record<DisputePriority, "neutral" | "warning" | "danger"> = {
  low: "neutral",
  normal: "neutral",
  high: "warning",
  critical: "danger",
};

export const disputeMetrics = [
  { label: "Open disputes", value: "18", delta: "Across all territories", tone: "warning" as const },
  { label: "Critical disputes", value: "5", delta: "Need same-day decisions", tone: "danger" as const },
  { label: "Avg resolution time", value: "31h", delta: "Trailing 7 days", tone: "info" as const },
  { label: "Resolved this week", value: "42", delta: "With audit notes complete", tone: "success" as const },
];

const disputes: DisputeProfile[] = [
  {
    id: "DSP-5512",
    bookingId: "BK-20491",
    customer: "Northline Office Park",
    provider: "Prairie Shine Co.",
    territory: "Central Saskatchewan",
    reason: "Incomplete service scope delivered",
    status: "investigating",
    priority: "critical",
    createdAt: "Today 14:22",
    evidence: ["Completion photos (5)", "Customer floor plan annotations", "Provider check-in logs"],
    internalNotes: [
      "Enterprise customer escalation; keep communications tightly documented.",
      "Support lead requested operator rationale before any partial refund decision.",
    ],
    outcomeOptions: ["Full refund", "Partial refund (35%)", "Re-service within 24h", "Reject claim with evidence summary"],
    timeline: [
      {
        timestamp: "Today 14:22",
        actor: "Customer portal",
        title: "Dispute submitted",
        details: "Customer flagged missed areas and uploaded annotated photos.",
        tone: "warning",
      },
      {
        timestamp: "Today 14:33",
        actor: "Support Admin",
        title: "Case triaged",
        details: "Set to critical due to enterprise account and SLA impact.",
        tone: "danger",
      },
    ],
  },
  {
    id: "DSP-5498",
    bookingId: "BK-20464",
    customer: "Beacon Relocation",
    provider: "Northline Logistics",
    territory: "Southern Alberta",
    reason: "Crew arrived late and job exceeded quoted duration",
    status: "awaiting-response",
    priority: "high",
    createdAt: "Today 12:09",
    evidence: ["Arrival telemetry", "Customer chat excerpts", "Dispatch reassignment log"],
    internalNotes: ["Waiting on provider incident report before final decision."],
    outcomeOptions: ["Partial refund (20%)", "Provider penalty + goodwill credit", "Reject claim"],
    timeline: [
      {
        timestamp: "Today 12:09",
        actor: "Support queue",
        title: "Dispute opened",
        details: "Case linked to reassignment event and delay telemetry.",
        tone: "warning",
      },
    ],
  },
  {
    id: "DSP-5477",
    bookingId: "BK-20318",
    customer: "Elmwood Dental",
    provider: "Evergreen Facility Group",
    territory: "Northern Alberta",
    reason: "Missed sanitization checklist step",
    status: "resolved",
    priority: "normal",
    createdAt: "Yesterday 10:41",
    evidence: ["Checklist export", "Audit response note"],
    internalNotes: ["Resolved with full refund and retraining note."],
    outcomeOptions: ["Resolved"],
    timeline: [
      {
        timestamp: "Yesterday 11:03",
        actor: "Compliance Admin",
        title: "Evidence verified",
        details: "Checklist mismatch confirmed against contract template.",
        tone: "info",
      },
      {
        timestamp: "Yesterday 12:11",
        actor: "Finance Admin",
        title: "Refund issued",
        details: "Full refund approved and settlement log attached.",
        tone: "success",
      },
    ],
  },
];

export function getDisputes() {
  return disputes;
}

export function getDisputeById(id: string) {
  return disputes.find((dispute) => dispute.id === id);
}
