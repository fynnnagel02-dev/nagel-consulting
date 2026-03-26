import "server-only";

import type { Database } from "@/lib/supabase/types";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function getLegalPageByType(
  type: Database["public"]["Enums"]["legal_page_type"],
) {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("legal_pages")
    .select("*")
    .eq("type", type)
    .eq("is_active", true)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
}
