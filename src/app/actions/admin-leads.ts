"use server";

import { revalidatePath } from "next/cache";
import type { ActionResult } from "@/lib/types/actions";
import { requireAdminUser } from "@/lib/auth/guard";
import {
  updateLeadStatusSchema,
  type UpdateLeadStatusInput,
} from "@/lib/validations/leads";
import { getErrorMessage, validationErrorResult } from "@/lib/utils/format";

export async function updateLeadStatus(
  input: UpdateLeadStatusInput,
): Promise<ActionResult<{ id: string }>> {
  const parsed = updateLeadStatusSchema.safeParse(input);

  if (!parsed.success) {
    return validationErrorResult(parsed.error);
  }

  try {
    const { supabase } = await requireAdminUser();
    const { data, error } = await supabase
      .from("leads")
      .update({
        status: parsed.data.status,
        internal_notes: parsed.data.internal_notes ?? null,
      } as never)
      .eq("id", parsed.data.id)
      .select("id")
      .single();

    if (error) {
      throw error;
    }

    revalidatePath("/admin");

    return {
      success: true,
      message: "Lead status updated.",
      data,
    };
  } catch (error) {
    return {
      success: false,
      message: getErrorMessage(error),
    };
  }
}
