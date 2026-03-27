"use server";

import { revalidatePath } from "next/cache";
import type { ActionResult } from "@/lib/types/actions";
import { requireAdminUser } from "@/lib/auth/guard";
import { getErrorMessage, validationErrorResult } from "@/lib/utils/format";
import {
  createPageSectionSchema,
  updatePageSectionSchema,
  type CreatePageSectionInput,
  type UpdatePageSectionInput,
} from "@/lib/validations/page-sections";
import {
  upsertLegalPageSchema,
  type UpsertLegalPageInput,
} from "@/lib/validations/legal";

export async function createPageSection(
  input: CreatePageSectionInput,
): Promise<ActionResult<{ id: string }>> {
  const parsed = createPageSectionSchema.safeParse(input);

  if (!parsed.success) {
    return validationErrorResult(parsed.error);
  }

  try {
    const { supabase } = await requireAdminUser();
    const { data, error } = await supabase
      .from("page_sections")
      .insert({
        ...parsed.data,
        data_json: parsed.data.data_json ?? {},
      } as never)
      .select("id")
      .single();

    if (error) {
      throw error;
    }

    revalidatePath(`/${parsed.data.page_slug}`);
    revalidatePath("/admin");

    return {
      success: true,
      message: "Page section created.",
      data,
    };
  } catch (error) {
    return {
      success: false,
      message: getErrorMessage(error),
    };
  }
}

export async function updatePageSection(
  input: UpdatePageSectionInput,
): Promise<ActionResult<{ id: string }>> {
  const parsed = updatePageSectionSchema.safeParse(input);

  if (!parsed.success) {
    return validationErrorResult(parsed.error);
  }

  try {
    const { supabase } = await requireAdminUser();
    const { id, ...changes } = parsed.data;
    const { data, error } = await supabase
      .from("page_sections")
      .update({
        ...changes,
        data_json: changes.data_json ?? {},
      } as never)
      .eq("id", id)
      .select("id")
      .single();

    if (error) {
      throw error;
    }

    revalidatePath(`/${parsed.data.page_slug}`);
    revalidatePath("/admin");

    return {
      success: true,
      message: "Page section updated.",
      data,
    };
  } catch (error) {
    return {
      success: false,
      message: getErrorMessage(error),
    };
  }
}

export async function upsertLegalPage(
  input: UpsertLegalPageInput,
): Promise<ActionResult<{ id: string }>> {
  const parsed = upsertLegalPageSchema.safeParse(input);

  if (!parsed.success) {
    return validationErrorResult(parsed.error);
  }

  try {
    const { supabase } = await requireAdminUser();
    const { data, error } = await supabase
      .from("legal_pages")
      .upsert(
        ({
          ...parsed.data,
          last_updated_at:
            parsed.data.last_updated_at ?? new Date().toISOString(),
        } as never),
        {
          onConflict: "type",
        },
      )
      .select("id")
      .single();

    if (error) {
      throw error;
    }

    revalidatePath("/impressum");
    revalidatePath("/datenschutz");
    revalidatePath("/admin");

    return {
      success: true,
      message: "Legal page saved.",
      data,
    };
  } catch (error) {
    return {
      success: false,
      message: getErrorMessage(error),
    };
  }
}
