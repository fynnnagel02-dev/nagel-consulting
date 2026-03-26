import "server-only";

import type { Database } from "@/lib/supabase/types";
import { requireAdminUser } from "@/lib/auth/guard";

type ResourceRow = Database["public"]["Tables"]["resources"]["Row"];

export async function getAdminResourceById(id: string): Promise<ResourceRow | null> {
  const { supabase } = await requireAdminUser();
  const { data, error } = await supabase
    .from("resources")
    .select("*")
    .eq("id", id)
    .returns<ResourceRow>()
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
}
