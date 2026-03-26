import type { Database } from "@/lib/supabase/types";

export type Solution = Database["public"]["Tables"]["solutions"]["Row"];
export type SolutionFeature =
  Database["public"]["Tables"]["solution_features"]["Row"];
export type SolutionDemo =
  Database["public"]["Tables"]["solution_demos"]["Row"];
export type Resource = Database["public"]["Tables"]["resources"]["Row"];
export type Industry = Database["public"]["Tables"]["industries"]["Row"];
export type SecurityFeature =
  Database["public"]["Tables"]["security_features"]["Row"];
export type FaqItem = Database["public"]["Tables"]["faq_items"]["Row"];
export type CompanyInfo = Database["public"]["Tables"]["company_info"]["Row"];
export type LegalPage = Database["public"]["Tables"]["legal_pages"]["Row"];
export type PageSection = Database["public"]["Tables"]["page_sections"]["Row"];

export type SolutionWithRelations = Solution & {
  solution_features: SolutionFeature[];
  solution_demos: SolutionDemo[];
};
