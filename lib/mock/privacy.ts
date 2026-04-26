import type { AdminRole } from "./admin-shell";

export const privacyAllowedRoles: AdminRole[] = ["super-admin", "compliance-admin", "read-only-admin"];

export const privacySupportNotes = [
  "PII visibility should be minimized in list views.",
  "DSAR requests require identity verification before export.",
  "Deletion actions require legal hold check.",
];

export const dsarQueue = [
  "REQ-DSAR-2001: Access export request - waiting identity confirmation",
  "REQ-DSAR-1989: Deletion request - legal hold check pending",
  "REQ-DSAR-1977: Consent history packet - ready for release",
];
