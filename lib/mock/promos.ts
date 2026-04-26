import type { AdminRole } from "./admin-shell";
import type { StatusTone } from "./admin-shell";

export type PromoStatus = "active" | "scheduled" | "expired" | "paused" | "draft";
export type DiscountType = "percentage" | "fixed" | "free-service";
export type CampaignStatus = "draft" | "active" | "completed" | "cancelled";

export const promosAllowedRoles: AdminRole[] = ["super-admin", "operations-admin", "finance-admin", "read-only-admin"];

export const promoStatusTone: Record<PromoStatus, StatusTone> = {
  active: "success",
  scheduled: "info",
  expired: "neutral",
  paused: "warning",
  draft: "neutral",
};

export const campaignStatusTone: Record<CampaignStatus, StatusTone> = {
  active: "success",
  draft: "neutral",
  completed: "info",
  cancelled: "danger",
};

export type PromoCode = {
  id: string;
  code: string;
  description: string;
  discountType: DiscountType;
  discountValue: string;
  status: PromoStatus;
  usageLimit: number;
  usageCount: number;
  validFrom: string;
  validTo: string;
  applicableServices: string;
  applicableTerritories: string;
  createdBy: string;
  createdAt: string;
};

export type Campaign = {
  id: string;
  name: string;
  description: string;
  status: CampaignStatus;
  promoCodes: string[];
  budget: string;
  spent: string;
  targetAudience: string;
  startDate: string;
  endDate: string;
  conversions: number;
  createdBy: string;
};

export const mockPromoCodes: PromoCode[] = [
  {
    id: "PC-001",
    code: "SPRING20",
    description: "20% off cleaning services for spring season",
    discountType: "percentage",
    discountValue: "20%",
    status: "active",
    usageLimit: 500,
    usageCount: 183,
    validFrom: "2026-04-01",
    validTo: "2026-04-30",
    applicableServices: "Cleaning",
    applicableTerritories: "All",
    createdBy: "Super Admin",
    createdAt: "2026-03-25",
  },
  {
    id: "PC-002",
    code: "WELCOME15",
    description: "$15 off first booking for new customers",
    discountType: "fixed",
    discountValue: "$15",
    status: "active",
    usageLimit: 1000,
    usageCount: 412,
    validFrom: "2026-01-01",
    validTo: "2026-12-31",
    applicableServices: "All",
    applicableTerritories: "All",
    createdBy: "Super Admin",
    createdAt: "2025-12-20",
  },
  {
    id: "PC-003",
    code: "DETAILVAN",
    description: "15% off car detailing in Vancouver",
    discountType: "percentage",
    discountValue: "15%",
    status: "scheduled",
    usageLimit: 200,
    usageCount: 0,
    validFrom: "2026-05-01",
    validTo: "2026-05-31",
    applicableServices: "Car Detailing",
    applicableTerritories: "Vancouver Downtown",
    createdBy: "Operations Admin",
    createdAt: "2026-04-20",
  },
  {
    id: "PC-004",
    code: "ITLAUNCH",
    description: "Free IT consultation on first booking",
    discountType: "free-service",
    discountValue: "Free consult",
    status: "expired",
    usageLimit: 100,
    usageCount: 100,
    validFrom: "2026-01-01",
    validTo: "2026-02-28",
    applicableServices: "IT & E-commerce",
    applicableTerritories: "Vancouver Downtown",
    createdBy: "Super Admin",
    createdAt: "2025-12-15",
  },
  {
    id: "PC-005",
    code: "SUMMER10",
    description: "10% off all services June–August",
    discountType: "percentage",
    discountValue: "10%",
    status: "draft",
    usageLimit: 2000,
    usageCount: 0,
    validFrom: "2026-06-01",
    validTo: "2026-08-31",
    applicableServices: "All",
    applicableTerritories: "All",
    createdBy: "Operations Admin",
    createdAt: "2026-04-22",
  },
  {
    id: "PC-006",
    code: "CALGARYQ1",
    description: "$25 off commercial cleaning bookings",
    discountType: "fixed",
    discountValue: "$25",
    status: "paused",
    usageLimit: 300,
    usageCount: 87,
    validFrom: "2026-03-01",
    validTo: "2026-03-31",
    applicableServices: "Commercial Cleaning",
    applicableTerritories: "Calgary Southwest",
    createdBy: "Operations Admin",
    createdAt: "2026-02-20",
  },
];

export const mockCampaigns: Campaign[] = [
  {
    id: "CAM-001",
    name: "Spring 2026 Cleaning Drive",
    description: "Seasonal promotion to boost cleaning bookings across all territories in April.",
    status: "active",
    promoCodes: ["PC-001"],
    budget: "$5,000",
    spent: "$2,140",
    targetAudience: "Existing + new customers",
    startDate: "2026-04-01",
    endDate: "2026-04-30",
    conversions: 183,
    createdBy: "Super Admin",
  },
  {
    id: "CAM-002",
    name: "New User Acquisition 2026",
    description: "Year-round flat-discount offer for first-time platform users.",
    status: "active",
    promoCodes: ["PC-002"],
    budget: "$20,000",
    spent: "$6,180",
    targetAudience: "New customers only",
    startDate: "2026-01-01",
    endDate: "2026-12-31",
    conversions: 412,
    createdBy: "Super Admin",
  },
  {
    id: "CAM-003",
    name: "Vancouver IT Launch",
    description: "Targeted campaign to grow IT services vertical in Vancouver.",
    status: "completed",
    promoCodes: ["PC-004"],
    budget: "$3,000",
    spent: "$3,000",
    targetAudience: "SMBs in Vancouver",
    startDate: "2026-01-01",
    endDate: "2026-02-28",
    conversions: 100,
    createdBy: "Super Admin",
  },
  {
    id: "CAM-004",
    name: "Summer 2026 National",
    description: "Planned national promotion for peak season.",
    status: "draft",
    promoCodes: ["PC-005"],
    budget: "$15,000",
    spent: "$0",
    targetAudience: "All users",
    startDate: "2026-06-01",
    endDate: "2026-08-31",
    conversions: 0,
    createdBy: "Operations Admin",
  },
];

export function getPromoCodes() { return mockPromoCodes; }
export function getCampaigns() { return mockCampaigns; }
