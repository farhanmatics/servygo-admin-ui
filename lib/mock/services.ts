import type { AdminRole } from "./admin-shell";

export type LocalStatus = "live" | "pilot" | "paused" | "blocked";
export type PricingMode = "fixed" | "bidding" | "hybrid";
export type ProviderReadiness = "ready" | "limited" | "blocked";
export type FieldType = "text" | "textarea" | "select" | "checkbox" | "date" | "number" | "file";

export type LocalProvider = {
  capacity: string;
  id: string;
  name: string;
  readiness: ProviderReadiness;
  sla: string;
  verification: string;
};

export type PackageConfig = {
  addOns: string[];
  assignedProviders: LocalProvider[];
  fields: { id: string; label: string; note: string; required: boolean; type: FieldType }[];
  id: string;
  name: string;
  price: string;
  pricingMode: PricingMode;
  publishBlockers: string[];
  status: LocalStatus;
};

export type LocalSubcategory = {
  id: string;
  name: string;
  packages: PackageConfig[];
  status: LocalStatus;
};

export type LocalService = {
  id: string;
  name: string;
  note: string;
  status: LocalStatus;
  subcategories: LocalSubcategory[];
};

export type ServiceLocation = {
  city: string;
  id: string;
  marketLead: string;
  province: string;
  services: LocalService[];
  status: LocalStatus;
  territory: string;
};

export const localStatusTone: Record<LocalStatus, "success" | "warning" | "danger" | "info"> = {
  live: "success",
  pilot: "info",
  paused: "warning",
  blocked: "danger",
};

export const pricingModeTone: Record<PricingMode, "success" | "warning" | "info"> = {
  fixed: "success",
  bidding: "warning",
  hybrid: "info",
};

export const providerReadinessTone: Record<ProviderReadiness, "success" | "warning" | "danger"> = {
  ready: "success",
  limited: "warning",
  blocked: "danger",
};

export const serviceAllowedRoles: AdminRole[] = [
  "super-admin",
  "operations-admin",
  "read-only-admin",
];

export const serviceLocations: ServiceLocation[] = [
  {
    id: "loc-saskatoon",
    city: "Saskatoon",
    province: "SK",
    territory: "Central Saskatchewan",
    marketLead: "Sofia Tremblay",
    status: "live",
    services: [
      {
        id: "svc-cleaning",
        name: "Cleaning",
        status: "live",
        note: "Core residential and commercial cleaning packages are active with reliable provider coverage.",
        subcategories: [
          {
            id: "sub-home-cleaning",
            name: "Home cleaning",
            status: "live",
            packages: [
              {
                id: "pkg-sask-home-standard",
                name: "Standard home clean",
                status: "live",
                price: "CAD 109 / 2h",
                pricingMode: "fixed",
                addOns: ["Inside oven", "Inside fridge", "Pet-hair treatment"],
                publishBlockers: [],
                assignedProviders: [
                  {
                    id: "prov-prairie-shine",
                    name: "Prairie Shine Co.",
                    readiness: "limited",
                    capacity: "18 jobs / week",
                    verification: "Insurance expires in 3 days",
                    sla: "92% on-time",
                  },
                  {
                    id: "prov-mint-home",
                    name: "Mint Home Care",
                    readiness: "ready",
                    capacity: "26 jobs / week",
                    verification: "Verified until 2027-01-12",
                    sla: "97% on-time",
                  },
                ],
                fields: [
                  { id: "bedrooms", label: "Bedrooms", type: "select", required: true, note: "Drives package tier." },
                  { id: "bathrooms", label: "Bathrooms", type: "select", required: true, note: "Used for dispatch estimate." },
                  { id: "access", label: "Entry instructions", type: "textarea", required: false, note: "Visible after booking confirmation." },
                ],
              },
              {
                id: "pkg-sask-home-deep",
                name: "Deep clean",
                status: "pilot",
                price: "CAD 189 / 3h",
                pricingMode: "fixed",
                addOns: ["Appliance interior", "Baseboard detail"],
                publishBlockers: ["Needs one additional verified provider for weekend coverage"],
                assignedProviders: [
                  {
                    id: "prov-mint-home",
                    name: "Mint Home Care",
                    readiness: "ready",
                    capacity: "8 jobs / week",
                    verification: "Verified until 2027-01-12",
                    sla: "97% on-time",
                  },
                ],
                fields: [
                  { id: "condition", label: "Current home condition", type: "select", required: true, note: "Sets expectations for provider." },
                  { id: "photos", label: "Reference photos", type: "file", required: false, note: "Optional evidence for heavy jobs." },
                ],
              },
            ],
          },
          {
            id: "sub-office-cleaning",
            name: "Office cleaning",
            status: "live",
            packages: [
              {
                id: "pkg-sask-office-recurring",
                name: "Recurring office clean",
                status: "live",
                price: "CAD 240 / visit",
                pricingMode: "fixed",
                addOns: ["Consumables restock", "Floor polish"],
                publishBlockers: [],
                assignedProviders: [
                  {
                    id: "prov-evergreen",
                    name: "Evergreen Facility Group",
                    readiness: "ready",
                    capacity: "14 visits / week",
                    verification: "Commercial docs verified",
                    sla: "98% on-time",
                  },
                ],
                fields: [
                  { id: "sqft", label: "Approximate square footage", type: "number", required: true, note: "Used for pricing tier." },
                  { id: "frequency", label: "Cleaning frequency", type: "select", required: true, note: "Weekly, biweekly, monthly." },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "svc-moving",
        name: "Moving Support",
        status: "paused",
        note: "Paused locally after repeated reassignment pressure and SLA risk.",
        subcategories: [
          {
            id: "sub-labour-only",
            name: "Labour-only moves",
            status: "blocked",
            packages: [
              {
                id: "pkg-sask-moving-labour",
                name: "Two-person moving crew",
                status: "blocked",
                price: "CAD 159 / 2h",
                pricingMode: "hybrid",
                addOns: ["Furniture disassembly", "Packing supplies"],
                publishBlockers: ["No ready local provider assigned", "SLA breach remediation pending"],
                assignedProviders: [
                  {
                    id: "prov-northline",
                    name: "Northline Logistics",
                    readiness: "blocked",
                    capacity: "Unavailable",
                    verification: "Operational hold",
                    sla: "82% on-time",
                  },
                ],
                fields: [
                  { id: "pickup", label: "Pickup address", type: "text", required: true, note: "Feeds coverage check." },
                  { id: "inventory", label: "Large item inventory", type: "textarea", required: true, note: "Complexity flag." },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "loc-calgary",
    city: "Calgary",
    province: "AB",
    territory: "Southern Alberta",
    marketLead: "Mason Gill",
    status: "pilot",
    services: [
      {
        id: "svc-cleaning",
        name: "Cleaning",
        status: "live",
        note: "Residential cleaning is stable. Commercial packages are in pilot review.",
        subcategories: [
          {
            id: "sub-home-cleaning",
            name: "Home cleaning",
            status: "live",
            packages: [
              {
                id: "pkg-calgary-home-standard",
                name: "Standard home clean",
                status: "live",
                price: "CAD 119 / 2h",
                pricingMode: "fixed",
                addOns: ["Inside oven", "Pet-hair treatment"],
                publishBlockers: [],
                assignedProviders: [
                  {
                    id: "prov-foothills-clean",
                    name: "Foothills Clean Team",
                    readiness: "ready",
                    capacity: "32 jobs / week",
                    verification: "Verified until 2026-11-08",
                    sla: "95% on-time",
                  },
                ],
                fields: [
                  { id: "bedrooms", label: "Bedrooms", type: "select", required: true, note: "Drives package tier." },
                  { id: "parking", label: "Parking instructions", type: "text", required: false, note: "Important for downtown jobs." },
                ],
              },
            ],
          },
          {
            id: "sub-office-cleaning",
            name: "Office cleaning",
            status: "pilot",
            packages: [
              {
                id: "pkg-calgary-office-pilot",
                name: "Small office pilot",
                status: "pilot",
                price: "CAD 260 / visit",
                pricingMode: "fixed",
                addOns: ["Consumables restock"],
                publishBlockers: ["Awaiting commercial backup provider"],
                assignedProviders: [
                  {
                    id: "prov-foothills-clean",
                    name: "Foothills Clean Team",
                    readiness: "limited",
                    capacity: "4 visits / week",
                    verification: "Commercial rider pending",
                    sla: "95% on-time",
                  },
                ],
                fields: [
                  { id: "sqft", label: "Approximate square footage", type: "number", required: true, note: "Pricing estimate." },
                  { id: "access-window", label: "Access window", type: "select", required: true, note: "Dispatch requirement." },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "svc-moving",
        name: "Moving Support",
        status: "live",
        note: "Moving support is live with bid-enabled same-day handling.",
        subcategories: [
          {
            id: "sub-labour-only",
            name: "Labour-only moves",
            status: "live",
            packages: [
              {
                id: "pkg-calgary-moving-labour",
                name: "Two-person moving crew",
                status: "live",
                price: "CAD 179 / 2h",
                pricingMode: "hybrid",
                addOns: ["Furniture disassembly", "Same-day premium"],
                publishBlockers: [],
                assignedProviders: [
                  {
                    id: "prov-rocky-movers",
                    name: "Rocky Movers",
                    readiness: "ready",
                    capacity: "20 jobs / week",
                    verification: "Verified until 2027-02-21",
                    sla: "94% on-time",
                  },
                  {
                    id: "prov-westline",
                    name: "Westline Labour",
                    readiness: "ready",
                    capacity: "12 jobs / week",
                    verification: "Verified until 2026-09-14",
                    sla: "91% on-time",
                  },
                ],
                fields: [
                  { id: "pickup", label: "Pickup address", type: "text", required: true, note: "Coverage check." },
                  { id: "stairs", label: "Flights of stairs", type: "number", required: true, note: "Pricing and capacity." },
                  { id: "move-date", label: "Preferred move date", type: "date", required: true, note: "Bidding threshold." },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "loc-winnipeg",
    city: "Winnipeg",
    province: "MB",
    territory: "Manitoba",
    marketLead: "Lina Sandhu",
    status: "blocked",
    services: [
      {
        id: "svc-cleaning",
        name: "Cleaning",
        status: "pilot",
        note: "Residential cleaning is visible internally but not fully published.",
        subcategories: [
          {
            id: "sub-home-cleaning",
            name: "Home cleaning",
            status: "pilot",
            packages: [
              {
                id: "pkg-winnipeg-home-standard",
                name: "Standard home clean",
                status: "pilot",
                price: "CAD 115 / 2h",
                pricingMode: "fixed",
                addOns: ["Inside fridge"],
                publishBlockers: ["Need one more provider with approved documents"],
                assignedProviders: [
                  {
                    id: "prov-red-river-clean",
                    name: "Red River Clean",
                    readiness: "limited",
                    capacity: "10 jobs / week",
                    verification: "Insurance renewal in review",
                    sla: "90% on-time",
                  },
                ],
                fields: [
                  { id: "bedrooms", label: "Bedrooms", type: "select", required: true, note: "Pricing tier." },
                  { id: "notes", label: "Special notes", type: "textarea", required: false, note: "Provider context." },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

export const locationServiceMetrics = [
  { label: "Configured locations", value: "3", delta: "2 with live packages", tone: "info" as const },
  { label: "Live packages", value: "5", delta: "Customer bookable", tone: "success" as const },
  { label: "Provider gaps", value: "4", delta: "Blockers to publish", tone: "danger" as const },
  { label: "Pilot packages", value: "3", delta: "Need rollout review", tone: "warning" as const },
];

export function getServiceLocations() {
  return serviceLocations;
}

export function getLocationById(locationId: string) {
  return serviceLocations.find((location) => location.id === locationId);
}

export function getLocalService(locationId: string, serviceId: string) {
  return getLocationById(locationId)?.services.find((service) => service.id === serviceId);
}

export function getLocalSubcategory(locationId: string, serviceId: string, subcategoryId: string) {
  return getLocalService(locationId, serviceId)?.subcategories.find((subcategory) => subcategory.id === subcategoryId);
}

export function getLocalPackage(locationId: string, packageId: string) {
  const location = getLocationById(locationId);
  if (!location) return undefined;

  for (const service of location.services) {
    for (const subcategory of service.subcategories) {
      const localPackage = subcategory.packages.find((item) => item.id === packageId);
      if (localPackage) {
        return { localPackage, service, subcategory };
      }
    }
  }

  return undefined;
}

export function countPackages(location: ServiceLocation) {
  return location.services.reduce(
    (serviceTotal, service) =>
      serviceTotal +
      service.subcategories.reduce((subcategoryTotal, subcategory) => subcategoryTotal + subcategory.packages.length, 0),
    0,
  );
}

export function countProviderGaps(location: ServiceLocation) {
  return location.services.reduce(
    (serviceTotal, service) =>
      serviceTotal +
      service.subcategories.reduce(
        (subcategoryTotal, subcategory) =>
          subcategoryTotal +
          subcategory.packages.filter(
            (localPackage) =>
              localPackage.publishBlockers.length > 0 ||
              localPackage.assignedProviders.every((provider) => provider.readiness !== "ready"),
          ).length,
        0,
      ),
    0,
  );
}
