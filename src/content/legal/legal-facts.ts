import type { LegalFactKey } from "@/types";

// Single source for the company-specific legal facts that the lawyer/client still has to confirm.
// Every value is a visible "TODO:" placeholder on purpose — the legal pages render these verbatim so
// each blank is easy to find and fill before go-live. Do NOT invent any of these values.
//
// Legal-basis note: the Privacy Policy defaults to PIPEDA (federal). If the confirmed `province` is
// Quebec the wording must be adapted for Law 25, and for British Columbia / Alberta for PIPA; until the
// province is confirmed we keep the PIPEDA baseline and flag it here.
export const legalFacts: Record<LegalFactKey, string> = {
  entityName: "TODO: registered legal entity name",
  businessNumber: "TODO: business/registration number",
  province: "TODO: registered province",
  registeredAddress: "TODO: registered office address",
  privacyOfficerName: "TODO: Privacy Officer name",
  privacyOfficerEmail: "TODO: Privacy Officer email",
  privacyOfficerPhone: "TODO: Privacy Officer phone",
  retentionPeriod: "TODO: data-retention period",
  governingProvince: "TODO: governing-law province",
};

// The date all three legal documents were last revised. Bump this whenever the wording changes —
// it is the "Last updated" line shown on each page and the signal visitors rely on.
export const legalLastUpdated = "2026-06-18";
