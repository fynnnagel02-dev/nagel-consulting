"use server";

import { revalidatePath } from "next/cache";
import type { ActionResult } from "@/lib/types/actions";
import type { Database } from "@/lib/supabase/types";
import { requireAdminUser } from "@/lib/auth/guard";
import { ensureSlug } from "@/lib/utils/slug";
import { getErrorMessage, validationErrorResult } from "@/lib/utils/format";
import {
  createSolutionSchema,
  updateSolutionSchema,
  type CreateSolutionInput,
  type UpdateSolutionInput,
} from "@/lib/validations/solutions";

type SolutionIdRow = Pick<Database["public"]["Tables"]["solutions"]["Row"], "id">;

async function replaceSolutionFeatures(
  solutionId: string,
  features: CreateSolutionInput["features"],
) {
  const { supabase } = await requireAdminUser();

  const { error: deleteError } = await supabase
    .from("solution_features")
    .delete()
    .eq("solution_id", solutionId);

  if (deleteError) {
    throw deleteError;
  }

  if (features.length === 0) {
    return;
  }

  const { error: insertError } = await supabase.from("solution_features").insert(
    features.map((feature) => ({
      solution_id: solutionId,
      title: feature.title,
      description: feature.description ?? null,
      sort_order: feature.sort_order,
    })) as never,
  );

  if (insertError) {
    throw insertError;
  }
}

export async function createSolution(
  input: CreateSolutionInput,
): Promise<ActionResult<{ id: string }>> {
  const parsed = createSolutionSchema.safeParse(input);

  if (!parsed.success) {
    return validationErrorResult(parsed.error);
  }

  try {
    const { supabase } = await requireAdminUser();
    const slug = ensureSlug(parsed.data.slug ?? parsed.data.title, parsed.data.title);
    const { features, ...solution } = parsed.data;

    const { data, error } = await supabase
      .from("solutions")
      .insert({
        ...solution,
        slug,
      } as never)
      .select("id")
      .returns<SolutionIdRow>()
      .single();

    if (error) {
      throw error;
    }

    await replaceSolutionFeatures(data.id, features);

    revalidatePath("/solutions");
    revalidatePath("/demo");
    revalidatePath("/admin");

    return {
      success: true,
      message: "Solution created.",
      data,
    };
  } catch (error) {
    return {
      success: false,
      message: getErrorMessage(error),
    };
  }
}

export async function updateSolution(
  input: UpdateSolutionInput,
): Promise<ActionResult<{ id: string }>> {
  const parsed = updateSolutionSchema.safeParse(input);

  if (!parsed.success) {
    return validationErrorResult(parsed.error);
  }

  try {
    const { supabase } = await requireAdminUser();
    const slug = ensureSlug(parsed.data.slug ?? parsed.data.title, parsed.data.title);
    const { features, id, ...solution } = parsed.data;

    const { data, error } = await supabase
      .from("solutions")
      .update({
        ...solution,
        slug,
      } as never)
      .eq("id", id)
      .select("id")
      .single();

    if (error) {
      throw error;
    }

    await replaceSolutionFeatures(id, features);

    revalidatePath("/solutions");
    revalidatePath(`/solutions/${slug}`);
    revalidatePath("/demo");
    revalidatePath("/admin");

    return {
      success: true,
      message: "Solution updated.",
      data,
    };
  } catch (error) {
    return {
      success: false,
      message: getErrorMessage(error),
    };
  }
}
