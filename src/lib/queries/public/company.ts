import "server-only";

import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function getCompanyInfo() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("company_info")
    .select("*")
    .eq("singleton_key", "default")
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
}
