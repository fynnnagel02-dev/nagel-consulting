import "server-only";

import type { LeadStatus, LeadType } from "@/lib/types/leads";
import { requireAdminUser } from "@/lib/auth/guard";

type LeadFilters = {
  status?: LeadStatus;
  type?: LeadType;
  limit?: number;
};

export async function getLeads(filters: LeadFilters = {}) {
  const { supabase } = await requireAdminUser();
  let query = supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });

  if (filters.status) {
    query = query.eq("status", filters.status);
  }

  if (filters.type) {
    query = query.eq("type", filters.type);
  }

  if (filters.limit) {
    query = query.limit(filters.limit);
  }

  const { data, error } = await query;

  if (error) {
    throw error;
  }

  return data;
}

export async function getLeadById(id: string) {
  const { supabase } = await requireAdminUser();
  const { data, error } = await supabase
    .from("leads")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
}
