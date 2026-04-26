import type { AdminRole } from "./admin-shell";

export type BookingStatus =
  | "scheduled"
  | "in-progress"
  | "completed"
  | "cancelled"
  | "reassignment-needed"
  | "sla-risk";

export type BookingPriority = "low" | "normal" | "high" | "critical";

export type BookingPaymentStatus = "authorized" | "captured" | "refunded" | "pending";

export type BookingRecord = {
  id: string;
  service: string;
  packageName: string;
  territory: string;
  city: string;
  customerName: string;
  customerId: string;
  providerName: string;
  providerId: string;
  franchise: string;
  status: BookingStatus;
  priority: BookingPriority;
  paymentStatus: BookingPaymentStatus;
  scheduledWindow: string;
  nextMilestone: string;
  slaState: string;
  amount: string;
  tags: string[];
};

export type BookingTimelineEvent = {
  actor: string;
  details: string;
  timestamp: string;
  tone: "info" | "warning" | "danger" | "success";
  title: string;
};

export type BookingParticipant = {
  contact: string;
  label: string;
  name: string;
};

export type BookingProfile = BookingRecord & {
  assignmentContext: string[];
  cancellationPolicies: string[];
  finance: {
    captureReference: string;
    disputeExposure: string;
    gross: string;
    net: string;
    payoutEstimate: string;
  };
  internalNotes: string;
  linkedRecords: {
    documents: string[];
    payouts: string[];
    reviews: string[];
  };
  participants: BookingParticipant[];
  reassignmentOptions: string[];
  timeline: BookingTimelineEvent[];
};

export const bookingStatusTone: Record<BookingStatus, "success" | "warning" | "danger" | "info"> = {
  scheduled: "info",
  "in-progress": "success",
  completed: "success",
  cancelled: "danger",
  "reassignment-needed": "warning",
  "sla-risk": "danger",
};

export const bookingPriorityTone: Record<BookingPriority, "neutral" | "warning" | "danger"> = {
  low: "neutral",
  normal: "neutral",
  high: "warning",
  critical: "danger",
};

export const bookingPaymentTone: Record<BookingPaymentStatus, "success" | "warning" | "danger" | "info"> = {
  authorized: "info",
  captured: "success",
  refunded: "warning",
  pending: "warning",
};

export const bookingAllowedRoles: AdminRole[] = [
  "super-admin",
  "operations-admin",
  "support-admin",
  "read-only-admin",
];

export const bookingDirectoryMetrics = [
  { label: "Open bookings", value: "324", delta: "Across active territories", tone: "info" as const },
  { label: "SLA risk", value: "17", delta: "Need intervention < 30 min", tone: "danger" as const },
  { label: "Reassignment queue", value: "9", delta: "Provider no-show or cancel", tone: "warning" as const },
  { label: "Today gross", value: "CAD 41,880", delta: "Captured and authorized", tone: "success" as const },
];

const bookings: BookingProfile[] = [
  {
    id: "BK-20491",
    service: "Cleaning",
    packageName: "Commercial Deep Cleaning",
    territory: "Central Saskatchewan",
    city: "Saskatoon, SK",
    customerName: "Northline Office Park",
    customerId: "USR-CORP-9921",
    providerName: "Prairie Shine Co.",
    providerId: "PRV-0199",
    franchise: "Prairie Operations",
    status: "sla-risk",
    priority: "critical",
    paymentStatus: "authorized",
    scheduledWindow: "Today 14:00 - 17:00",
    nextMilestone: "Arrival overdue by 18 min",
    slaState: "Breach in 12 minutes",
    amount: "CAD 489",
    tags: ["Enterprise", "Escalated", "SLA watch"],
    assignmentContext: [
      "Primary worker cancelled 27 minutes before slot.",
      "Backup worker accepted but has not checked in.",
      "Customer requested same-day completion due to tenant turnover.",
    ],
    cancellationPolicies: [
      "Customer-side cancellation fee waived for provider failure.",
      "Escalation to operations lead required before marking no-show.",
    ],
    finance: {
      captureReference: "pi_3NQ7K6AX...",
      disputeExposure: "Low until completion confirmation",
      gross: "CAD 489",
      net: "CAD 420",
      payoutEstimate: "CAD 338",
    },
    internalNotes:
      "High-visibility commercial account. Keep every operator action logged with reason and ETA updates.",
    linkedRecords: {
      documents: ["DOC-12931", "DOC-13112"],
      payouts: ["PO-8821"],
      reviews: ["REV-3391"],
    },
    participants: [
      { label: "Customer contact", name: "Shannon Li", contact: "shannon@northline.ca" },
      { label: "Provider lead", name: "Adeel Khan", contact: "+1 (639) 555-0132" },
      { label: "Ops owner", name: "Mina Rousseau", contact: "ops.desk@servygo.ca" },
    ],
    reassignmentOptions: [
      "Switch to Mint Home Care (ETA +35 min)",
      "Split crew between Prairie Shine + Evergreen Facility",
      "Offer after-hours completion with discount note",
    ],
    timeline: [
      {
        timestamp: "Today 13:31",
        actor: "Dispatch Engine",
        title: "Primary assignment accepted",
        details: "Provider worker `WRK-8812` accepted initial dispatch.",
        tone: "info",
      },
      {
        timestamp: "Today 13:37",
        actor: "Provider app",
        title: "Worker cancellation",
        details: "Assigned worker cancelled due to vehicle breakdown.",
        tone: "warning",
      },
      {
        timestamp: "Today 13:42",
        actor: "Operations Admin",
        title: "Backup dispatched",
        details: "Backup team notified and marked en route.",
        tone: "info",
      },
      {
        timestamp: "Today 14:18",
        actor: "Live Ops Monitor",
        title: "SLA risk triggered",
        details: "Arrival still pending. Booking entered SLA risk state.",
        tone: "danger",
      },
    ],
  },
  {
    id: "BK-20483",
    service: "Car Detailing",
    packageName: "Fleet Detailing",
    territory: "Regina Metro",
    city: "Regina, SK",
    customerName: "WestGrid Leasing",
    customerId: "USR-CORP-8712",
    providerName: "ShineHaus Auto",
    providerId: "PRV-0430",
    franchise: "Regina Core",
    status: "in-progress",
    priority: "normal",
    paymentStatus: "captured",
    scheduledWindow: "Today 11:30 - 13:30",
    nextMilestone: "Final quality check",
    slaState: "On time",
    amount: "CAD 329",
    tags: ["Fleet", "Recurring"],
    assignmentContext: ["Stable recurring account.", "No dispatch risk flags this week."],
    cancellationPolicies: ["Standard provider policy applies."],
    finance: {
      captureReference: "pi_3NQ2ZF2L...",
      disputeExposure: "Low",
      gross: "CAD 329",
      net: "CAD 289",
      payoutEstimate: "CAD 232",
    },
    internalNotes: "Good candidate for benchmarking dispatch health.",
    linkedRecords: { documents: ["DOC-12089"], payouts: ["PO-8792"], reviews: ["REV-3288"] },
    participants: [
      { label: "Customer contact", name: "Keith Morgan", contact: "keith@westgrid.ca" },
      { label: "Provider lead", name: "Lara Singh", contact: "+1 (306) 555-0182" },
    ],
    reassignmentOptions: ["No reassignment needed"],
    timeline: [
      {
        timestamp: "Today 11:11",
        actor: "Dispatch Engine",
        title: "Assignment accepted",
        details: "Provider accepted in first offer round.",
        tone: "success",
      },
      {
        timestamp: "Today 11:34",
        actor: "Provider app",
        title: "Job started",
        details: "Crew checked in on site and started workflow.",
        tone: "success",
      },
    ],
  },
  {
    id: "BK-20464",
    service: "Logistic",
    packageName: "Moving Support",
    territory: "Southern Alberta",
    city: "Calgary, AB",
    customerName: "Beacon Relocation",
    customerId: "USR-CORP-6451",
    providerName: "Northline Logistics",
    providerId: "PRV-1001",
    franchise: "Calgary South",
    status: "reassignment-needed",
    priority: "high",
    paymentStatus: "authorized",
    scheduledWindow: "Today 16:00 - 19:00",
    nextMilestone: "Provider confirmation pending",
    slaState: "At risk in 45 minutes",
    amount: "CAD 549",
    tags: ["Manual assignment", "Support escalation"],
    assignmentContext: [
      "Original provider requested reassignment due to staffing.",
      "Customer cannot move date because building elevator slot is fixed.",
    ],
    cancellationPolicies: ["Ops lead approval needed before cancelling same-day enterprise jobs."],
    finance: {
      captureReference: "pi_3NQ31B6Q...",
      disputeExposure: "Medium",
      gross: "CAD 549",
      net: "CAD 471",
      payoutEstimate: "CAD 386",
    },
    internalNotes: "Use reassignment flow and preserve operator rationale.",
    linkedRecords: { documents: ["DOC-11129"], payouts: ["PO-8711"], reviews: [] },
    participants: [
      { label: "Customer contact", name: "Elena Park", contact: "elena@beaconrelocation.ca" },
      { label: "Ops owner", name: "Darren Ho", contact: "calgary.ops@servygo.ca" },
    ],
    reassignmentOptions: [
      "Assign Rocky Movers backup team",
      "Split heavy-load segment to alternate provider",
      "Move start by 90 minutes with customer approval",
    ],
    timeline: [
      {
        timestamp: "Today 12:05",
        actor: "Provider portal",
        title: "Reassignment requested",
        details: "Provider flagged staffing shortage for original slot.",
        tone: "warning",
      },
      {
        timestamp: "Today 12:22",
        actor: "Support Admin",
        title: "Customer informed",
        details: "Customer notified that reassignment is underway.",
        tone: "info",
      },
    ],
  },
  {
    id: "BK-20451",
    service: "Cleaning",
    packageName: "Office Weekly Clean",
    territory: "Northern Alberta",
    city: "Edmonton, AB",
    customerName: "Everline Retail",
    customerId: "USR-CORP-3121",
    providerName: "Evergreen Facility Group",
    providerId: "PRV-2033",
    franchise: "Edmonton Central",
    status: "scheduled",
    priority: "normal",
    paymentStatus: "captured",
    scheduledWindow: "Tomorrow 08:00 - 10:30",
    nextMilestone: "Crew check-in",
    slaState: "Healthy",
    amount: "CAD 279",
    tags: ["Recurring", "Low risk"],
    assignmentContext: ["Standing recurring assignment with same crew."],
    cancellationPolicies: ["24-hour customer cancellation policy active."],
    finance: {
      captureReference: "pi_3NQ1WX8D...",
      disputeExposure: "Low",
      gross: "CAD 279",
      net: "CAD 245",
      payoutEstimate: "CAD 196",
    },
    internalNotes: "No manual action required unless customer requests changes.",
    linkedRecords: { documents: ["DOC-10112"], payouts: ["PO-8610"], reviews: ["REV-3011"] },
    participants: [{ label: "Customer contact", name: "Mark Davies", contact: "mark@everline.ca" }],
    reassignmentOptions: ["No reassignment needed"],
    timeline: [
      {
        timestamp: "Today 09:10",
        actor: "Dispatch Engine",
        title: "Scheduled",
        details: "Booking created from recurring template.",
        tone: "success",
      },
    ],
  },
  {
    id: "BK-20438",
    service: "Sanitization",
    packageName: "Medical Surface Sanitization",
    territory: "Manitoba",
    city: "Winnipeg, MB",
    customerName: "Maplewell Medical",
    customerId: "USR-CORP-9022",
    providerName: "SteriCare North",
    providerId: "PRV-8762",
    franchise: "Winnipeg North",
    status: "scheduled",
    priority: "high",
    paymentStatus: "pending",
    scheduledWindow: "Today 19:00 - 21:00",
    nextMilestone: "Compliance credential double-check",
    slaState: "Watching docs refresh",
    amount: "CAD 612",
    tags: ["Compliance-sensitive", "Healthcare"],
    assignmentContext: [
      "Provider has pending insurance metadata refresh.",
      "Compliance desk requested pre-start doc check.",
    ],
    cancellationPolicies: ["Compliance hold can pause booking without cancellation penalty."],
    finance: {
      captureReference: "pi_3NQ0SJAQ...",
      disputeExposure: "Medium",
      gross: "CAD 612",
      net: "CAD 520",
      payoutEstimate: "CAD 426",
    },
    internalNotes: "Keep compliance updates visible in timeline.",
    linkedRecords: { documents: ["DOC-13911", "DOC-13915"], payouts: [], reviews: [] },
    participants: [
      { label: "Compliance owner", name: "Nadia Sheikh", contact: "compliance@servygo.ca" },
      { label: "Customer contact", name: "Rina Patel", contact: "rina@maplewell.ca" },
    ],
    reassignmentOptions: ["Escalate to backup medical-clean provider if docs remain blocked"],
    timeline: [
      {
        timestamp: "Today 10:45",
        actor: "Compliance Admin",
        title: "Credential review started",
        details: "Insurance metadata audit started before job window.",
        tone: "warning",
      },
    ],
  },
  {
    id: "BK-20388",
    service: "Cleaning",
    packageName: "Apartment Deep Clean",
    territory: "Central Saskatchewan",
    city: "Saskatoon, SK",
    customerName: "Maya Thompson",
    customerId: "USR-9911",
    providerName: "Mint Home Care",
    providerId: "PRV-0077",
    franchise: "Prairie Operations",
    status: "completed",
    priority: "low",
    paymentStatus: "captured",
    scheduledWindow: "Yesterday 12:30 - 15:30",
    nextMilestone: "Post-service review",
    slaState: "Completed",
    amount: "CAD 189",
    tags: ["Completed"],
    assignmentContext: ["Smooth completion without escalation."],
    cancellationPolicies: ["Not applicable - completed."],
    finance: {
      captureReference: "pi_3NPz5K00...",
      disputeExposure: "Low",
      gross: "CAD 189",
      net: "CAD 162",
      payoutEstimate: "CAD 129",
    },
    internalNotes: "Use as example benchmark for completed flow.",
    linkedRecords: { documents: [], payouts: ["PO-8559"], reviews: ["REV-2991"] },
    participants: [{ label: "Customer", name: "Maya Thompson", contact: "maya.t@email.ca" }],
    reassignmentOptions: ["Not applicable"],
    timeline: [
      {
        timestamp: "Yesterday 12:33",
        actor: "Provider app",
        title: "Job started",
        details: "Crew checked in and started service.",
        tone: "success",
      },
      {
        timestamp: "Yesterday 15:20",
        actor: "Provider app",
        title: "Job completed",
        details: "Completion photos uploaded and customer notified.",
        tone: "success",
      },
    ],
  },
];

export function getBookings() {
  return bookings;
}

export function getBookingById(id: string) {
  return bookings.find((booking) => booking.id === id);
}
