import type { Database } from "@/lib/supabase/types";

export const ADMIN_ROLE: Database["public"]["Enums"]["profile_role"] = "admin";
export const MEMBER_ROLE: Database["public"]["Enums"]["profile_role"] = "member";

export function isAdminRole(role: Database["public"]["Enums"]["profile_role"]) {
  return role === ADMIN_ROLE;
}
