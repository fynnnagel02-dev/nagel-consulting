import "server-only";

import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function getPublishedResources() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("resources")
    .select("*")
    .eq("is_published", true)
    .not("published_at", "is", null)
    .order("published_at", { ascending: false, nullsFirst: false });

  if (error) {
    throw error;
  }

  return data;
}

export async function getFeaturedResources() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("resources")
    .select("*")
    .eq("is_published", true)
    .eq("is_featured", true)
    .not("published_at", "is", null)
    .order("published_at", { ascending: false, nullsFirst: false });

  if (error) {
    throw error;
  }

  return data;
}

export async function getResourceBySlug(slug: string) {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("resources")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
}
