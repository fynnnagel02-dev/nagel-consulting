import "server-only";

import type { Solution, SolutionWithRelations } from "@/lib/types/content";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function getActiveSolutions(): Promise<Solution[]> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("solutions")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return (data ?? []) as Solution[];
}

export async function getFeaturedSolutions(): Promise<Solution[]> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("solutions")
    .select("*")
    .eq("is_active", true)
    .eq("is_featured", true)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return (data ?? []) as Solution[];
}

export async function getSolutionBySlug(slug: string) {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("solutions")
    .select(
      "*, solution_features(*), solution_demos(*)",
    )
    .eq("slug", slug)
    .eq("is_active", true)
    .maybeSingle<SolutionWithRelations>();

  if (error) {
    throw error;
  }

  if (!data) {
    return null;
  }

  return {
    ...data,
    solution_features: [...data.solution_features].sort(
      (left, right) => left.sort_order - right.sort_order,
    ),
    solution_demos: [...data.solution_demos].sort(
      (left, right) => left.sort_order - right.sort_order,
    ),
  };
}
