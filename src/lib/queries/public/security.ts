import "server-only";

import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function getActiveSecurityFeatures() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("security_features")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data;
}
