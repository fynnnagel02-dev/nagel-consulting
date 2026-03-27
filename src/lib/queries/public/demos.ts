import "server-only";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { SolutionDemo } from "@/lib/types/content";

export async function getActiveSolutionDemos(
  solutionId?: string,
): Promise<SolutionDemo[]> {
  const supabase = await createSupabaseServerClient();
  let query = supabase
    .from("solution_demos")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (solutionId) {
    query = query.eq("solution_id", solutionId);
  }

  const { data, error } = await query;

  if (error) {
    throw error;
  }

  return (data ?? []) as SolutionDemo[];
}
