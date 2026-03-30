import type { Metadata } from "next";
import { OFFICIAL_COMPANY } from "@/lib/brand/company";
import type { CompanyInfo } from "@/lib/types/content";

const defaultDescription =
  "Nagel Solutions digitalisiert operative Abläufe von Handwerksbetrieben, Dienstleistern und mittelständischen Unternehmen mit strukturierten, sicheren Webanwendungen.";

export function buildMetadata(input: {
  title: string;
  description?: string | null;
  company?: CompanyInfo | null;
}): Metadata {
  const companyName = input.company?.company_name ?? OFFICIAL_COMPANY.name;
  const metaTitle = `${input.title} | ${companyName}`;
  const metaDescription =
    input.description ??
    input.company?.default_meta_description ??
    defaultDescription;

  return {
    title: metaTitle,
    description: metaDescription,
  };
}
