import { z } from "zod";
import { toNullableString } from "@/lib/utils/format";

const optionalText = (max: number) =>
  z.preprocess(toNullableString, z.string().trim().max(max).nullable().optional());

const optionalDateTime = z.preprocess(
  toNullableString,
  z.iso.datetime({ offset: true }).nullable().optional(),
);

export const upsertLegalPageSchema = z.object({
  type: z.enum(["imprint", "privacy_policy"]),
  title: z.string().trim().min(1).max(200),
  content: z.string().trim().min(1),
  last_updated_at: optionalDateTime,
  is_active: z.boolean().default(true),
  seo_title: optionalText(200),
  seo_description: optionalText(300),
});

export type UpsertLegalPageInput = z.infer<typeof upsertLegalPageSchema>;
