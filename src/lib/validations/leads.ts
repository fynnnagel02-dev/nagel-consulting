import { z } from "zod";
import { inquiryCategoryOptions } from "@/lib/leads/inquiry";
import { toNullableString } from "@/lib/utils/format";

const trimmedString = (max: number) => z.string().trim().min(1).max(max);

const optionalText = (max: number) =>
  z.preprocess(toNullableString, z.string().trim().max(max).nullable().optional());

const optionalEmail = z.preprocess(
  (value) => (typeof value === "string" ? value.trim().toLowerCase() : value),
  z.email(),
);

const optionalBoolean = z.preprocess((value) => {
  if (value === "true" || value === true || value === "on") {
    return true;
  }

  return value;
}, z.literal(true));

const inquiryCategorySchema = z.enum(
  inquiryCategoryOptions.map((option) => option.value) as [
    (typeof inquiryCategoryOptions)[number]["value"],
    ...(typeof inquiryCategoryOptions)[number]["value"][],
  ],
);

const baseLeadSchema = z.object({
  first_name: trimmedString(100),
  last_name: trimmedString(100),
  company_name: optionalText(200),
  email: optionalEmail,
  phone: optionalText(50),
  industry: optionalText(120),
  employee_count_range: optionalText(50),
  current_tool: optionalText(200),
  process_to_digitize: optionalText(3000),
  inquiry_category: inquiryCategorySchema.optional(),
  message: optionalText(5000),
  source: optionalText(120),
  consent_privacy: optionalBoolean,
  related_solution_slug: optionalText(120),
  related_demo_id: z
    .preprocess(toNullableString, z.uuid().nullable().optional()),
});

export const contactLeadSchema = baseLeadSchema.extend({
  message: trimmedString(5000),
});

export const projectRequestSchema = baseLeadSchema.extend({
  company_name: trimmedString(200),
  process_to_digitize: trimmedString(3000),
  message: trimmedString(5000),
});

export const demoRequestSchema = baseLeadSchema.extend({
  message: optionalText(5000),
});

export const inquiryLeadSchema = baseLeadSchema.extend({
  company_name: trimmedString(200),
  process_to_digitize: trimmedString(3000),
  inquiry_category: inquiryCategorySchema,
  message: optionalText(5000),
});

export const updateLeadStatusSchema = z.object({
  id: z.uuid(),
  status: z.enum([
    "new",
    "contacted",
    "qualified",
    "proposal_sent",
    "won",
    "lost",
  ]),
  internal_notes: optionalText(5000),
});

export type ContactLeadInput = z.infer<typeof contactLeadSchema>;
export type ProjectRequestInput = z.infer<typeof projectRequestSchema>;
export type DemoRequestInput = z.infer<typeof demoRequestSchema>;
export type InquiryLeadInput = z.infer<typeof inquiryLeadSchema>;
export type UpdateLeadStatusInput = z.infer<typeof updateLeadStatusSchema>;
