import type { AdminRole } from "./admin-shell";

export type VerificationStatus = "pending-review" | "approved" | "rejected" | "needs-resubmission" | "expired-soon";
export type SubjectType = "provider" | "worker";
export type DocumentType = "government-id" | "business-license" | "insurance" | "police-check" | "certification";

export type VerificationRecord = {
  createdAt: string;
  documentType: DocumentType;
  entityId: string;
  entityName: string;
  expiryDate: string;
  id: string;
  status: VerificationStatus;
  subjectType: SubjectType;
  territory: string;
};

export type VerificationProfile = VerificationRecord & {
  auditHistory: {
    actor: string;
    details: string;
    timestamp: string;
    tone: "info" | "warning" | "danger" | "success";
    title: string;
  }[];
  metadata: { label: string; value: string }[];
  requestChecklist: string[];
};

export const complianceAllowedRoles: AdminRole[] = ["super-admin", "compliance-admin", "read-only-admin"];

export const verificationStatusTone: Record<VerificationStatus, "success" | "warning" | "danger" | "info"> = {
  "pending-review": "warning",
  approved: "success",
  rejected: "danger",
  "needs-resubmission": "warning",
  "expired-soon": "warning",
};

export const subjectTypeLabel: Record<SubjectType, string> = {
  provider: "Provider",
  worker: "Worker",
};

export const documentTypeLabel: Record<DocumentType, string> = {
  "government-id": "Government ID",
  "business-license": "Business License",
  insurance: "Insurance",
  "police-check": "Police Check",
  certification: "Certification",
};

export const complianceMetrics = [
  { label: "Pending verifications", value: "27", delta: "Provider and worker submissions", tone: "warning" as const },
  { label: "Expiring in 30 days", value: "14", delta: "Need renewal outreach", tone: "danger" as const },
  { label: "Approved this week", value: "61", delta: "With audit notes complete", tone: "success" as const },
  { label: "Resubmission requested", value: "9", delta: "Missing or invalid metadata", tone: "info" as const },
];

const records: VerificationProfile[] = [
  {
    id: "DOCV-2001",
    entityId: "PRV-0199",
    entityName: "Prairie Shine Co.",
    subjectType: "provider",
    documentType: "insurance",
    status: "pending-review",
    territory: "Central Saskatchewan",
    createdAt: "Today 09:14",
    expiryDate: "2026-11-04",
    metadata: [
      { label: "Policy number", value: "PS-INS-8821" },
      { label: "Coverage amount", value: "CAD 2,000,000" },
      { label: "Issuer", value: "Prairie Mutual" },
      { label: "Uploaded by", value: "Adeel Khan (provider owner)" },
    ],
    requestChecklist: [
      "Upload first page showing legal entity name",
      "Provide complete policy schedule",
      "Attach signed endorsement page",
    ],
    auditHistory: [
      {
        timestamp: "Today 09:14",
        actor: "Provider portal",
        title: "Document uploaded",
        details: "Insurance renewal submitted for verification.",
        tone: "info",
      },
      {
        timestamp: "Today 09:29",
        actor: "Compliance queue",
        title: "Queued for review",
        details: "Auto-check flagged missing endorsement page.",
        tone: "warning",
      },
    ],
  },
  {
    id: "DOCV-1992",
    entityId: "WRK-8812",
    entityName: "Lara Singh",
    subjectType: "worker",
    documentType: "government-id",
    status: "approved",
    territory: "Regina Metro",
    createdAt: "Yesterday 15:02",
    expiryDate: "2029-03-11",
    metadata: [
      { label: "Document number", value: "SK-DL-***112" },
      { label: "Issuer", value: "Saskatchewan SGI" },
      { label: "Uploaded by", value: "Provider manager" },
    ],
    requestChecklist: ["Request updated scan if glare affects OCR"],
    auditHistory: [
      {
        timestamp: "Yesterday 15:11",
        actor: "Compliance Admin",
        title: "Approved",
        details: "Identity and expiry validation completed.",
        tone: "success",
      },
    ],
  },
  {
    id: "DOCV-1978",
    entityId: "WRK-7720",
    entityName: "Noah Thomas",
    subjectType: "worker",
    documentType: "police-check",
    status: "needs-resubmission",
    territory: "Southern Alberta",
    createdAt: "Yesterday 11:41",
    expiryDate: "2026-09-01",
    metadata: [
      { label: "Reference", value: "AB-PC-7099" },
      { label: "Issuer", value: "Calgary Police Service" },
      { label: "Uploaded by", value: "Worker self-upload" },
    ],
    requestChecklist: [
      "Upload all pages including signature block",
      "Provide scan with visible issue date",
    ],
    auditHistory: [
      {
        timestamp: "Yesterday 12:02",
        actor: "Compliance Admin",
        title: "Resubmission requested",
        details: "Date and signature section cropped in current upload.",
        tone: "warning",
      },
    ],
  },
  {
    id: "DOCV-1960",
    entityId: "PRV-8762",
    entityName: "SteriCare North",
    subjectType: "provider",
    documentType: "business-license",
    status: "expired-soon",
    territory: "Manitoba",
    createdAt: "3 days ago",
    expiryDate: "2026-05-12",
    metadata: [
      { label: "License number", value: "MB-BL-5510" },
      { label: "Issuer", value: "City of Winnipeg" },
      { label: "Uploaded by", value: "Provider admin" },
    ],
    requestChecklist: ["Upload renewed municipal license before expiry"],
    auditHistory: [
      {
        timestamp: "Today 08:07",
        actor: "Compliance queue",
        title: "Expiry warning raised",
        details: "License expires in under 30 days.",
        tone: "danger",
      },
    ],
  },
];

export const complianceHistory = [
  "Yesterday: 12 provider documents approved with complete audit notes.",
  "Yesterday: 3 worker police checks moved to resubmission.",
  "Today: 4 expiry alerts generated for upcoming renewals.",
  "Today: 2 rejected uploads due to tampered metadata signals.",
];

export function getComplianceRecords() {
  return records;
}

export function getComplianceRecordById(id: string) {
  return records.find((record) => record.id === id);
}
