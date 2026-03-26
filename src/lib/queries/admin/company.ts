import "server-only";

import type { Database } from "@/lib/supabase/types";
import { requireAdminUser } from "@/lib/auth/guard";

type CompanyInfoRow = Database["public"]["Tables"]["company_info"]["Row"];

export async function getAdminCompanyInfo(): Promise<CompanyInfoRow | null> {
  const { supabase } = await requireAdminUser();
  const { data, error } = await supabase
    .from("company_info")
    .select("*")
    .eq("singleton_key", "default")
    .returns<CompanyInfoRow>()
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
}
