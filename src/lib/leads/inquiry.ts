export const inquiryCategoryOptions = [
  {
    value: "Beratungsanfrage",
    label: "Beratungsanfrage",
  },
  {
    value: "Individuelle Projektanfrage",
    label: "Individuelle Projektanfrage",
  },
  {
    value: "Standardisierte Lösungsanfrage",
    label: "Standardisierte Lösungsanfrage",
  },
  {
    value: "Sicherheitslösung",
    label: "Sicherheitslösung",
  },
] as const;

export type InquiryCategory = (typeof inquiryCategoryOptions)[number]["value"];

export const defaultInquiryCategory: InquiryCategory = "Beratungsanfrage";

export function getInquiryCategoryFromLeadType(type: string): InquiryCategory {
  switch (type) {
    case "project_request":
      return "Individuelle Projektanfrage";
    case "demo_request":
      return "Beratungsanfrage";
    case "contact":
    default:
      return "Beratungsanfrage";
  }
}

export function getLeadTypeForInquiryCategory(category: InquiryCategory) {
  switch (category) {
    case "Individuelle Projektanfrage":
    case "Standardisierte Lösungsanfrage":
    case "Sicherheitslösung":
      return "project_request" as const;
    case "Beratungsanfrage":
    default:
      return "contact" as const;
  }
}
