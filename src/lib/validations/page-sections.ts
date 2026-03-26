import { z } from "zod";
import { toNullableString } from "@/lib/utils/format";

const optionalText = (max: number) =>
  z.preprocess(toNullableString, z.string().trim().max(max).nullable().optional());

const jsonRecordSchema = z.custom<Record<string, unknown> | null>((value) => {
  if (value === null || value === undefined) {
    return true;
  }

  return typeof value === "object" && !Array.isArray(value);
}, "Expected a JSON object");

const pageSectionBaseSchema = z.object({
  page_slug: z.string().trim().min(1).max(120),
  section_type: z.string().trim().min(1).max(120),
  title: optionalText(200),
  subtitle: optionalText(300),
  content: optionalText(10000),
  data_json: jsonRecordSchema.optional().default({}),
  sort_order: z.number().int().default(0),
  is_active: z.boolean().default(true),
});

export const createPageSectionSchema = pageSectionBaseSchema;

export const updatePageSectionSchema = pageSectionBaseSchema.extend({
  id: z.uuid(),
});

export type CreatePageSectionInput = z.infer<typeof createPageSectionSchema>;
export type UpdatePageSectionInput = z.infer<typeof updatePageSectionSchema>;
