import type { Database } from "@/lib/supabase/types";

export type LeadType = Database["public"]["Enums"]["lead_type"];
export type LeadStatus = Database["public"]["Enums"]["lead_status"];

export type LeadEmailPayload = {
  type: LeadType;
  firstName: string;
  lastName: string;
  email: string;
  companyName: string | null;
  phone: string | null;
  industry: string | null;
  employeeCountRange: string | null;
  currentTool: string | null;
  processToDigitize: string | null;
  message: string | null;
  source: string | null;
  relatedSolutionSlug: string | null;
  relatedDemoId: string | null;
};
