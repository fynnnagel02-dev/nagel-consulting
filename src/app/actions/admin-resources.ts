"use server";

import { revalidatePath } from "next/cache";
import type { ActionResult } from "@/lib/types/actions";
import type { Database } from "@/lib/supabase/types";
import { requireAdminUser } from "@/lib/auth/guard";
import { ensureSlug } from "@/lib/utils/slug";
import { getErrorMessage, validationErrorResult } from "@/lib/utils/format";
import { getAdminResourceById } from "@/lib/queries/admin/resources";
import {
  createResourceSchema,
  updateResourceSchema,
  type CreateResourceInput,
  type UpdateResourceInput,
} from "@/lib/validations/resources";

function resolvePublishedAt(
  nextIsPublished: boolean,
  nextPublishedAt: string | null | undefined,
  previousPublishedAt?: string | null,
) {
  if (!nextIsPublished) {
    return nextPublishedAt ?? null;
  }

  if (nextPublishedAt) {
    return nextPublishedAt;
  }

  if (previousPublishedAt) {
    return previousPublishedAt;
  }

  return new Date().toISOString();
}

export async function createResource(
  input: CreateResourceInput,
): Promise<ActionResult<{ id: string }>> {
  const parsed = createResourceSchema.safeParse(input);

  if (!parsed.success) {
    return validationErrorResult(parsed.error);
  }

  try {
    const { supabase } = await requireAdminUser();
    const slug = ensureSlug(parsed.data.slug ?? parsed.data.title, parsed.data.title);
    const publishedAt = resolvePublishedAt(
      parsed.data.is_published,
      parsed.data.published_at,
    );

    const { data, error } = await supabase
      .from("resources")
      .insert({
        ...parsed.data,
        slug,
        published_at: publishedAt,
      } as never)
      .select("id")
      .single();

    if (error) {
      throw error;
    }

    revalidatePath("/resources");
    revalidatePath("/admin");

    return {
      success: true,
      message: "Resource created.",
      data,
    };
  } catch (error) {
    return {
      success: false,
      message: getErrorMessage(error),
    };
  }
}

export async function updateResource(
  input: UpdateResourceInput,
): Promise<ActionResult<{ id: string }>> {
  const parsed = updateResourceSchema.safeParse(input);

  if (!parsed.success) {
    return validationErrorResult(parsed.error);
  }

  try {
    const { supabase } = await requireAdminUser();
    const existing: Database["public"]["Tables"]["resources"]["Row"] | null =
      await getAdminResourceById(parsed.data.id);

    if (!existing) {
      return {
        success: false,
        message: "Resource not found.",
      };
    }

    const slug = ensureSlug(parsed.data.slug ?? parsed.data.title, parsed.data.title);
    const publishedAt = resolvePublishedAt(
      parsed.data.is_published,
      parsed.data.published_at,
      existing.published_at,
    );

    const { id, ...changes } = parsed.data;
    const { data, error } = await supabase
      .from("resources")
      .update({
        ...changes,
        slug,
        published_at: publishedAt,
      } as never)
      .eq("id", id)
      .select("id")
      .single();

    if (error) {
      throw error;
    }

    revalidatePath("/resources");
    revalidatePath(`/resources/${slug}`);
    revalidatePath("/admin");

    return {
      success: true,
      message: "Resource updated.",
      data,
    };
  } catch (error) {
    return {
      success: false,
      message: getErrorMessage(error),
    };
  }
}
