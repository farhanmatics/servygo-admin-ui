import type { AdminRole } from "./admin-shell";

export type ModerationStatus = "pending-review" | "flagged" | "approved" | "removed";
export type FraudRisk = "low" | "medium" | "high" | "critical";

export type ReviewRecord = {
  bookingId: string;
  customer: string;
  id: string;
  provider: string;
  rating: number;
  risk: FraudRisk;
  snippet: string;
  status: ModerationStatus;
  territory: string;
};

export type ReviewProfile = ReviewRecord & {
  evidence: string[];
  moderationNotes: string[];
  timeline: {
    actor: string;
    details: string;
    timestamp: string;
    tone: "info" | "warning" | "danger" | "success";
    title: string;
  }[];
};

export const reviewAllowedRoles: AdminRole[] = ["super-admin", "support-admin", "read-only-admin"];

export const moderationStatusTone: Record<ModerationStatus, "success" | "warning" | "danger" | "info"> = {
  "pending-review": "warning",
  flagged: "danger",
  approved: "success",
  removed: "info",
};

export const riskTone: Record<FraudRisk, "neutral" | "warning" | "danger"> = {
  low: "neutral",
  medium: "warning",
  high: "danger",
  critical: "danger",
};

export const reviewMetrics = [
  { label: "Pending moderation", value: "26", delta: "Awaiting support review", tone: "warning" as const },
  { label: "Fraud-high signals", value: "8", delta: "Need same-day triage", tone: "danger" as const },
  { label: "Approved today", value: "41", delta: "With moderation notes", tone: "success" as const },
  { label: "Archived reviews", value: "132", delta: "Removed or hidden outcomes", tone: "info" as const },
];

const reviews: ReviewProfile[] = [
  {
    id: "REV-9001",
    bookingId: "BK-20491",
    customer: "Northline Office Park",
    provider: "Prairie Shine Co.",
    territory: "Central Saskatchewan",
    rating: 1,
    status: "flagged",
    risk: "high",
    snippet: "Crew arrived late and skipped priority areas despite confirmation.",
    evidence: ["Job timeline logs", "Customer-uploaded photos", "Dispatch reassignment note"],
    moderationNotes: [
      "Linked to active dispute DSP-5512.",
      "Keep hidden until dispute resolution is finalized.",
    ],
    timeline: [
      {
        timestamp: "Today 14:41",
        actor: "Risk rules",
        title: "Auto-flagged",
        details: "Detected overlap with open dispute and negative sentiment spike.",
        tone: "warning",
      },
    ],
  },
  {
    id: "REV-8990",
    bookingId: "BK-20483",
    customer: "WestGrid Leasing",
    provider: "ShineHaus Auto",
    territory: "Regina Metro",
    rating: 5,
    status: "pending-review",
    risk: "medium",
    snippet: "Amazing crew, fast turnaround and spotless results.",
    evidence: ["Completed booking proof", "Device fingerprint summary"],
    moderationNotes: ["Pattern check requested due to clustered five-star sequence."],
    timeline: [
      {
        timestamp: "Today 12:11",
        actor: "Support queue",
        title: "Queued for moderation",
        details: "High-volume positive burst requires quick fraud pass.",
        tone: "info",
      },
    ],
  },
  {
    id: "REV-8972",
    bookingId: "BK-20318",
    customer: "Elmwood Dental",
    provider: "Evergreen Facility Group",
    territory: "Northern Alberta",
    rating: 2,
    status: "removed",
    risk: "critical",
    snippet: "This review text repeated across multiple unrelated provider profiles.",
    evidence: ["Duplicate content report", "Device overlap trace"],
    moderationNotes: ["Removed due to coordinated manipulation pattern."],
    timeline: [
      {
        timestamp: "Yesterday 10:50",
        actor: "Support Admin",
        title: "Removed",
        details: "Content removed and account risk flagged for further checks.",
        tone: "danger",
      },
    ],
  },
];

export function getReviews() {
  return reviews;
}

export function getReviewById(id: string) {
  return reviews.find((review) => review.id === id);
}
