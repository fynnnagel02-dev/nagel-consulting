import "server-only";

import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function getActiveIndustries() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("industries")
    .select("*")
    .eq("is_active", true)
    .order("name", { ascending: true });

  if (error) {
    throw error;
  }

  return data;
}
