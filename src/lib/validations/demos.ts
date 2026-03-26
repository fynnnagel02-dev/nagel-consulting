import { z } from "zod";
import { toNullableString } from "@/lib/utils/format";

const optionalText = (max: number) =>
  z.preprocess(toNullableString, z.string().trim().max(max).nullable().optional());

const optionalUrl = z.preprocess(
  toNullableString,
  z.url().nullable().optional(),
);

const demoBaseSchema = z.object({
  solution_id: z.uuid(),
  title: z.string().trim().min(1).max(200),
  description: optionalText(3000),
  demo_url: z.url(),
  video_url: optionalUrl,
  thumbnail_url: optionalUrl,
  is_active: z.boolean().default(true),
  sort_order: z.number().int().default(0),
});

export const createSolutionDemoSchema = demoBaseSchema;

export const updateSolutionDemoSchema = demoBaseSchema.extend({
  id: z.uuid(),
});

export type CreateSolutionDemoInput = z.infer<typeof createSolutionDemoSchema>;
export type UpdateSolutionDemoInput = z.infer<typeof updateSolutionDemoSchema>;
