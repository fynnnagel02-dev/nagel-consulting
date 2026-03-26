import "server-only";

import { requireAdminUser } from "@/lib/auth/guard";

export async function getSolutionDemos(solutionId?: string) {
  const { supabase } = await requireAdminUser();
  let query = supabase
    .from("solution_demos")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (solutionId) {
    query = query.eq("solution_id", solutionId);
  }

  const { data, error } = await query;

  if (error) {
    throw error;
  }

  return data;
}
