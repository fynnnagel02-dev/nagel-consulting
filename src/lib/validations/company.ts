import { z } from "zod";
import { toNullableString } from "@/lib/utils/format";

const optionalText = (max: number) =>
  z.preprocess(toNullableString, z.string().trim().max(max).nullable().optional());

const optionalUrl = z.preprocess(
  toNullableString,
  z.url().nullable().optional(),
);

const optionalEmail = z.preprocess(
  toNullableString,
  z.email().nullable().optional(),
);

export const updateCompanyInfoSchema = z.object({
  company_name: optionalText(200),
  tagline: optionalText(200),
  description: optionalText(4000),
  mission: optionalText(3000),
  vision: optionalText(3000),
  address_line_1: optionalText(200),
  address_line_2: optionalText(200),
  postal_code: optionalText(50),
  city: optionalText(120),
  country: optionalText(120),
  legal_form: optionalText(120),
  owner_name: optionalText(200),
  logo_url: optionalUrl,
  wordmark_url: optionalUrl,
  primary_email: optionalEmail,
  contact_email: optionalEmail,
  primary_phone: optionalText(50),
  linkedin_url: optionalUrl,
  default_meta_title: optionalText(200),
  default_meta_description: optionalText(300),
  primary_cta_label: optionalText(120),
  primary_cta_href: optionalUrl,
  secondary_cta_label: optionalText(120),
  secondary_cta_href: optionalUrl,
});

export type UpdateCompanyInfoInput = z.infer<typeof updateCompanyInfoSchema>;
