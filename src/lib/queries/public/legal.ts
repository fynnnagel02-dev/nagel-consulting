import "server-only";

import type { Database } from "@/lib/supabase/types";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { LegalPage } from "@/lib/types/content";

export async function getLegalPageByType(
  type: Database["public"]["Enums"]["legal_page_type"],
): Promise<LegalPage | null> {
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

  return data as LegalPage | null;
}
