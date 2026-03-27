import "server-only";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Industry } from "@/lib/types/content";

export async function getActiveIndustries(): Promise<Industry[]> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("industries")
    .select("*")
    .eq("is_active", true)
    .order("name", { ascending: true });

  if (error) {
    throw error;
  }

  return (data ?? []) as Industry[];
}
