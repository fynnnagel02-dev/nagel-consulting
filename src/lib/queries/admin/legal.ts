import "server-only";

import type { Database } from "@/lib/supabase/types";
import { requireAdminUser } from "@/lib/auth/guard";

export async function getAdminLegalPageByType(
  type: Database["public"]["Enums"]["legal_page_type"],
) {
  const { supabase } = await requireAdminUser();
  const { data, error } = await supabase
    .from("legal_pages")
    .select("*")
    .eq("type", type)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
}
