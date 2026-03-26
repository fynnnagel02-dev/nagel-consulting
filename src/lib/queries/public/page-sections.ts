import "server-only";

import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function getPageSections(pageSlug: string) {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("page_sections")
    .select("*")
    .eq("page_slug", pageSlug)
    .eq("is_active", true)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data;
}
