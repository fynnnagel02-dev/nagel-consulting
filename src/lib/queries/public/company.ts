import "server-only";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { CompanyInfo } from "@/lib/types/content";

export async function getCompanyInfo(): Promise<CompanyInfo | null> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("company_info")
    .select("*")
    .eq("singleton_key", "default")
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data as CompanyInfo | null;
}
