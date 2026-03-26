import { z } from "zod";
import { toNullableString } from "@/lib/utils/format";

const optionalText = (max: number) =>
  z.preprocess(toNullableString, z.string().trim().max(max).nullable().optional());

const optionalUrl = z.preprocess(
  toNullableString,
  z.url().nullable().optional(),
);

const optionalDateTime = z.preprocess(
  toNullableString,
  z.iso.datetime({ offset: true }).nullable().optional(),
);

const tagsSchema = z.preprocess((value) => {
  if (Array.isArray(value)) {
    return value;
  }

  if (typeof value === "string") {
    return value
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
  }

  return [];
}, z.array(z.string().trim().min(1).max(50)).default([]));

const resourceBaseSchema = z.object({
  title: z.string().trim().min(1).max(200),
  slug: z
    .string()
    .trim()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    .optional(),
  excerpt: optionalText(500),
  content: z.string().trim().min(1),
  category: optionalText(120),
  tags: tagsSchema,
  thumbnail_url: optionalUrl,
  seo_title: optionalText(200),
  seo_description: optionalText(300),
  is_published: z.boolean().default(false),
  is_featured: z.boolean().default(false),
  published_at: optionalDateTime,
});

export const createResourceSchema = resourceBaseSchema;

export const updateResourceSchema = resourceBaseSchema.extend({
  id: z.uuid(),
});

export type CreateResourceInput = z.infer<typeof createResourceSchema>;
export type UpdateResourceInput = z.infer<typeof updateResourceSchema>;
