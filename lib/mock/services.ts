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

export type AddOn = {
  id: string;
  name: string;
  price?: string;
};

export type PackageInclusion = {
  id: string;
  label: string;
};

export type ReviewHighlight = {
  author: string;
  date: string;
  quote: string;
  rating: number;
};

export type PackagePolicies = {
  guarantee: string;
  refund: string;
  reschedule: string;
};

export type RecurringOption = {
  cadences: string[];
  discountPercent: number;
};

export type PackageConfig = {
  addOns: AddOn[];
  assignedProviders: LocalProvider[];
  duration?: string;
  fields: { id: string; label: string; note: string; required: boolean; type: FieldType }[];
  heroImage?: string;
  id: string;
  inclusions?: PackageInclusion[];
  longDescription?: string;
  name: string;
  policies?: PackagePolicies;
  price: string;
  pricingMode: PricingMode;
  publishBlockers: string[];
  rating?: { reviewCount: number; score: number };
  recurringOption?: RecurringOption;
  relatedPackageIds?: string[];
  reviewHighlights?: ReviewHighlight[];
  selectionBullets?: string[];
  startingPrice?: string;
  status: LocalStatus;
  tagline?: string;
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

const addon = (id: string, name: string, price?: string): AddOn => ({ id, name, price });

const defaultPolicies: PackagePolicies = {
  reschedule: "Free to reschedule up to 24 hours before the service window.",
  guarantee: "Service guarantee: if a customer reports an issue within 24 hours, a re-clean or partial refund is offered.",
  refund: "Refunds follow the ServyGo cancellation policy. Mark refunds via the finance queue.",
};

const prairieShine: LocalProvider = {
  id: "prov-prairie-shine",
  name: "Prairie Shine Co.",
  readiness: "ready",
  capacity: "18 jobs / week",
  verification: "Verified until 2027-02-10",
  sla: "92% on-time",
};

const mintHome: LocalProvider = {
  id: "prov-mint-home",
  name: "Mint Home Care",
  readiness: "ready",
  capacity: "26 jobs / week",
  verification: "Verified until 2027-01-12",
  sla: "97% on-time",
};

const evergreen: LocalProvider = {
  id: "prov-evergreen",
  name: "Evergreen Facility Group",
  readiness: "ready",
  capacity: "14 visits / week",
  verification: "Commercial docs verified",
  sla: "98% on-time",
};

const glossGarage: LocalProvider = {
  id: "prov-gloss-garage",
  name: "Gloss Garage Saskatoon",
  readiness: "ready",
  capacity: "25 cars / week",
  verification: "Verified until 2026-12-10",
  sla: "95% on-time",
};

const northline: LocalProvider = {
  id: "prov-northline",
  name: "Northline Logistics",
  readiness: "ready",
  capacity: "40 jobs / week",
  verification: "Verified until 2027-01-08",
  sla: "93% on-time",
};

const paperTrail: LocalProvider = {
  id: "prov-papertrail",
  name: "PaperTrail Studio",
  readiness: "ready",
  capacity: "30 orders / week",
  verification: "Verified until 2027-04-01",
  sla: "96% on-time",
};

const byteBloom: LocalProvider = {
  id: "prov-byte-bloom",
  name: "Byte & Bloom Agency",
  readiness: "limited",
  capacity: "3 builds / week",
  verification: "Security checklist pending",
  sla: "90% on-time",
};

const cleanAcademy: LocalProvider = {
  id: "prov-clean-academy",
  name: "CleanOps Academy",
  readiness: "ready",
  capacity: "60 seats / week",
  verification: "Instructor credentials verified",
  sla: "99% session adherence",
};

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
        note: "Professional cleaning for apartments, townhouses, outdoor areas, and commercial spaces. Fixed pricing with verified providers.",
        subcategories: [
          {
            id: "sub-apartment-condo",
            name: "Apartment / Condo",
            status: "live",
            packages: [
              {
                id: "pkg-sask-apt-standard",
                name: "Apartment Essentials",
                tagline: "A dependable weekly refresh for studios and 1-bed condos.",
                longDescription:
                  "Kitchen, bathroom, living area and bedroom - top-to-bottom tidy with eco-safe products. Designed for recurring apartment care with a trusted local crew.",
                heroImage: "/mock/cleaning/apartment-essentials.jpg",
                duration: "3 hours",
                status: "live",
                price: "CAD 109 / 2h",
                startingPrice: "From CAD 79",
                pricingMode: "fixed",
                selectionBullets: ["Up to 1 bedroom", "1 double unit", "Single bathroom"],
                inclusions: [
                  { id: "inc-kitchen", label: "Kitchen surfaces and sink" },
                  { id: "inc-bath", label: "One full bathroom" },
                  { id: "inc-living", label: "Living and bedroom dusting" },
                  { id: "inc-shower", label: "Shower and tub clean" },
                  { id: "inc-floors", label: "Trash, vacuum, mop" },
                  { id: "inc-linen", label: "Linen and trash bin tidy" },
                ],
                addOns: [
                  addon("ao-deep-treatment", "Partner deep treatment", "+CAD 70"),
                  addon("ao-laundry", "Laundry and fold", "+CAD 25"),
                  addon("ao-fridge", "Inside fridge", "+CAD 10"),
                  addon("ao-oven", "Inside oven", "+CAD 20"),
                ],
                recurringOption: {
                  discountPercent: 8,
                  cadences: ["weekly", "bi-weekly", "monthly"],
                },
                policies: defaultPolicies,
                rating: { score: 4.92, reviewCount: 69 },
                reviewHighlights: [
                  {
                    author: "Maya T.",
                    date: "2026-07-04",
                    quote: "Really the gold standard in eco-safe, friendly, punctual and the place smells amazing after.",
                    rating: 5,
                  },
                  {
                    author: "Jordan P.",
                    date: "2026-06-22",
                    quote: "Crew was quick, thorough, and respectful of pets. Rebooking monthly.",
                    rating: 5,
                  },
                ],
                relatedPackageIds: ["pkg-sask-apt-deep", "pkg-sask-apt-move", "pkg-sask-house-standard"],
                publishBlockers: [],
                assignedProviders: [prairieShine, mintHome],
                fields: [
                  { id: "bedrooms", label: "Bedrooms", type: "select", required: true, note: "Drives package tier." },
                  { id: "bathrooms", label: "Bathrooms", type: "select", required: true, note: "Used for dispatch estimate." },
                ],
              },
              {
                id: "pkg-sask-apt-deep",
                name: "Apartment Deep Clean",
                tagline: "Twice-a-year deep reset for apartments and condos.",
                longDescription:
                  "Detailed appliance exteriors, baseboards, and high-touch surfaces. Recommended every 4-6 months or after guests.",
                heroImage: "/mock/cleaning/apartment-deep.jpg",
                duration: "4 hours",
                status: "live",
                price: "CAD 189 / 3h",
                startingPrice: "From CAD 169",
                pricingMode: "fixed",
                selectionBullets: ["Up to 2 bedrooms", "Up to 2 bathrooms"],
                inclusions: [
                  { id: "inc-deep-surfaces", label: "All surfaces deep wipe" },
                  { id: "inc-baseboards", label: "Baseboard detail" },
                  { id: "inc-appliances", label: "Appliance exteriors" },
                ],
                addOns: [
                  addon("ao-appliance-interior", "Appliance interior", "+CAD 30"),
                  addon("ao-window-interior", "Window interior", "+CAD 40"),
                ],
                policies: defaultPolicies,
                rating: { score: 4.88, reviewCount: 41 },
                relatedPackageIds: ["pkg-sask-apt-standard", "pkg-sask-apt-move"],
                publishBlockers: [],
                assignedProviders: [mintHome],
                fields: [
                  { id: "condition", label: "Current condition", type: "select", required: true, note: "Sets expectations for provider." },
                ],
              },
              {
                id: "pkg-sask-apt-move",
                name: "Move-in / Move-out Clean",
                tagline: "Handover-ready clean for apartment transitions.",
                longDescription:
                  "Full apartment reset ready for landlord inspection or move-in. Cabinets wiped, balcony swept, trash removed.",
                heroImage: "/mock/cleaning/apartment-move.jpg",
                duration: "4 hours",
                status: "live",
                price: "CAD 209 / 3h",
                startingPrice: "From CAD 259",
                pricingMode: "fixed",
                selectionBullets: ["Studio to 4+ bedroom", "Single or multiple bathrooms"],
                inclusions: [
                  { id: "inc-cabinet", label: "Cabinet wipe-down (inside/out)" },
                  { id: "inc-balcony", label: "Balcony sweep" },
                  { id: "inc-appliances-deep", label: "Appliance interiors" },
                  { id: "inc-floors-deep", label: "Deep floor wash" },
                ],
                addOns: [
                  addon("ao-carpet", "Carpet shampoo", "+CAD 60"),
                  addon("ao-wall-spot", "Wall spot-clean", "+CAD 25"),
                ],
                policies: defaultPolicies,
                rating: { score: 4.8, reviewCount: 23 },
                relatedPackageIds: ["pkg-sask-apt-standard", "pkg-sask-apt-deep"],
                publishBlockers: [],
                assignedProviders: [prairieShine],
                fields: [
                  { id: "unit-size", label: "Unit size", type: "select", required: true, note: "Studio to 4+ bedroom." },
                ],
              },
            ],
          },
          {
            id: "sub-townhouse-house",
            name: "Townhouse / House",
            status: "live",
            packages: [
              {
                id: "pkg-sask-house-standard",
                name: "Standard clean",
                tagline: "Whole-home recurring clean for townhouses and detached homes.",
                longDescription:
                  "Top-to-bottom refresh across main living spaces, bedrooms, and bathrooms with eco-safe products.",
                duration: "3 hours",
                status: "live",
                price: "CAD 139 / 2.5h",
                startingPrice: "From CAD 139",
                pricingMode: "fixed",
                inclusions: [
                  { id: "inc-kitchen", label: "Kitchen and cooking surfaces" },
                  { id: "inc-baths", label: "All bathrooms" },
                  { id: "inc-living", label: "Living and bedroom dusting" },
                ],
                addOns: [addon("ao-oven", "Inside oven", "+CAD 25"), addon("ao-pet-hair", "Pet-hair treatment", "+CAD 15")],
                policies: defaultPolicies,
                rating: { score: 4.86, reviewCount: 54 },
                relatedPackageIds: ["pkg-sask-house-deep", "pkg-sask-house-move"],
                publishBlockers: [],
                assignedProviders: [prairieShine, mintHome],
                fields: [
                  { id: "bedrooms", label: "Bedrooms", type: "select", required: true, note: "Pricing tier." },
                  { id: "floors", label: "Number of floors", type: "number", required: false, note: "Affects crew allocation." },
                ],
              },
              {
                id: "pkg-sask-house-deep",
                name: "Deep clean",
                tagline: "Seasonal deep clean for larger homes.",
                duration: "5 hours",
                status: "live",
                price: "CAD 229 / 4h",
                startingPrice: "From CAD 229",
                pricingMode: "fixed",
                addOns: [
                  addon("ao-appliance-interior", "Appliance interior", "+CAD 40"),
                  addon("ao-baseboard", "Baseboard detail", "+CAD 30"),
                  addon("ao-window-interior", "Window interior", "+CAD 45"),
                ],
                policies: defaultPolicies,
                publishBlockers: [],
                assignedProviders: [mintHome],
                fields: [
                  { id: "condition", label: "Current condition", type: "select", required: true, note: "Sets crew size." },
                ],
              },
              {
                id: "pkg-sask-house-move",
                name: "Move-in / move-out clean",
                tagline: "Full handover-ready clean for townhouses and detached homes.",
                duration: "5 hours",
                status: "live",
                price: "CAD 259 / 4h",
                startingPrice: "From CAD 259",
                pricingMode: "fixed",
                addOns: [addon("ao-carpet", "Carpet treatment", "+CAD 75"), addon("ao-garage", "Garage sweep", "+CAD 40")],
                policies: defaultPolicies,
                publishBlockers: [],
                assignedProviders: [prairieShine],
                fields: [
                  { id: "unit-size", label: "Home size", type: "select", required: true, note: "Square footage band." },
                ],
              },
            ],
          },
          {
            id: "sub-outdoor-spaces",
            name: "Outdoor Spaces",
            status: "live",
            packages: [
              {
                id: "pkg-sask-outdoor-patio",
                name: "Patio and deck clean",
                status: "live",
                price: "CAD 119",
                pricingMode: "fixed",
                addOns: [addon("ao-pressure", "Pressure wash", "+CAD 50"), addon("ao-sealant", "Sealant touch-up", "+CAD 60")],
                publishBlockers: [],
                assignedProviders: [prairieShine],
                fields: [
                  { id: "surface", label: "Surface type", type: "select", required: true, note: "Wood, concrete, composite." },
                ],
              },
              {
                id: "pkg-sask-outdoor-garage",
                name: "Garage clean",
                status: "live",
                price: "CAD 149",
                pricingMode: "fixed",
                addOns: [addon("ao-waste", "Waste removal", "+CAD 45"), addon("ao-shelf", "Shelf wipe-down", "+CAD 20")],
                publishBlockers: [],
                assignedProviders: [prairieShine],
                fields: [
                  { id: "size", label: "Garage size", type: "select", required: true, note: "Single, double, triple." },
                ],
              },
              {
                id: "pkg-sask-outdoor-yard",
                name: "Yard tidy",
                status: "pilot",
                price: "CAD 99",
                pricingMode: "fixed",
                addOns: [addon("ao-leaf", "Leaf removal", "+CAD 35")],
                publishBlockers: ["Seasonal provider availability pending"],
                assignedProviders: [prairieShine],
                fields: [
                  { id: "yard-size", label: "Yard size", type: "select", required: true, note: "Small, medium, large." },
                ],
              },
            ],
          },
          {
            id: "sub-office-space",
            name: "Office Space",
            status: "live",
            packages: [
              {
                id: "pkg-sask-office-daily",
                name: "Daily office clean",
                status: "live",
                price: "CAD 149 / visit",
                pricingMode: "fixed",
                addOns: [addon("ao-consumables", "Consumables restock", "+CAD 20")],
                publishBlockers: [],
                assignedProviders: [evergreen],
                fields: [
                  { id: "sqft", label: "Approximate square footage", type: "number", required: true, note: "Pricing tier." },
                ],
              },
              {
                id: "pkg-sask-office-weekly",
                name: "Weekly office clean",
                status: "live",
                price: "CAD 240 / visit",
                pricingMode: "fixed",
                addOns: [addon("ao-consumables", "Consumables restock", "+CAD 20"), addon("ao-floor-polish", "Floor polish", "+CAD 45")],
                publishBlockers: [],
                assignedProviders: [evergreen],
                fields: [
                  { id: "sqft", label: "Approximate square footage", type: "number", required: true, note: "Pricing tier." },
                  { id: "frequency", label: "Cleaning frequency", type: "select", required: true, note: "Weekly or biweekly." },
                ],
              },
              {
                id: "pkg-sask-office-monthly-deep",
                name: "Monthly deep office clean",
                status: "live",
                price: "CAD 389 / visit",
                pricingMode: "fixed",
                addOns: [addon("ao-carpet-deep", "Carpet deep clean", "+CAD 120"), addon("ao-window-interior", "Window interior", "+CAD 60")],
                publishBlockers: [],
                assignedProviders: [evergreen],
                fields: [
                  { id: "sqft", label: "Approximate square footage", type: "number", required: true, note: "Pricing tier." },
                ],
              },
            ],
          },
          {
            id: "sub-commercial",
            name: "Commercial",
            status: "live",
            packages: [
              {
                id: "pkg-sask-comm-retail",
                name: "Retail cleaning",
                status: "live",
                price: "CAD 299 / visit",
                pricingMode: "fixed",
                addOns: [addon("ao-window-interior", "Window interior", "+CAD 50"), addon("ao-waste-sort", "Waste sort", "+CAD 30")],
                publishBlockers: [],
                assignedProviders: [evergreen],
                fields: [
                  { id: "sqft", label: "Approximate square footage", type: "number", required: true, note: "Pricing tier." },
                  { id: "hours", label: "Preferred hours", type: "select", required: true, note: "Store hours / after hours." },
                ],
              },
              {
                id: "pkg-sask-comm-warehouse",
                name: "Warehouse cleaning",
                status: "live",
                price: "CAD 499 / visit",
                pricingMode: "fixed",
                addOns: [
                  addon("ao-equipment-wipe", "Equipment wipe-down", "+CAD 80"),
                  addon("ao-loading-dock", "Loading-dock sweep", "+CAD 60"),
                ],
                publishBlockers: [],
                assignedProviders: [evergreen],
                fields: [
                  { id: "sqft", label: "Facility size", type: "number", required: true, note: "Pricing tier." },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "svc-car-detailing",
        name: "Car Detailing",
        status: "live",
        note: "From basic wash to premium detailing with home-based and shop-based options.",
        subcategories: [
          {
            id: "sub-car-core",
            name: "Detailing packages",
            status: "live",
            packages: [
              {
                id: "pkg-sask-car-basic",
                name: "Basic exterior wash",
                status: "live",
                price: "CAD 49",
                pricingMode: "fixed",
                addOns: [addon("ao-wheel", "Wheel shine", "+CAD 10"), addon("ao-wax", "Wax top-up", "+CAD 15")],
                publishBlockers: [],
                assignedProviders: [glossGarage],
                fields: [
                  { id: "vehicle-type", label: "Vehicle type", type: "select", required: true, note: "Sedan, SUV, van." },
                  { id: "mobile-service", label: "Mobile service needed", type: "checkbox", required: false, note: "At-home support." },
                ],
              },
              {
                id: "pkg-sask-car-premium",
                name: "Premium full detail",
                status: "pilot",
                price: "CAD 169",
                pricingMode: "fixed",
                addOns: [addon("ao-ceramic", "Ceramic top coat", "+CAD 80"), addon("ao-pet-hair", "Pet hair extraction", "+CAD 25")],
                publishBlockers: ["Awaiting one additional weekend provider"],
                assignedProviders: [{ ...glossGarage, readiness: "limited", capacity: "6 cars / week" }],
                fields: [
                  { id: "interior", label: "Interior condition", type: "select", required: true, note: "Light, medium, heavy." },
                ],
              },
              {
                id: "pkg-sask-car-express",
                name: "Express interior refresh",
                status: "live",
                price: "CAD 79",
                pricingMode: "fixed",
                addOns: [addon("ao-odor", "Odor treatment", "+CAD 20")],
                publishBlockers: [],
                assignedProviders: [glossGarage],
                fields: [
                  { id: "condition", label: "Interior condition", type: "select", required: true, note: "Quick service scope." },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "svc-logistic",
        name: "Logistic",
        status: "live",
        note: "Local and provincial delivery and moving services. Pricing based on distance, vehicle type, and helpers needed.",
        subcategories: [
          {
            id: "sub-local-delivery",
            name: "Local delivery",
            status: "live",
            packages: [
              {
                id: "pkg-sask-logi-small",
                name: "Small parcel same-day",
                status: "live",
                price: "CAD 39",
                pricingMode: "fixed",
                addOns: [addon("ao-signature", "Signature confirmation", "+CAD 5")],
                publishBlockers: [],
                assignedProviders: [northline],
                fields: [
                  { id: "pickup", label: "Pickup address", type: "text", required: true, note: "Coverage check." },
                  { id: "dropoff", label: "Dropoff address", type: "text", required: true, note: "Route planning." },
                ],
              },
              {
                id: "pkg-sask-logi-van",
                name: "Van delivery run",
                status: "live",
                price: "CAD 129",
                pricingMode: "fixed",
                addOns: [addon("ao-helper", "Helper add-on", "+CAD 30"), addon("ao-evening", "Evening slot", "+CAD 25")],
                publishBlockers: [],
                assignedProviders: [northline],
                fields: [
                  { id: "cargo-type", label: "Cargo type", type: "select", required: true, note: "Fragile, boxes, equipment." },
                  { id: "stops", label: "Number of stops", type: "number", required: true, note: "Pricing band." },
                ],
              },
            ],
          },
          {
            id: "sub-moving-support",
            name: "Moving support",
            status: "pilot",
            packages: [
              {
                id: "pkg-sask-logi-labour",
                name: "Two-helper loading team",
                status: "pilot",
                price: "CAD 149 / 2h",
                pricingMode: "fixed",
                addOns: [addon("ao-packing", "Packing material kit", "+CAD 35")],
                publishBlockers: ["Needs one verified backup team"],
                assignedProviders: [{ ...northline, readiness: "limited", capacity: "6 jobs / week" }],
                fields: [
                  { id: "elevator", label: "Elevator available", type: "checkbox", required: false, note: "Dispatch planning." },
                  { id: "inventory", label: "Large-item count", type: "number", required: true, note: "Crew sizing." },
                ],
              },
              {
                id: "pkg-sask-logi-provincial",
                name: "Provincial relocation support",
                status: "pilot",
                price: "CAD 349",
                pricingMode: "fixed",
                addOns: [addon("ao-tracking", "Inter-city tracking", "+CAD 50")],
                publishBlockers: ["Route permit template under review"],
                assignedProviders: [{ ...northline, readiness: "limited", capacity: "3 jobs / week" }],
                fields: [
                  { id: "distance", label: "Distance band", type: "select", required: true, note: "Pricing level." },
                  { id: "date", label: "Preferred date", type: "date", required: true, note: "Availability check." },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "svc-printing-packaging",
        name: "Printing & Packaging",
        status: "live",
        note: "Professional design and printing for cards, flyers, posters, and banners. From concept to delivery.",
        subcategories: [
          {
            id: "sub-printing-core",
            name: "Print and packaging",
            status: "live",
            packages: [
              {
                id: "pkg-sask-print-starter",
                name: "Starter print bundle",
                status: "live",
                price: "CAD 89",
                pricingMode: "fixed",
                addOns: [addon("ao-rush", "Rush turnaround", "+CAD 25")],
                publishBlockers: [],
                assignedProviders: [paperTrail],
                fields: [
                  { id: "format", label: "Print format", type: "select", required: true, note: "Flyer, card, poster." },
                  { id: "quantity", label: "Quantity", type: "number", required: true, note: "Pricing tier." },
                ],
              },
              {
                id: "pkg-sask-print-premium",
                name: "Brand launch pack",
                status: "live",
                price: "CAD 249",
                pricingMode: "fixed",
                addOns: [addon("ao-design", "Design revision cycle", "+CAD 75"), addon("ao-delivery", "Delivery handling", "+CAD 30")],
                publishBlockers: [],
                assignedProviders: [paperTrail],
                fields: [
                  { id: "brand-kit", label: "Brand assets uploaded", type: "checkbox", required: false, note: "Optional fast-track." },
                  { id: "deadline", label: "Deadline", type: "date", required: true, note: "Production planning." },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "svc-it-ecommerce",
        name: "IT & E-commerce",
        status: "pilot",
        note: "Web design, e-commerce setup, and IT services for local businesses. Details coming soon.",
        subcategories: [
          {
            id: "sub-it-core",
            name: "Digital setup",
            status: "pilot",
            packages: [
              {
                id: "pkg-sask-it-launch",
                name: "E-commerce launch starter",
                status: "pilot",
                price: "CAD 499",
                pricingMode: "fixed",
                addOns: [addon("ao-payment", "Payment gateway setup", "+CAD 120"), addon("ao-seo", "SEO baseline", "+CAD 90")],
                publishBlockers: ["One certified partner still onboarding"],
                assignedProviders: [byteBloom],
                fields: [
                  { id: "platform", label: "Preferred platform", type: "select", required: true, note: "Shopify, WooCommerce, custom." },
                  { id: "products", label: "Initial product count", type: "number", required: true, note: "Scope estimate." },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "svc-janitorial-training",
        name: "Janitorial Training",
        status: "live",
        note: "Professional training programs for cleaning and driving. Online and offline options, individual or batch.",
        subcategories: [
          {
            id: "sub-training-core",
            name: "Training programs",
            status: "live",
            packages: [
              {
                id: "pkg-sask-train-safety",
                name: "Safety fundamentals",
                status: "live",
                price: "CAD 129 / seat",
                pricingMode: "fixed",
                addOns: [addon("ao-certificate", "Certificate dispatch", "+CAD 10")],
                publishBlockers: [],
                assignedProviders: [cleanAcademy],
                fields: [
                  { id: "batch-size", label: "Batch size", type: "number", required: true, note: "Seat planning." },
                  { id: "mode", label: "Delivery mode", type: "select", required: true, note: "Online or onsite." },
                ],
              },
              {
                id: "pkg-sask-train-equipment",
                name: "Equipment handling",
                status: "live",
                price: "CAD 149 / seat",
                pricingMode: "fixed",
                addOns: [addon("ao-drill", "Practical drill lab", "+CAD 30")],
                publishBlockers: [],
                assignedProviders: [cleanAcademy],
                fields: [
                  { id: "experience", label: "Trainee experience level", type: "select", required: true, note: "Beginner/intermediate." },
                  { id: "language", label: "Preferred language", type: "select", required: false, note: "EN/FR support." },
                ],
              },
              {
                id: "pkg-sask-train-supervisor",
                name: "Supervisor readiness",
                status: "live",
                price: "CAD 189 / seat",
                pricingMode: "fixed",
                addOns: [addon("ao-assessment", "Assessment report", "+CAD 40")],
                publishBlockers: [],
                assignedProviders: [cleanAcademy],
                fields: [
                  { id: "role", label: "Current role", type: "select", required: true, note: "Team lead or supervisor." },
                  { id: "notes", label: "Learning goals", type: "textarea", required: false, note: "Optional goals." },
                ],
              },
              {
                id: "pkg-sask-train-compliance",
                name: "Compliance refresher",
                status: "live",
                price: "CAD 99 / seat",
                pricingMode: "fixed",
                addOns: [addon("ao-audit", "Audit checklist", "+CAD 20")],
                publishBlockers: [],
                assignedProviders: [cleanAcademy],
                fields: [
                  { id: "team-count", label: "Team size", type: "number", required: true, note: "Scheduling." },
                  { id: "onsite", label: "Onsite required", type: "checkbox", required: false, note: "Travel planning." },
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
        note: "Residential cleaning is stable. Commercial and outdoor packages are in planning.",
        subcategories: [
          {
            id: "sub-apartment-condo",
            name: "Apartment / Condo",
            status: "live",
            packages: [
              {
                id: "pkg-calgary-apt-standard",
                name: "Standard clean",
                status: "live",
                price: "CAD 119 / 2h",
                pricingMode: "fixed",
                addOns: [addon("ao-oven", "Inside oven", "+CAD 25"), addon("ao-pet-hair", "Pet-hair treatment", "+CAD 15")],
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
            id: "sub-townhouse-house",
            name: "Townhouse / House",
            status: "live",
            packages: [
              {
                id: "pkg-calgary-house-standard",
                name: "Standard clean",
                status: "live",
                price: "CAD 149 / 2.5h",
                pricingMode: "fixed",
                addOns: [addon("ao-oven", "Inside oven", "+CAD 25")],
                publishBlockers: [],
                assignedProviders: [
                  {
                    id: "prov-foothills-clean",
                    name: "Foothills Clean Team",
                    readiness: "ready",
                    capacity: "22 jobs / week",
                    verification: "Verified until 2026-11-08",
                    sla: "95% on-time",
                  },
                ],
                fields: [
                  { id: "bedrooms", label: "Bedrooms", type: "select", required: true, note: "Pricing tier." },
                ],
              },
            ],
          },
          {
            id: "sub-office-space",
            name: "Office Space",
            status: "pilot",
            packages: [
              {
                id: "pkg-calgary-office-weekly",
                name: "Weekly office clean",
                status: "pilot",
                price: "CAD 260 / visit",
                pricingMode: "fixed",
                addOns: [addon("ao-consumables", "Consumables restock", "+CAD 25")],
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
        id: "svc-logistic",
        name: "Logistic",
        status: "live",
        note: "Local and provincial delivery and moving services.",
        subcategories: [
          {
            id: "sub-moving-support",
            name: "Moving support",
            status: "live",
            packages: [
              {
                id: "pkg-calgary-logi-labour",
                name: "Two-person moving crew",
                status: "live",
                price: "CAD 179 / 2h",
                pricingMode: "fixed",
                addOns: [
                  addon("ao-furniture", "Furniture disassembly", "+CAD 60"),
                  addon("ao-same-day", "Same-day premium", "+CAD 45"),
                ],
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
                ],
                fields: [
                  { id: "pickup", label: "Pickup address", type: "text", required: true, note: "Coverage check." },
                  { id: "stairs", label: "Flights of stairs", type: "number", required: true, note: "Pricing and capacity." },
                  { id: "move-date", label: "Preferred move date", type: "date", required: true, note: "Availability check." },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "svc-car-detailing",
        name: "Car Detailing",
        status: "live",
        note: "Car care options from quick wash to premium interior and exterior detailing.",
        subcategories: [
          {
            id: "sub-car-core",
            name: "Detailing packages",
            status: "live",
            packages: [
              {
                id: "pkg-calgary-car-basic",
                name: "Basic wash",
                status: "live",
                price: "CAD 55",
                pricingMode: "fixed",
                addOns: [addon("ao-wheel", "Wheel care", "+CAD 10")],
                publishBlockers: [],
                assignedProviders: [
                  {
                    id: "prov-foothills-detail",
                    name: "Foothills Auto Detail",
                    readiness: "ready",
                    capacity: "20 cars / week",
                    verification: "Verified until 2026-10-21",
                    sla: "95% on-time",
                  },
                ],
                fields: [
                  { id: "vehicle-type", label: "Vehicle type", type: "select", required: true, note: "Sedan/SUV/van." },
                  { id: "location", label: "Service location", type: "select", required: true, note: "At-home or shop." },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "svc-printing-packaging",
        name: "Printing & Packaging",
        status: "pilot",
        note: "Print and packaging services are in pilot rollout for Calgary.",
        subcategories: [
          {
            id: "sub-print-calgary",
            name: "Print bundles",
            status: "pilot",
            packages: [
              {
                id: "pkg-calgary-print-bundle",
                name: "Business print bundle",
                status: "pilot",
                price: "CAD 99",
                pricingMode: "fixed",
                addOns: [addon("ao-express", "Express print", "+CAD 30")],
                publishBlockers: ["Backup provider pending"],
                assignedProviders: [
                  {
                    id: "prov-prairie-print",
                    name: "Prairie Print Hub",
                    readiness: "limited",
                    capacity: "10 orders / week",
                    verification: "Secondary contract pending",
                    sla: "92% on-time",
                  },
                ],
                fields: [
                  { id: "product-type", label: "Product type", type: "select", required: true, note: "Cards, flyer, poster." },
                  { id: "quantity", label: "Quantity", type: "number", required: true, note: "Pricing band." },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "svc-janitorial-training",
        name: "Janitorial Training",
        status: "live",
        note: "Core janitorial training tracks available for crews and supervisors.",
        subcategories: [
          {
            id: "sub-training-calgary",
            name: "Training programs",
            status: "live",
            packages: [
              {
                id: "pkg-calgary-train-safety",
                name: "Safety fundamentals",
                status: "live",
                price: "CAD 129 / seat",
                pricingMode: "fixed",
                addOns: [addon("ao-certificate", "Certificate dispatch", "+CAD 10")],
                publishBlockers: [],
                assignedProviders: [
                  {
                    id: "prov-clean-academy-cgy",
                    name: "CleanOps Academy Calgary",
                    readiness: "ready",
                    capacity: "45 seats / week",
                    verification: "Instructor credentials verified",
                    sla: "98% session adherence",
                  },
                ],
                fields: [
                  { id: "batch-size", label: "Batch size", type: "number", required: true, note: "Seat planning." },
                  { id: "mode", label: "Delivery mode", type: "select", required: true, note: "Online or onsite." },
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
            id: "sub-apartment-condo",
            name: "Apartment / Condo",
            status: "pilot",
            packages: [
              {
                id: "pkg-winnipeg-apt-standard",
                name: "Standard clean",
                status: "pilot",
                price: "CAD 115 / 2h",
                pricingMode: "fixed",
                addOns: [addon("ao-fridge", "Inside fridge", "+CAD 10")],
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
      {
        id: "svc-logistic",
        name: "Logistic",
        status: "pilot",
        note: "Limited local delivery capacity available while partner onboarding continues.",
        subcategories: [
          {
            id: "sub-logistic-wpg",
            name: "Local delivery",
            status: "pilot",
            packages: [
              {
                id: "pkg-winnipeg-logi-basic",
                name: "Local delivery basic",
                status: "pilot",
                price: "CAD 35",
                pricingMode: "fixed",
                addOns: [addon("ao-signature", "Signature confirmation", "+CAD 5")],
                publishBlockers: ["Need second verified provider for weekend coverage"],
                assignedProviders: [
                  {
                    id: "prov-red-river-delivery",
                    name: "Red River Delivery",
                    readiness: "limited",
                    capacity: "9 jobs / week",
                    verification: "Insurance renewal in review",
                    sla: "89% on-time",
                  },
                ],
                fields: [
                  { id: "pickup", label: "Pickup address", type: "text", required: true, note: "Coverage check." },
                  { id: "dropoff", label: "Dropoff address", type: "text", required: true, note: "Routing." },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "svc-car-detailing",
        name: "Car Detailing",
        status: "paused",
        note: "Temporarily paused due to low verified provider availability.",
        subcategories: [
          {
            id: "sub-car-wpg",
            name: "Detailing packages",
            status: "paused",
            packages: [
              {
                id: "pkg-winnipeg-car-basic",
                name: "Basic wash",
                status: "paused",
                price: "CAD 45",
                pricingMode: "fixed",
                addOns: [addon("ao-wax", "Wax add-on", "+CAD 15")],
                publishBlockers: ["No ready provider available"],
                assignedProviders: [
                  {
                    id: "prov-polar-detail",
                    name: "Polar Detail Co.",
                    readiness: "blocked",
                    capacity: "Unavailable",
                    verification: "Compliance hold",
                    sla: "84% on-time",
                  },
                ],
                fields: [
                  { id: "vehicle-type", label: "Vehicle type", type: "select", required: true, note: "Sedan/SUV/van." },
                  { id: "location", label: "Service location", type: "select", required: true, note: "At-home or shop." },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "svc-janitorial-training",
        name: "Janitorial Training",
        status: "pilot",
        note: "Training demand is present; instructor expansion is in progress.",
        subcategories: [
          {
            id: "sub-training-wpg",
            name: "Training programs",
            status: "pilot",
            packages: [
              {
                id: "pkg-winnipeg-training-safety",
                name: "Safety fundamentals",
                status: "pilot",
                price: "CAD 119 / seat",
                pricingMode: "fixed",
                addOns: [addon("ao-certificate", "Certificate dispatch", "+CAD 10")],
                publishBlockers: ["Need additional certified trainer"],
                assignedProviders: [
                  {
                    id: "prov-clean-academy-wpg",
                    name: "CleanOps Academy Winnipeg",
                    readiness: "limited",
                    capacity: "14 seats / week",
                    verification: "Trainer certification refresh pending",
                    sla: "94% session adherence",
                  },
                ],
                fields: [
                  { id: "batch-size", label: "Batch size", type: "number", required: true, note: "Seat planning." },
                  { id: "mode", label: "Delivery mode", type: "select", required: true, note: "Online or onsite." },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
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

export function getRelatedPackages(locationId: string, ids: string[]) {
  return ids
    .map((id) => {
      const lineage = getLocalPackage(locationId, id);
      return lineage ? { ...lineage, locationId } : undefined;
    })
    .filter((value): value is NonNullable<typeof value> => Boolean(value));
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

function countPackagesByStatus(status: LocalStatus) {
  return serviceLocations.reduce(
    (total, location) =>
      total +
      location.services.reduce(
        (serviceTotal, service) =>
          serviceTotal +
          service.subcategories.reduce(
            (subcategoryTotal, subcategory) =>
              subcategoryTotal + subcategory.packages.filter((item) => item.status === status).length,
            0,
          ),
        0,
      ),
    0,
  );
}

const totalLocations = serviceLocations.length;
const livePackages = countPackagesByStatus("live");
const pilotPackages = countPackagesByStatus("pilot");
const totalGaps = serviceLocations.reduce((total, location) => total + countProviderGaps(location), 0);

export const locationServiceMetrics = [
  {
    label: "Configured locations",
    value: String(totalLocations),
    delta: `${serviceLocations.filter((location) => location.status === "live").length} live, ${serviceLocations.filter((location) => location.status === "pilot").length} pilot`,
    tone: "info" as const,
  },
  {
    label: "Live packages",
    value: String(livePackages),
    delta: "Customer bookable",
    tone: "success" as const,
  },
  {
    label: "Provider gaps",
    value: String(totalGaps),
    delta: "Blockers to publish",
    tone: "danger" as const,
  },
  {
    label: "Pilot packages",
    value: String(pilotPackages),
    delta: "Need rollout review",
    tone: "warning" as const,
  },
];
