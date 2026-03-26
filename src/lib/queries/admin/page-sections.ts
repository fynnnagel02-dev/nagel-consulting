import "server-only";

import { requireAdminUser } from "@/lib/auth/guard";

export async function getAdminPageSections(pageSlug?: string) {
  const { supabase } = await requireAdminUser();
  let query = supabase
    .from("page_sections")
    .select("*")
    .order("page_slug", { ascending: true })
    .order("sort_order", { ascending: true });

  if (pageSlug) {
    query = query.eq("page_slug", pageSlug);
  }

  const { data, error } = await query;

  if (error) {
    throw error;
  }

  return data;
}
