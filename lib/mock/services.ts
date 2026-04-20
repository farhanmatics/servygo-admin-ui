import type { AdminRole } from "./admin-shell";

export type ServiceState = "live" | "paused" | "limited";
export type PricingMode = "fixed" | "bidding" | "hybrid";
export type CoverageState = "live" | "pilot" | "paused";
export type FormFieldType = "text" | "textarea" | "select" | "checkbox" | "date" | "number" | "file";

export type ServiceCoverageRow = {
  cities: string;
  note: string;
  province: string;
  state: CoverageState;
};

export type ServiceAddon = {
  name: string;
  note: string;
  price: string;
};

export type ServiceFormField = {
  id: string;
  label: string;
  note: string;
  required: boolean;
  type: FormFieldType;
};

export type ServicePricingRule = {
  id: string;
  label: string;
  note: string;
  value: string;
};

export type ServiceRecord = {
  biddingEnabled: boolean;
  createdAt: string;
  description: string;
  formTemplateSummary: string;
  id: string;
  liveRegions: number;
  locationMode: string;
  name: string;
  package: string;
  pricingMode: PricingMode;
  segment: string;
  state: ServiceState;
  summary: string;
};

export type ServiceProfile = ServiceRecord & {
  addOns: ServiceAddon[];
  auditNotes: string[];
  coverage: ServiceCoverageRow[];
  formFields: ServiceFormField[];
  pricingRules: ServicePricingRule[];
  rolloutNote: string;
};

export const serviceStateTone: Record<ServiceState, "success" | "warning" | "info"> = {
  live: "success",
  paused: "warning",
  limited: "info",
};

export const pricingModeTone: Record<PricingMode, "success" | "warning" | "info"> = {
  fixed: "success",
  bidding: "warning",
  hybrid: "info",
};

export const coverageStateTone: Record<CoverageState, "success" | "warning" | "info"> = {
  live: "success",
  pilot: "info",
  paused: "warning",
};

export const serviceListAllowedRoles: AdminRole[] = [
  "super-admin",
  "operations-admin",
  "read-only-admin",
];

export const serviceProfiles: ServiceProfile[] = [
  {
    id: "SRV-100",
    name: "Home Cleaning",
    segment: "Residential",
    package: "Recurring core",
    state: "live",
    pricingMode: "fixed",
    biddingEnabled: false,
    liveRegions: 6,
    locationMode: "City and postal-code coverage",
    formTemplateSummary: "7 request fields, 2 optional uploads",
    createdAt: "2025-06-18",
    description:
      "Core recurring home-cleaning product with fixed packages, upsell add-ons, and territory-aware availability.",
    summary: "High-volume service with stable pricing and standardized intake fields.",
    rolloutNote: "Primary benchmark service for operational expansion and SLA quality.",
    auditNotes: [
      "Fixed-price residential services should keep request fields lightweight to protect conversion and dispatch speed.",
      "Coverage changes must be visible before turning a city live.",
    ],
    pricingRules: [
      {
        id: "PR-100-A",
        label: "Base package",
        value: "CAD 109 / 2h",
        note: "Entry package for 1-bedroom residential homes.",
      },
      {
        id: "PR-100-B",
        label: "Size multiplier",
        value: "+ CAD 28 / bedroom",
        note: "Applied after the first bedroom tier.",
      },
      {
        id: "PR-100-C",
        label: "Weekend uplift",
        value: "+ 12%",
        note: "Applied only in cities with Saturday premium enabled.",
      },
    ],
    addOns: [
      { name: "Inside oven", price: "CAD 18", note: "Applies to one standard-size oven." },
      { name: "Inside fridge", price: "CAD 14", note: "Requires power-off note in intake form." },
      { name: "Pet-hair treatment", price: "CAD 22", note: "Flags dispatch for extra time buffer." },
    ],
    coverage: [
      {
        province: "SK",
        cities: "Saskatoon, Warman, Martensville",
        state: "live",
        note: "Highest booking density, recurring slots stable.",
      },
      {
        province: "AB",
        cities: "Calgary, Edmonton",
        state: "live",
        note: "Weekend uplift enabled for both cities.",
      },
      {
        province: "MB",
        cities: "Winnipeg",
        state: "pilot",
        note: "Pilot slot volume limited while provider density grows.",
      },
    ],
    formFields: [
      { id: "rooms", label: "Bedrooms", type: "select", required: true, note: "Used in package pricing." },
      { id: "bathrooms", label: "Bathrooms", type: "select", required: true, note: "Affects dispatch estimate." },
      { id: "pets", label: "Pets in home", type: "checkbox", required: false, note: "Shows pet-hair add-on suggestion." },
      { id: "access", label: "Entry instructions", type: "textarea", required: false, note: "Displayed to provider after booking confirmation." },
      { id: "photos", label: "Reference photos", type: "file", required: false, note: "Optional upload for edge cases only." },
    ],
  },
  {
    id: "SRV-220",
    name: "Moving Support",
    segment: "Logistics",
    package: "Labour-only crew",
    state: "limited",
    pricingMode: "hybrid",
    biddingEnabled: true,
    liveRegions: 4,
    locationMode: "Territory board with service-window gating",
    formTemplateSummary: "9 request fields, 3 mandatory complexity flags",
    createdAt: "2025-09-02",
    description:
      "Operationally sensitive moving-support service with base pricing plus bidding option for oversized or urgent jobs.",
    summary: "Hybrid model used when order complexity or timing needs provider discretion.",
    rolloutNote: "Service remains limited in some cities due to reassignment pressure and crew density.",
    auditNotes: [
      "Bidding mode should only be live where provider response times stay healthy.",
      "Complexity flags must remain visible to operations before expanding territories.",
    ],
    pricingRules: [
      {
        id: "PR-220-A",
        label: "Base crew",
        value: "CAD 159 / 2 movers / 2h",
        note: "Fixed-price baseline for standard apartment moves.",
      },
      {
        id: "PR-220-B",
        label: "Urgency threshold",
        value: "Bidding after < 18h notice",
        note: "Switches flow to provider response queue.",
      },
      {
        id: "PR-220-C",
        label: "Stair surcharge",
        value: "+ CAD 25 / additional flight",
        note: "Visible in booking review before checkout.",
      },
    ],
    addOns: [
      { name: "Packing supplies", price: "CAD 34", note: "Inventory-limited in pilot cities." },
      { name: "Furniture disassembly", price: "CAD 42", note: "Requires tool confirmation from provider." },
      { name: "Same-day premium", price: "Bid only", note: "Available only when bidding is enabled." },
    ],
    coverage: [
      {
        province: "AB",
        cities: "Calgary, Edmonton",
        state: "live",
        note: "High demand; same-day premium restricted.",
      },
      {
        province: "MB",
        cities: "Winnipeg",
        state: "pilot",
        note: "Crew response times under review.",
      },
      {
        province: "SK",
        cities: "Saskatoon",
        state: "paused",
        note: "Paused after repeated SLA breaches and reassignment load.",
      },
    ],
    formFields: [
      { id: "pickup", label: "Pickup address", type: "text", required: true, note: "Feeds coverage check." },
      { id: "dropoff", label: "Drop-off address", type: "text", required: true, note: "Separate territory rules may apply." },
      { id: "stairs", label: "Flights of stairs", type: "number", required: true, note: "Used in surcharge logic." },
      { id: "truck", label: "Need truck", type: "checkbox", required: false, note: "May force bidding mode in limited territories." },
      { id: "inventory", label: "Large item inventory", type: "textarea", required: true, note: "Operational review field." },
      { id: "date", label: "Preferred move date", type: "date", required: true, note: "Affects urgency threshold." },
    ],
  },
  {
    id: "SRV-310",
    name: "Commercial Janitorial",
    segment: "Commercial",
    package: "Facility maintenance",
    state: "live",
    pricingMode: "fixed",
    biddingEnabled: false,
    liveRegions: 5,
    locationMode: "Province and territory matrix",
    formTemplateSummary: "8 request fields, 1 compliance upload",
    createdAt: "2025-03-11",
    description:
      "Commercial janitorial package with contract-style intake, site-scope fields, and territory-level rollout control.",
    summary: "Contract-oriented service with structured request data and stable provider qualification rules.",
    rolloutNote: "Best performing enterprise service for franchise expansion planning.",
    auditNotes: [
      "Commercial services should make availability and live/paused regions obvious to avoid over-promising coverage.",
    ],
    pricingRules: [
      {
        id: "PR-310-A",
        label: "Base visit fee",
        value: "CAD 240 / visit",
        note: "Applies to sites under 2,500 sq ft.",
      },
      {
        id: "PR-310-B",
        label: "Square-foot tier",
        value: "+ CAD 0.11 / sq ft",
        note: "Applied above the base threshold.",
      },
      {
        id: "PR-310-C",
        label: "Night service premium",
        value: "+ 9%",
        note: "Enabled only in enterprise contracts.",
      },
    ],
    addOns: [
      { name: "Consumables restock", price: "CAD 26", note: "Requires supply closet access field." },
      { name: "Floor polish", price: "CAD 48", note: "Visible only for commercial-qualified providers." },
    ],
    coverage: [
      {
        province: "AB",
        cities: "Edmonton, Calgary",
        state: "live",
        note: "Strong enterprise provider supply.",
      },
      {
        province: "SK",
        cities: "Saskatoon, Regina",
        state: "live",
        note: "Franchise-led coverage expansion.",
      },
      {
        province: "BC",
        cities: "Vancouver",
        state: "pilot",
        note: "Pilot contracts only while provider onboarding completes.",
      },
    ],
    formFields: [
      { id: "site-size", label: "Approximate square footage", type: "number", required: true, note: "Used in pricing tier." },
      { id: "frequency", label: "Cleaning frequency", type: "select", required: true, note: "Drives contract quote cadence." },
      { id: "access-window", label: "Preferred access window", type: "select", required: true, note: "Dispatch planning input." },
      { id: "site-notes", label: "Site notes", type: "textarea", required: false, note: "Special handling or security needs." },
      { id: "floorplan", label: "Floorplan upload", type: "file", required: false, note: "Requested for multi-floor sites." },
    ],
  },
];

export const serviceDirectoryMetrics = [
  { label: "Live services", value: "18", delta: "3 in pilot rollout", tone: "success" as const },
  { label: "Bid-enabled", value: "4", delta: "Ops approval needed", tone: "warning" as const },
  { label: "Paused regions", value: "6", delta: "Need coverage review", tone: "info" as const },
  { label: "Form templates", value: "27", delta: "2 pending edits", tone: "danger" as const },
];

export function getServices() {
  return serviceProfiles;
}

export function getServiceById(id: string) {
  return serviceProfiles.find((service) => service.id === id);
}
