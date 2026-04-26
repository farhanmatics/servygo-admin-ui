import type { AdminRole } from "./admin-shell";
import type { StatusTone } from "./admin-shell";

export type TerritoryStatus = "active" | "onboarding" | "paused" | "suspended";
export type FranchisePayoutStatus = "queued" | "approved" | "processing" | "paid" | "blocked";
export type PromotionStatus = "pending-approval" | "approved" | "live" | "rejected" | "expired";
export type DocumentStatus = "pending" | "approved" | "rejected" | "expired";

export const franchiseAllowedRoles: AdminRole[] = [
  "super-admin",
  "operations-admin",
  "finance-admin",
  "read-only-admin",
];

export const territoryStatusTone: Record<TerritoryStatus, StatusTone> = {
  active: "success",
  onboarding: "info",
  paused: "warning",
  suspended: "danger",
};

export const franchisePayoutStatusTone: Record<FranchisePayoutStatus, StatusTone> = {
  queued: "neutral",
  approved: "info",
  processing: "warning",
  paid: "success",
  blocked: "danger",
};

export const promotionStatusTone: Record<PromotionStatus, StatusTone> = {
  "pending-approval": "warning",
  approved: "info",
  live: "success",
  rejected: "danger",
  expired: "neutral",
};

export const docStatusTone: Record<DocumentStatus, StatusTone> = {
  pending: "warning",
  approved: "success",
  rejected: "danger",
  expired: "danger",
};

export type TerritoryRecord = {
  id: string;
  name: string;
  city: string;
  province: string;
  operator: string;
  operatorEmail: string;
  status: TerritoryStatus;
  activeProviders: number;
  activeJobs: number;
  monthlyRevenue: string;
  commissionRate: string;
  slaCompliance: string;
  cancellationRate: string;
  createdAt: string;
};

export type TerritoryProfile = TerritoryRecord & {
  staffCount: number;
  pendingDocuments: number;
  openDisputes: number;
  pendingPromotions: number;
  geoBoundary: string;
  operatingHours: string;
  description: string;
  platformCommission: string;
  franchiseCommission: string;
  providerShare: string;
};

export type FranchiseStaff = {
  id: string;
  name: string;
  email: string;
  role: "franchise-admin" | "franchise-staff";
  joinedAt: string;
  lastActive: string;
};

export type FranchiseProvider = {
  id: string;
  name: string;
  type: "individual" | "company";
  services: string;
  status: "active" | "suspended" | "pending";
  jobsCompleted: number;
  rating: string;
  joinedAt: string;
};

export type FranchiseDocument = {
  id: string;
  title: string;
  type: "business-registration" | "insurance" | "agreement" | "tax-filing";
  status: DocumentStatus;
  uploadedAt: string;
  expiresAt: string | null;
  reviewedBy: string | null;
};

export type FranchisePayout = {
  id: string;
  franchiseId: string;
  franchiseName: string;
  territory: string;
  amount: string;
  period: string;
  status: FranchisePayoutStatus;
  scheduledAt: string;
  commissionRate: string;
};

export type FranchisePayoutProfile = FranchisePayout & {
  lineItems: { label: string; amount: string }[];
  settlementRef: string;
  auditNotes: string[];
};

export type TerritoryPromotion = {
  id: string;
  title: string;
  description: string;
  discountType: "percentage" | "fixed";
  discountValue: string;
  status: PromotionStatus;
  createdBy: string;
  createdAt: string;
  validFrom: string;
  validTo: string;
  approvedBy: string | null;
};

export type TerritoryMetricPoint = {
  month: string;
  revenue: string;
  bookings: number;
  rating: string;
};

export const mockTerritories: TerritoryRecord[] = [
  {
    id: "FRN-001",
    name: "Saskatoon Central",
    city: "Saskatoon",
    province: "SK",
    operator: "Marcus Nkomo",
    operatorEmail: "marcus.nkomo@servygo.ca",
    status: "active",
    activeProviders: 34,
    activeJobs: 12,
    monthlyRevenue: "$18,420",
    commissionRate: "8%",
    slaCompliance: "94%",
    cancellationRate: "3.2%",
    createdAt: "2025-01-10",
  },
  {
    id: "FRN-002",
    name: "Calgary Southwest",
    city: "Calgary",
    province: "AB",
    operator: "Priya Desai",
    operatorEmail: "priya.desai@servygo.ca",
    status: "active",
    activeProviders: 52,
    activeJobs: 21,
    monthlyRevenue: "$31,750",
    commissionRate: "8%",
    slaCompliance: "91%",
    cancellationRate: "4.1%",
    createdAt: "2024-11-05",
  },
  {
    id: "FRN-003",
    name: "Edmonton North",
    city: "Edmonton",
    province: "AB",
    operator: "James Thibodeau",
    operatorEmail: "james.thibodeau@servygo.ca",
    status: "onboarding",
    activeProviders: 8,
    activeJobs: 3,
    monthlyRevenue: "$4,100",
    commissionRate: "7%",
    slaCompliance: "88%",
    cancellationRate: "5.8%",
    createdAt: "2026-02-20",
  },
  {
    id: "FRN-004",
    name: "Winnipeg Metro",
    city: "Winnipeg",
    province: "MB",
    operator: "Aisha Salim",
    operatorEmail: "aisha.salim@servygo.ca",
    status: "paused",
    activeProviders: 17,
    activeJobs: 0,
    monthlyRevenue: "$0",
    commissionRate: "8%",
    slaCompliance: "82%",
    cancellationRate: "9.4%",
    createdAt: "2024-09-15",
  },
  {
    id: "FRN-005",
    name: "Vancouver Downtown",
    city: "Vancouver",
    province: "BC",
    operator: "Leon Hartfield",
    operatorEmail: "leon.hartfield@servygo.ca",
    status: "active",
    activeProviders: 71,
    activeJobs: 38,
    monthlyRevenue: "$54,900",
    commissionRate: "9%",
    slaCompliance: "96%",
    cancellationRate: "2.1%",
    createdAt: "2024-07-01",
  },
];

export const mockTerritoryProfiles: Record<string, TerritoryProfile> = {
  "FRN-001": {
    ...mockTerritories[0]!,
    staffCount: 4,
    pendingDocuments: 2,
    openDisputes: 3,
    pendingPromotions: 1,
    geoBoundary: "Saskatoon urban core + 15 km radius",
    operatingHours: "Mon–Sat 07:00–21:00 CST",
    description: "First territory to reach break-even. Strong cleaning and car-detailing vertical.",
    platformCommission: "15%",
    franchiseCommission: "8%",
    providerShare: "77%",
  },
  "FRN-002": {
    ...mockTerritories[1]!,
    staffCount: 6,
    pendingDocuments: 5,
    openDisputes: 7,
    pendingPromotions: 2,
    geoBoundary: "SW Calgary quadrant bounded by Stoney Trail and Glenmore",
    operatingHours: "Mon–Sun 06:00–22:00 MST",
    description: "Fastest-growing territory. High demand for logistics and commercial cleaning.",
    platformCommission: "15%",
    franchiseCommission: "8%",
    providerShare: "77%",
  },
  "FRN-003": {
    ...mockTerritories[2]!,
    staffCount: 2,
    pendingDocuments: 7,
    openDisputes: 1,
    pendingPromotions: 0,
    geoBoundary: "North Edmonton bounded by Yellowhead Trail and Henday",
    operatingHours: "Mon–Fri 08:00–20:00 MST",
    description: "Onboarding phase. Provider recruitment is the primary blocker.",
    platformCommission: "15%",
    franchiseCommission: "7%",
    providerShare: "78%",
  },
  "FRN-004": {
    ...mockTerritories[3]!,
    staffCount: 3,
    pendingDocuments: 4,
    openDisputes: 2,
    pendingPromotions: 0,
    geoBoundary: "Winnipeg Metro full city boundary",
    operatingHours: "Mon–Sat 08:00–20:00 CST",
    description: "Paused due to high cancellation rate. Under operations review.",
    platformCommission: "15%",
    franchiseCommission: "8%",
    providerShare: "77%",
  },
  "FRN-005": {
    ...mockTerritories[4]!,
    staffCount: 9,
    pendingDocuments: 1,
    openDisputes: 4,
    pendingPromotions: 3,
    geoBoundary: "Downtown Vancouver + False Creek + Kitsilano",
    operatingHours: "Mon–Sun 07:00–22:00 PST",
    description: "Top-performing territory by revenue. IT & e-commerce vertical is the growth driver.",
    platformCommission: "15%",
    franchiseCommission: "9%",
    providerShare: "76%",
  },
};

export const mockFranchiseStaff: Record<string, FranchiseStaff[]> = {
  "FRN-001": [
    { id: "FS-001", name: "Marcus Nkomo", email: "marcus.nkomo@servygo.ca", role: "franchise-admin", joinedAt: "2025-01-10", lastActive: "2026-04-26" },
    { id: "FS-002", name: "Dana Osei", email: "dana.osei@servygo.ca", role: "franchise-staff", joinedAt: "2025-03-15", lastActive: "2026-04-25" },
    { id: "FS-003", name: "Terry Blanc", email: "terry.blanc@servygo.ca", role: "franchise-staff", joinedAt: "2025-06-01", lastActive: "2026-04-20" },
  ],
  "FRN-002": [
    { id: "FS-011", name: "Priya Desai", email: "priya.desai@servygo.ca", role: "franchise-admin", joinedAt: "2024-11-05", lastActive: "2026-04-26" },
    { id: "FS-012", name: "Mike Chen", email: "mike.chen@servygo.ca", role: "franchise-staff", joinedAt: "2025-01-20", lastActive: "2026-04-26" },
    { id: "FS-013", name: "Fatima Alou", email: "fatima.alou@servygo.ca", role: "franchise-staff", joinedAt: "2025-04-12", lastActive: "2026-04-24" },
  ],
  "FRN-005": [
    { id: "FS-051", name: "Leon Hartfield", email: "leon.hartfield@servygo.ca", role: "franchise-admin", joinedAt: "2024-07-01", lastActive: "2026-04-26" },
    { id: "FS-052", name: "Chloe Park", email: "chloe.park@servygo.ca", role: "franchise-staff", joinedAt: "2024-08-15", lastActive: "2026-04-26" },
  ],
};

export const mockFranchiseProviders: Record<string, FranchiseProvider[]> = {
  "FRN-001": [
    { id: "PRV-101", name: "CleanPro SK Ltd.", type: "company", services: "Cleaning, Janitorial", status: "active", jobsCompleted: 412, rating: "4.8", joinedAt: "2025-02-10" },
    { id: "PRV-102", name: "Ahmed Sharif", type: "individual", services: "Car Detailing", status: "active", jobsCompleted: 88, rating: "4.6", joinedAt: "2025-04-20" },
    { id: "PRV-103", name: "Speedy Move Inc.", type: "company", services: "Logistics", status: "suspended", jobsCompleted: 54, rating: "3.9", joinedAt: "2025-05-01" },
  ],
  "FRN-002": [
    { id: "PRV-201", name: "AB Clean Squad", type: "company", services: "Cleaning, Commercial", status: "active", jobsCompleted: 897, rating: "4.9", joinedAt: "2024-12-01" },
    { id: "PRV-202", name: "Carlos Mendez", type: "individual", services: "IT Support", status: "active", jobsCompleted: 123, rating: "4.7", joinedAt: "2025-01-18" },
    { id: "PRV-203", name: "Quantum Logistics AB", type: "company", services: "Logistics", status: "pending", jobsCompleted: 0, rating: "N/A", joinedAt: "2026-04-15" },
  ],
  "FRN-005": [
    { id: "PRV-501", name: "VanTech Solutions", type: "company", services: "IT & E-commerce", status: "active", jobsCompleted: 1240, rating: "4.9", joinedAt: "2024-07-15" },
    { id: "PRV-502", name: "Pacific Clean Co.", type: "company", services: "Cleaning, Janitorial", status: "active", jobsCompleted: 890, rating: "4.8", joinedAt: "2024-08-01" },
  ],
};

export const mockFranchiseDocs: Record<string, FranchiseDocument[]> = {
  "FRN-001": [
    { id: "DOC-F01", title: "Business Registration (SK)", type: "business-registration", status: "approved", uploadedAt: "2025-01-10", expiresAt: null, reviewedBy: "Compliance Admin" },
    { id: "DOC-F02", title: "Liability Insurance 2026", type: "insurance", status: "pending", uploadedAt: "2026-04-01", expiresAt: "2026-12-31", reviewedBy: null },
    { id: "DOC-F03", title: "Franchise Agreement v2", type: "agreement", status: "approved", uploadedAt: "2025-01-10", expiresAt: null, reviewedBy: "Super Admin" },
  ],
  "FRN-002": [
    { id: "DOC-F11", title: "Business Registration (AB)", type: "business-registration", status: "approved", uploadedAt: "2024-11-05", expiresAt: null, reviewedBy: "Compliance Admin" },
    { id: "DOC-F12", title: "Commercial Insurance 2026", type: "insurance", status: "approved", uploadedAt: "2026-01-15", expiresAt: "2026-12-31", reviewedBy: "Compliance Admin" },
  ],
};

export const mockFranchisePayouts: FranchisePayout[] = [
  { id: "FPO-001", franchiseId: "FRN-001", franchiseName: "Saskatoon Central", territory: "Saskatoon, SK", amount: "$1,473.60", period: "Apr 2026", status: "queued", scheduledAt: "2026-04-30", commissionRate: "8%" },
  { id: "FPO-002", franchiseId: "FRN-002", franchiseName: "Calgary Southwest", territory: "Calgary, AB", amount: "$2,540.00", period: "Apr 2026", status: "approved", scheduledAt: "2026-04-30", commissionRate: "8%" },
  { id: "FPO-003", franchiseId: "FRN-005", franchiseName: "Vancouver Downtown", territory: "Vancouver, BC", amount: "$4,941.00", period: "Apr 2026", status: "processing", scheduledAt: "2026-04-28", commissionRate: "9%" },
  { id: "FPO-004", franchiseId: "FRN-001", franchiseName: "Saskatoon Central", territory: "Saskatoon, SK", amount: "$1,290.40", period: "Mar 2026", status: "paid", scheduledAt: "2026-03-31", commissionRate: "8%" },
  { id: "FPO-005", franchiseId: "FRN-004", franchiseName: "Winnipeg Metro", territory: "Winnipeg, MB", amount: "$612.00", period: "Mar 2026", status: "blocked", scheduledAt: "2026-03-31", commissionRate: "8%" },
];

export const mockFranchisePayoutProfiles: Record<string, FranchisePayoutProfile> = {
  "FPO-001": {
    ...mockFranchisePayouts[0]!,
    settlementRef: "SETTLE-FRN001-APR26",
    auditNotes: ["Queued after monthly reconciliation.", "Waiting for finance-admin approval."],
    lineItems: [
      { label: "Cleaning services (18 bookings)", amount: "$720.00" },
      { label: "Car detailing (5 bookings)", amount: "$210.00" },
      { label: "Logistics (9 bookings)", amount: "$543.60" },
    ],
  },
  "FPO-005": {
    ...mockFranchisePayouts[4]!,
    settlementRef: "SETTLE-FRN004-MAR26",
    auditNotes: ["Blocked: territory under suspension review.", "Payout hold placed by Super Admin on 2026-03-28."],
    lineItems: [
      { label: "Cleaning services (7 bookings)", amount: "$420.00" },
      { label: "Car detailing (3 bookings)", amount: "$192.00" },
    ],
  },
};

export const mockTerritoryPromotions: Record<string, TerritoryPromotion[]> = {
  "FRN-001": [
    {
      id: "PROMO-T01",
      title: "Spring Cleaning 20% Off",
      description: "20% discount on all apartment and house cleaning bookings in April.",
      discountType: "percentage",
      discountValue: "20%",
      status: "pending-approval",
      createdBy: "Marcus Nkomo",
      createdAt: "2026-04-10",
      validFrom: "2026-04-15",
      validTo: "2026-04-30",
      approvedBy: null,
    },
  ],
  "FRN-002": [
    {
      id: "PROMO-T11",
      title: "New Customer $15 Off",
      description: "First-time customer flat $15 discount on any service.",
      discountType: "fixed",
      discountValue: "$15",
      status: "live",
      createdBy: "Priya Desai",
      createdAt: "2026-03-01",
      validFrom: "2026-03-10",
      validTo: "2026-04-30",
      approvedBy: "Super Admin",
    },
    {
      id: "PROMO-T12",
      title: "Commercial Cleaning Bundle",
      description: "10% off on bookings above $500 for commercial properties.",
      discountType: "percentage",
      discountValue: "10%",
      status: "pending-approval",
      createdBy: "Priya Desai",
      createdAt: "2026-04-18",
      validFrom: "2026-05-01",
      validTo: "2026-05-31",
      approvedBy: null,
    },
  ],
  "FRN-005": [
    {
      id: "PROMO-T51",
      title: "IT Support Summer Package",
      description: "15% off IT support packages booked before June 30.",
      discountType: "percentage",
      discountValue: "15%",
      status: "approved",
      createdBy: "Leon Hartfield",
      createdAt: "2026-04-20",
      validFrom: "2026-05-01",
      validTo: "2026-06-30",
      approvedBy: "Super Admin",
    },
    {
      id: "PROMO-T52",
      title: "Referral Bonus $20",
      description: "$20 credit for customers who refer a new user.",
      discountType: "fixed",
      discountValue: "$20",
      status: "pending-approval",
      createdBy: "Leon Hartfield",
      createdAt: "2026-04-25",
      validFrom: "2026-05-01",
      validTo: "2026-07-31",
      approvedBy: null,
    },
  ],
};

export const mockTerritoryMetrics: Record<string, TerritoryMetricPoint[]> = {
  "FRN-001": [
    { month: "Nov 2025", revenue: "$12,100", bookings: 142, rating: "4.6" },
    { month: "Dec 2025", revenue: "$14,800", bookings: 171, rating: "4.7" },
    { month: "Jan 2026", revenue: "$11,200", bookings: 131, rating: "4.7" },
    { month: "Feb 2026", revenue: "$13,600", bookings: 158, rating: "4.8" },
    { month: "Mar 2026", revenue: "$16,900", bookings: 192, rating: "4.8" },
    { month: "Apr 2026", revenue: "$18,420", bookings: 209, rating: "4.8" },
  ],
  "FRN-002": [
    { month: "Nov 2025", revenue: "$21,400", bookings: 241, rating: "4.5" },
    { month: "Dec 2025", revenue: "$24,700", bookings: 278, rating: "4.6" },
    { month: "Jan 2026", revenue: "$19,800", bookings: 222, rating: "4.6" },
    { month: "Feb 2026", revenue: "$26,100", bookings: 294, rating: "4.7" },
    { month: "Mar 2026", revenue: "$29,400", bookings: 331, rating: "4.7" },
    { month: "Apr 2026", revenue: "$31,750", bookings: 357, rating: "4.9" },
  ],
  "FRN-005": [
    { month: "Nov 2025", revenue: "$38,200", bookings: 423, rating: "4.8" },
    { month: "Dec 2025", revenue: "$43,100", bookings: 478, rating: "4.9" },
    { month: "Jan 2026", revenue: "$36,800", bookings: 409, rating: "4.8" },
    { month: "Feb 2026", revenue: "$46,200", bookings: 512, rating: "4.9" },
    { month: "Mar 2026", revenue: "$51,700", bookings: 573, rating: "4.9" },
    { month: "Apr 2026", revenue: "$54,900", bookings: 608, rating: "4.9" },
  ],
};

export function getTerritories() { return mockTerritories; }
export function getTerritoryById(id: string) { return mockTerritoryProfiles[id] ?? null; }
export function getFranchiseStaff(id: string) { return mockFranchiseStaff[id] ?? []; }
export function getFranchiseProviders(id: string) { return mockFranchiseProviders[id] ?? []; }
export function getFranchiseDocs(id: string) { return mockFranchiseDocs[id] ?? []; }
export function getFranchisePayouts() { return mockFranchisePayouts; }
export function getFranchisePayoutById(id: string) { return mockFranchisePayoutProfiles[id] ?? mockFranchisePayouts.find(p => p.id === id) ?? null; }
export function getTerritoryPromotions(id: string) { return mockTerritoryPromotions[id] ?? []; }
export function getTerritoryMetrics(id: string) { return mockTerritoryMetrics[id] ?? []; }
export function getAllPendingPromotions() {
  return Object.entries(mockTerritoryPromotions).flatMap(([tid, promos]) =>
    promos.filter(p => p.status === "pending-approval").map(p => ({ ...p, territoryId: tid }))
  );
}
