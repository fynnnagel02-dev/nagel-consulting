import "server-only";

import type { SolutionWithRelations } from "@/lib/types/content";
import { requireAdminUser } from "@/lib/auth/guard";

export async function getAdminSolutionById(id: string) {
  const { supabase } = await requireAdminUser();
  const { data, error } = await supabase
    .from("solutions")
    .select("*, solution_features(*), solution_demos(*)")
    .eq("id", id)
    .maybeSingle<SolutionWithRelations>();

  if (error) {
    throw error;
  }

  return data;
}
