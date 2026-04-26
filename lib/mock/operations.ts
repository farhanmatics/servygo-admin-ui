import type { AdminRole } from "./admin-shell";

export type OpsSeverity = "info" | "warning" | "danger" | "success";

export type LiveJob = {
  bookingId: string;
  city: string;
  customer: string;
  eta: string;
  priority: "normal" | "high" | "critical";
  provider: string;
  service: string;
  status: "en-route" | "in-progress" | "delayed" | "reassignment-needed" | "sla-risk";
  territory: string;
};

export type TerritoryCard = {
  activeJobs: string;
  alertCount: string;
  backlog: string;
  health: "healthy" | "watch" | "critical";
  lead: string;
  name: string;
  notes: string[];
};

export type SlaIncident = {
  age: string;
  assignedDesk: string;
  breachAt: string;
  bookingId: string;
  customer: string;
  reason: string;
  territory: string;
};

export type EmergencyControl = {
  description: string;
  id: string;
  label: string;
  tone: OpsSeverity;
};

export const opsAllowedRoles: AdminRole[] = ["super-admin", "operations-admin", "read-only-admin"];

export const liveOpsMetrics = [
  { label: "Active jobs", value: "186", delta: "Across 6 territories", tone: "info" as const },
  { label: "Delayed jobs", value: "21", delta: "Require intervention", tone: "warning" as const },
  { label: "SLA breach risk", value: "8", delta: "Under 20 min", tone: "danger" as const },
  { label: "Reassignment queue", value: "11", delta: "No-show or cancellation", tone: "warning" as const },
];

export const liveJobs: LiveJob[] = [
  {
    bookingId: "BK-20491",
    customer: "Northline Office Park",
    provider: "Prairie Shine Co.",
    service: "Commercial Deep Cleaning",
    territory: "Central Saskatchewan",
    city: "Saskatoon",
    status: "sla-risk",
    eta: "18 min late",
    priority: "critical",
  },
  {
    bookingId: "BK-20483",
    customer: "WestGrid Leasing",
    provider: "ShineHaus Auto",
    service: "Fleet Detailing",
    territory: "Regina Metro",
    city: "Regina",
    status: "in-progress",
    eta: "On time",
    priority: "normal",
  },
  {
    bookingId: "BK-20464",
    customer: "Beacon Relocation",
    provider: "Northline Logistics",
    service: "Moving Support",
    territory: "Southern Alberta",
    city: "Calgary",
    status: "reassignment-needed",
    eta: "Replacement pending",
    priority: "high",
  },
  {
    bookingId: "BK-20438",
    customer: "Maplewell Medical",
    provider: "SteriCare North",
    service: "Medical Sanitization",
    territory: "Manitoba",
    city: "Winnipeg",
    status: "delayed",
    eta: "14 min late",
    priority: "high",
  },
  {
    bookingId: "BK-20431",
    customer: "Beacon Towers",
    provider: "Evergreen Facility Group",
    service: "Office Weekly Clean",
    territory: "Northern Alberta",
    city: "Edmonton",
    status: "en-route",
    eta: "Arriving in 9 min",
    priority: "normal",
  },
];

export const territoryCards: TerritoryCard[] = [
  {
    name: "Central Saskatchewan",
    lead: "Mina Rousseau",
    activeJobs: "42",
    backlog: "8 queued",
    alertCount: "4",
    health: "watch",
    notes: ["Two provider shifts started late.", "One enterprise cleaning window at SLA edge."],
  },
  {
    name: "Southern Alberta",
    lead: "Darren Ho",
    activeJobs: "36",
    backlog: "11 queued",
    alertCount: "6",
    health: "critical",
    notes: ["Moving support coverage thin for evening slots.", "Reassignment queue above threshold."],
  },
  {
    name: "Regina Metro",
    lead: "Alicia Coleman",
    activeJobs: "27",
    backlog: "5 queued",
    alertCount: "2",
    health: "healthy",
    notes: ["Stable turnaround across detailing and cleaning.", "No current SLA incidents."],
  },
  {
    name: "Manitoba",
    lead: "Lina Sandhu",
    activeJobs: "19",
    backlog: "7 queued",
    alertCount: "3",
    health: "watch",
    notes: ["Credential checks slowing healthcare jobs.", "One paused provider pool still under review."],
  },
];

export const slaIncidents: SlaIncident[] = [
  {
    bookingId: "BK-20491",
    customer: "Northline Office Park",
    territory: "Central Saskatchewan",
    reason: "Backup crew still not on-site after cancellation.",
    age: "31 min",
    breachAt: "12 min",
    assignedDesk: "Operations desk",
  },
  {
    bookingId: "BK-20464",
    customer: "Beacon Relocation",
    territory: "Southern Alberta",
    reason: "Original provider released assignment for staffing gap.",
    age: "47 min",
    breachAt: "45 min",
    assignedDesk: "Support + Ops",
  },
  {
    bookingId: "BK-20438",
    customer: "Maplewell Medical",
    territory: "Manitoba",
    reason: "Compliance metadata review delayed dispatch.",
    age: "21 min",
    breachAt: "29 min",
    assignedDesk: "Compliance desk",
  },
];

export const emergencyControls: EmergencyControl[] = [
  {
    id: "pause-territory",
    label: "Pause Territory Intake",
    description: "Temporarily stop new booking intake for a selected territory.",
    tone: "warning",
  },
  {
    id: "freeze-provider",
    label: "Freeze Provider Dispatch",
    description: "Prevent assignments to a provider while incident review is active.",
    tone: "danger",
  },
  {
    id: "raise-banner",
    label: "Publish Service Banner",
    description: "Show platform-wide delay or maintenance notice to customers.",
    tone: "info",
  },
  {
    id: "resume-operations",
    label: "Resume Normal Operations",
    description: "Clear emergency controls after lead approval and note capture.",
    tone: "success",
  },
];

export const liveJobStatusTone: Record<LiveJob["status"], OpsSeverity> = {
  "en-route": "info",
  "in-progress": "success",
  delayed: "warning",
  "reassignment-needed": "warning",
  "sla-risk": "danger",
};

export const priorityTone: Record<LiveJob["priority"], "neutral" | "warning" | "danger"> = {
  normal: "neutral",
  high: "warning",
  critical: "danger",
};

export const territoryHealthTone: Record<TerritoryCard["health"], OpsSeverity> = {
  healthy: "success",
  watch: "warning",
  critical: "danger",
};
