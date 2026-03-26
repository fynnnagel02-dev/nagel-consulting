import { z } from "zod";
import { toNullableString } from "@/lib/utils/format";

const optionalText = (max: number) =>
  z.preprocess(toNullableString, z.string().trim().max(max).nullable().optional());

const optionalUrl = z.preprocess(
  toNullableString,
  z.url().nullable().optional(),
);

const featureSchema = z.object({
  id: z.uuid().optional(),
  title: z.string().trim().min(1).max(200),
  description: optionalText(2000),
  sort_order: z.number().int().min(0).default(0),
});

const solutionBaseSchema = z.object({
  title: z.string().trim().min(1).max(200),
  slug: z
    .string()
    .trim()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    .optional(),
  short_description: optionalText(500),
  long_description: optionalText(10000),
  category: optionalText(120),
  target_group: optionalText(300),
  problem_statement: optionalText(4000),
  value_proposition: optionalText(4000),
  demo_url: optionalUrl,
  video_url: optionalUrl,
  thumbnail_url: optionalUrl,
  seo_title: optionalText(200),
  seo_description: optionalText(300),
  is_active: z.boolean().default(true),
  is_featured: z.boolean().default(false),
  sort_order: z.number().int().default(0),
  cta_label: optionalText(120),
  cta_type: z
    .enum(["contact", "demo", "internal_link", "external_link"])
    .default("contact"),
  features: z.array(featureSchema).default([]),
});

export const createSolutionSchema = solutionBaseSchema;

export const updateSolutionSchema = solutionBaseSchema.extend({
  id: z.uuid(),
});

export type CreateSolutionInput = z.infer<typeof createSolutionSchema>;
export type UpdateSolutionInput = z.infer<typeof updateSolutionSchema>;
