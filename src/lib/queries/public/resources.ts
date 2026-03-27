import "server-only";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Resource } from "@/lib/types/content";

export async function getPublishedResources(): Promise<Resource[]> {
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

  return (data ?? []) as Resource[];
}

export async function getFeaturedResources(): Promise<Resource[]> {
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

  return (data ?? []) as Resource[];
}

export async function getResourceBySlug(slug: string): Promise<Resource | null> {
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

  return data as Resource | null;
}
