import "server-only";

import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function getActiveFaqItems(category?: string) {
  const supabase = await createSupabaseServerClient();
  let query = supabase
    .from("faq_items")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (category) {
    query = query.eq("category", category);
  }

  const { data, error } = await query;

  if (error) {
    throw error;
  }

  return data;
}
