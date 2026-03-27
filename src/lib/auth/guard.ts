import "server-only";

import { redirect } from "next/navigation";
import { isAdminRole } from "@/lib/auth/roles";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/supabase/types";

type ProfileRow = Database["public"]["Tables"]["profiles"]["Row"];

export async function requireAuthenticatedUser() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, email, full_name, role, created_at, updated_at")
    .eq("id", user.id)
    .maybeSingle();

  const typedProfile = profile as ProfileRow | null;

  if (!typedProfile) {
    redirect("/");
  }

  return {
    supabase,
    user,
    profile: typedProfile,
  };
}

export async function requireAdminUser() {
  const context = await requireAuthenticatedUser();

  if (!isAdminRole(context.profile.role)) {
    redirect("/");
  }

  return context;
}
