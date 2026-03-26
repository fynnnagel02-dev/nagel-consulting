"use server";

import { revalidatePath } from "next/cache";
import type { ActionResult } from "@/lib/types/actions";
import { requireAdminUser } from "@/lib/auth/guard";
import { getErrorMessage, validationErrorResult } from "@/lib/utils/format";
import {
  createSolutionDemoSchema,
  updateSolutionDemoSchema,
  type CreateSolutionDemoInput,
  type UpdateSolutionDemoInput,
} from "@/lib/validations/demos";

export async function createSolutionDemo(
  input: CreateSolutionDemoInput,
): Promise<ActionResult<{ id: string }>> {
  const parsed = createSolutionDemoSchema.safeParse(input);

  if (!parsed.success) {
    return validationErrorResult(parsed.error);
  }

  try {
    const { supabase } = await requireAdminUser();
    const { data, error } = await supabase
      .from("solution_demos")
      .insert(parsed.data as never)
      .select("id")
      .single();

    if (error) {
      throw error;
    }

    revalidatePath("/demo");
    revalidatePath("/solutions");
    revalidatePath("/admin");

    return {
      success: true,
      message: "Solution demo created.",
      data,
    };
  } catch (error) {
    return {
      success: false,
      message: getErrorMessage(error),
    };
  }
}

export async function updateSolutionDemo(
  input: UpdateSolutionDemoInput,
): Promise<ActionResult<{ id: string }>> {
  const parsed = updateSolutionDemoSchema.safeParse(input);

  if (!parsed.success) {
    return validationErrorResult(parsed.error);
  }

  try {
    const { supabase } = await requireAdminUser();
    const { id, ...changes } = parsed.data;
    const { data, error } = await supabase
      .from("solution_demos")
      .update(changes as never)
      .eq("id", id)
      .select("id")
      .single();

    if (error) {
      throw error;
    }

    revalidatePath("/demo");
    revalidatePath("/solutions");
    revalidatePath("/admin");

    return {
      success: true,
      message: "Solution demo updated.",
      data,
    };
  } catch (error) {
    return {
      success: false,
      message: getErrorMessage(error),
    };
  }
}
