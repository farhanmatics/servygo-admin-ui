import type { AdminRole } from "./admin-shell";
import type { StatusTone } from "./admin-shell";

export const platformConfigAllowedRoles: AdminRole[] = ["super-admin", "read-only-admin"];

// --- CMS / Dynamic Content ---

export type ContentStatus = "published" | "draft" | "archived";
export type ContentType = "faq" | "help-article" | "announcement" | "banner" | "legal-snippet";

export const contentStatusTone: Record<ContentStatus, StatusTone> = {
  published: "success",
  draft: "neutral",
  archived: "neutral",
};

export type ContentItem = {
  id: string;
  title: string;
  type: ContentType;
  status: ContentStatus;
  audience: "customer" | "provider" | "franchise" | "all";
  updatedAt: string;
  updatedBy: string;
  body: string;
};

export const mockContentItems: ContentItem[] = [
  {
    id: "CMS-001",
    title: "How Bookings Work",
    type: "help-article",
    status: "published",
    audience: "customer",
    updatedAt: "2026-04-10",
    updatedBy: "Super Admin",
    body: "Step-by-step guide explaining how customers discover, book, and pay for services on ServyGo.",
  },
  {
    id: "CMS-002",
    title: "Provider Verification Requirements",
    type: "help-article",
    status: "published",
    audience: "provider",
    updatedAt: "2026-03-20",
    updatedBy: "Compliance Admin",
    body: "Documents and steps required for providers to become verified on the ServyGo platform.",
  },
  {
    id: "CMS-003",
    title: "Platform Maintenance — Apr 28 02:00–04:00 UTC",
    type: "announcement",
    status: "published",
    audience: "all",
    updatedAt: "2026-04-25",
    updatedBy: "Super Admin",
    body: "Scheduled maintenance window. Platform may be intermittently unavailable.",
  },
  {
    id: "CMS-004",
    title: "Spring Cleaning FAQ",
    type: "faq",
    status: "draft",
    audience: "customer",
    updatedAt: "2026-04-22",
    updatedBy: "Operations Admin",
    body: "Frequently asked questions about spring cleaning packages and add-ons.",
  },
  {
    id: "CMS-005",
    title: "ServyGo Homepage Hero — May Campaign",
    type: "banner",
    status: "draft",
    audience: "customer",
    updatedAt: "2026-04-24",
    updatedBy: "Super Admin",
    body: "Promotional banner copy for May 2026 homepage hero section.",
  },
  {
    id: "CMS-006",
    title: "PIPEDA Notice for Data Collection",
    type: "legal-snippet",
    status: "published",
    audience: "all",
    updatedAt: "2026-01-15",
    updatedBy: "Compliance Admin",
    body: "Mandatory PIPEDA disclosure shown at registration and booking confirmation steps.",
  },
  {
    id: "CMS-007",
    title: "Franchise Territory Guide",
    type: "help-article",
    status: "archived",
    audience: "franchise",
    updatedAt: "2025-11-01",
    updatedBy: "Super Admin",
    body: "Older guide for franchise operators — superseded by updated onboarding materials.",
  },
];

// --- Advertisement Slots ---

export type AdStatus = "active" | "scheduled" | "ended" | "paused";
export type AdPlacement =
  | "customer-home-banner"
  | "customer-search-sidebar"
  | "customer-booking-confirm"
  | "provider-app-dashboard"
  | "franchise-portal-header";

export const adStatusTone: Record<AdStatus, StatusTone> = {
  active: "success",
  scheduled: "info",
  ended: "neutral",
  paused: "warning",
};

export type AdSlot = {
  id: string;
  title: string;
  placement: AdPlacement;
  advertiser: string;
  status: AdStatus;
  impressions: number;
  clicks: number;
  startDate: string;
  endDate: string;
  imageUrl: string;
  targetAudience: string;
};

export const mockAdSlots: AdSlot[] = [
  {
    id: "AD-001",
    title: "Spring Cleaning Promotion",
    placement: "customer-home-banner",
    advertiser: "Internal — ServyGo Marketing",
    status: "active",
    impressions: 14200,
    clicks: 842,
    startDate: "2026-04-01",
    endDate: "2026-04-30",
    imageUrl: "/mock-ads/spring-cleaning.png",
    targetAudience: "All customers",
  },
  {
    id: "AD-002",
    title: "IT Services — Vancouver Launch",
    placement: "customer-search-sidebar",
    advertiser: "VanTech Solutions",
    status: "ended",
    impressions: 8900,
    clicks: 410,
    startDate: "2026-01-01",
    endDate: "2026-02-28",
    imageUrl: "/mock-ads/vantech.png",
    targetAudience: "Vancouver customers",
  },
  {
    id: "AD-003",
    title: "Provider — Sign Up Today",
    placement: "provider-app-dashboard",
    advertiser: "Internal — ServyGo Growth",
    status: "active",
    impressions: 3200,
    clicks: 188,
    startDate: "2026-03-01",
    endDate: "2026-06-30",
    imageUrl: "/mock-ads/provider-signup.png",
    targetAudience: "Unverified providers",
  },
  {
    id: "AD-004",
    title: "Summer Deals — Coming Soon",
    placement: "customer-booking-confirm",
    advertiser: "Internal — ServyGo Marketing",
    status: "scheduled",
    impressions: 0,
    clicks: 0,
    startDate: "2026-06-01",
    endDate: "2026-08-31",
    imageUrl: "/mock-ads/summer-deals.png",
    targetAudience: "All customers",
  },
  {
    id: "AD-005",
    title: "Franchise Expansion Opportunity",
    placement: "franchise-portal-header",
    advertiser: "Internal — ServyGo Franchise",
    status: "paused",
    impressions: 620,
    clicks: 42,
    startDate: "2026-02-01",
    endDate: "2026-05-31",
    imageUrl: "/mock-ads/franchise.png",
    targetAudience: "Franchise operators",
  },
];

// --- Email & SMS Channel Configuration ---

export type ChannelType = "email" | "sms";

export type ChannelConfig = {
  id: string;
  channel: ChannelType;
  provider: string;
  fromAddress: string;
  displayName: string;
  status: "connected" | "degraded" | "disconnected";
  dailyLimit: number;
  sentToday: number;
  lastCheckedAt: string;
  notes: string;
};

export const channelStatusTone: Record<ChannelConfig["status"], StatusTone> = {
  connected: "success",
  degraded: "warning",
  disconnected: "danger",
};

export const mockChannelConfigs: ChannelConfig[] = [
  {
    id: "CHAN-001",
    channel: "email",
    provider: "SendGrid",
    fromAddress: "noreply@servygo.ca",
    displayName: "ServyGo",
    status: "connected",
    dailyLimit: 50000,
    sentToday: 3412,
    lastCheckedAt: "2026-04-27T00:00:00Z",
    notes: "Primary transactional email channel. Used for booking confirmations, OTP, receipts.",
  },
  {
    id: "CHAN-002",
    channel: "email",
    provider: "AWS SES",
    fromAddress: "alerts@servygo.ca",
    displayName: "ServyGo Alerts",
    status: "connected",
    dailyLimit: 100000,
    sentToday: 890,
    lastCheckedAt: "2026-04-27T00:00:00Z",
    notes: "Backup email channel and operational alert delivery.",
  },
  {
    id: "CHAN-003",
    channel: "sms",
    provider: "Twilio",
    fromAddress: "+1 (306) 555-0100",
    displayName: "ServyGo",
    status: "connected",
    dailyLimit: 10000,
    sentToday: 214,
    lastCheckedAt: "2026-04-27T00:00:00Z",
    notes: "OTP delivery, booking reminders, and provider dispatch notifications.",
  },
  {
    id: "CHAN-004",
    channel: "sms",
    provider: "AWS SNS",
    fromAddress: "+1 (306) 555-0101",
    displayName: "ServyGo Alerts",
    status: "degraded",
    dailyLimit: 5000,
    sentToday: 18,
    lastCheckedAt: "2026-04-26T18:00:00Z",
    notes: "Backup SMS channel. Delivery success rate below threshold — under investigation.",
  },
];

// --- Fraud Detection Rules ---

export type FraudRuleTarget = "customer" | "provider" | "worker";
export type FraudRuleStatus = "enabled" | "disabled" | "monitoring";

export const fraudRuleStatusTone: Record<FraudRuleStatus, StatusTone> = {
  enabled: "success",
  disabled: "neutral",
  monitoring: "warning",
};

export type FraudRule = {
  id: string;
  name: string;
  description: string;
  target: FraudRuleTarget;
  status: FraudRuleStatus;
  threshold: string;
  action: "flag-for-review" | "notify-admin" | "auto-suspend";
  triggeredCount: number;
  lastTriggeredAt: string | null;
  updatedBy: string;
  updatedAt: string;
};

export const mockFraudRules: FraudRule[] = [
  {
    id: "FR-001",
    name: "Abnormal Customer Cancellation Rate",
    description: "Flag customers who cancel more than 5 bookings in a 30-day period.",
    target: "customer",
    status: "enabled",
    threshold: "5 cancellations / 30 days",
    action: "flag-for-review",
    triggeredCount: 12,
    lastTriggeredAt: "2026-04-22T10:14:00Z",
    updatedBy: "Super Admin",
    updatedAt: "2026-02-01",
  },
  {
    id: "FR-002",
    name: "Repeated Refund Requests",
    description: "Flag customers who request refunds on more than 3 bookings in a 60-day window.",
    target: "customer",
    status: "enabled",
    threshold: "3 refunds / 60 days",
    action: "flag-for-review",
    triggeredCount: 7,
    lastTriggeredAt: "2026-04-18T14:30:00Z",
    updatedBy: "Super Admin",
    updatedAt: "2026-02-01",
  },
  {
    id: "FR-003",
    name: "Review Manipulation Detection",
    description: "Flag reviews submitted without a linked completed booking.",
    target: "customer",
    status: "enabled",
    threshold: "Any review without completed booking",
    action: "flag-for-review",
    triggeredCount: 34,
    lastTriggeredAt: "2026-04-25T09:02:00Z",
    updatedBy: "Compliance Admin",
    updatedAt: "2026-03-10",
  },
  {
    id: "FR-004",
    name: "Provider GPS Inconsistency",
    description: "Flag jobs where provider GPS data contradicts job completion timestamp.",
    target: "provider",
    status: "monitoring",
    threshold: "GPS delta > 5 km at completion",
    action: "notify-admin",
    triggeredCount: 4,
    lastTriggeredAt: "2026-04-20T16:45:00Z",
    updatedBy: "Operations Admin",
    updatedAt: "2026-03-15",
  },
  {
    id: "FR-005",
    name: "Abnormal Provider Cancellation Rate",
    description: "Flag providers with more than 4 cancellations in a 14-day period.",
    target: "provider",
    status: "enabled",
    threshold: "4 cancellations / 14 days",
    action: "notify-admin",
    triggeredCount: 8,
    lastTriggeredAt: "2026-04-23T11:20:00Z",
    updatedBy: "Operations Admin",
    updatedAt: "2026-02-15",
  },
  {
    id: "FR-006",
    name: "Repeated Dispute Triggers",
    description: "Flag providers with more than 3 customer-filed disputes in 30 days.",
    target: "provider",
    status: "enabled",
    threshold: "3 disputes / 30 days",
    action: "flag-for-review",
    triggeredCount: 3,
    lastTriggeredAt: "2026-04-15T08:10:00Z",
    updatedBy: "Support Admin",
    updatedAt: "2026-03-01",
  },
  {
    id: "FR-007",
    name: "Worker GPS Deviation",
    description: "Flag workers whose tracked GPS deviates from assigned job address by more than 3 km.",
    target: "worker",
    status: "monitoring",
    threshold: "GPS deviation > 3 km",
    action: "notify-admin",
    triggeredCount: 2,
    lastTriggeredAt: "2026-04-19T13:55:00Z",
    updatedBy: "Operations Admin",
    updatedAt: "2026-04-01",
  },
  {
    id: "FR-008",
    name: "Suspicious Bidding Pattern",
    description: "Flag providers whose bids on identical jobs vary by more than 40% within the same day.",
    target: "provider",
    status: "disabled",
    threshold: "Bid variance > 40% same-day same-category",
    action: "flag-for-review",
    triggeredCount: 0,
    lastTriggeredAt: null,
    updatedBy: "Super Admin",
    updatedAt: "2026-01-20",
  },
];

// --- Signup Form Templates ---

export type UserTypeDomain = "customer" | "provider-individual" | "provider-company" | "worker" | "franchise";
export type FieldType = "text" | "email" | "phone" | "select" | "file" | "checkbox" | "date";

export type FormField = {
  id: string;
  label: string;
  fieldType: FieldType;
  required: boolean;
  placeholder?: string;
  options?: string[];
  helpText?: string;
};

export type SignupFormTemplate = {
  id: string;
  name: string;
  userType: UserTypeDomain;
  serviceCategory?: string;
  version: string;
  updatedAt: string;
  updatedBy: string;
  fields: FormField[];
};

export const mockFormTemplates: SignupFormTemplate[] = [
  {
    id: "SFT-001",
    name: "Customer Registration",
    userType: "customer",
    version: "1.2",
    updatedAt: "2026-03-10",
    updatedBy: "Super Admin",
    fields: [
      { id: "f1", label: "Full Name", fieldType: "text", required: true, placeholder: "Jane Doe" },
      { id: "f2", label: "Email Address", fieldType: "email", required: true, placeholder: "jane@example.com" },
      { id: "f3", label: "Phone Number", fieldType: "phone", required: true, placeholder: "+1 (306) 555-0100" },
      { id: "f4", label: "City", fieldType: "text", required: true, placeholder: "Saskatoon" },
      { id: "f5", label: "Province", fieldType: "select", required: true, options: ["AB", "BC", "MB", "ON", "SK"] },
      { id: "f6", label: "Accept Terms & Privacy Policy", fieldType: "checkbox", required: true },
    ],
  },
  {
    id: "SFT-002",
    name: "Individual Provider Registration",
    userType: "provider-individual",
    version: "1.4",
    updatedAt: "2026-04-05",
    updatedBy: "Compliance Admin",
    fields: [
      { id: "f1", label: "Full Name", fieldType: "text", required: true, placeholder: "John Smith" },
      { id: "f2", label: "Email Address", fieldType: "email", required: true },
      { id: "f3", label: "Phone Number", fieldType: "phone", required: true },
      { id: "f4", label: "Service Category", fieldType: "select", required: true, options: ["Cleaning", "Car Detailing", "Logistics", "IT & E-commerce", "Printing", "Janitorial Training"] },
      { id: "f5", label: "City / Territory", fieldType: "text", required: true },
      { id: "f6", label: "Government-issued ID (upload)", fieldType: "file", required: true, helpText: "Accepted: JPEG, PNG, PDF. Max 5 MB." },
      { id: "f7", label: "Liability Insurance Certificate", fieldType: "file", required: true },
      { id: "f8", label: "Insurance Expiry Date", fieldType: "date", required: true },
      { id: "f9", label: "Accept Terms & Privacy Policy", fieldType: "checkbox", required: true },
    ],
  },
  {
    id: "SFT-003",
    name: "Company Provider Registration",
    userType: "provider-company",
    version: "1.3",
    updatedAt: "2026-04-05",
    updatedBy: "Compliance Admin",
    fields: [
      { id: "f1", label: "Company Legal Name", fieldType: "text", required: true },
      { id: "f2", label: "Business Email", fieldType: "email", required: true },
      { id: "f3", label: "Business Phone", fieldType: "phone", required: true },
      { id: "f4", label: "Service Categories", fieldType: "select", required: true, options: ["Cleaning", "Car Detailing", "Logistics", "IT & E-commerce", "Printing", "Janitorial Training"] },
      { id: "f5", label: "Business Registration Number", fieldType: "text", required: true },
      { id: "f6", label: "Business Registration Certificate (upload)", fieldType: "file", required: true },
      { id: "f7", label: "Commercial Liability Insurance (upload)", fieldType: "file", required: true },
      { id: "f8", label: "Insurance Expiry Date", fieldType: "date", required: true },
      { id: "f9", label: "HST/GST Number", fieldType: "text", required: false, helpText: "Optional for sole proprietors." },
      { id: "f10", label: "Accept Terms & Privacy Policy", fieldType: "checkbox", required: true },
    ],
  },
  {
    id: "SFT-004",
    name: "Franchise Operator Registration",
    userType: "franchise",
    version: "1.1",
    updatedAt: "2026-02-20",
    updatedBy: "Super Admin",
    fields: [
      { id: "f1", label: "Franchise Owner Full Name", fieldType: "text", required: true },
      { id: "f2", label: "Business Email", fieldType: "email", required: true },
      { id: "f3", label: "Business Phone", fieldType: "phone", required: true },
      { id: "f4", label: "Territory / City Applying For", fieldType: "text", required: true },
      { id: "f5", label: "Province", fieldType: "select", required: true, options: ["AB", "BC", "MB", "ON", "SK"] },
      { id: "f6", label: "Business Registration Certificate (upload)", fieldType: "file", required: true },
      { id: "f7", label: "Franchise Agreement (signed, upload)", fieldType: "file", required: true },
      { id: "f8", label: "Liability Insurance (upload)", fieldType: "file", required: true },
      { id: "f9", label: "Accept Franchise Terms & Privacy Policy", fieldType: "checkbox", required: true },
    ],
  },
];

export function getContentItems() { return mockContentItems; }
export function getAdSlots() { return mockAdSlots; }
export function getChannelConfigs() { return mockChannelConfigs; }
export function getFraudRules() { return mockFraudRules; }
export function getFormTemplates() { return mockFormTemplates; }
