export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Enums: {
      cta_type: "contact" | "demo" | "internal_link" | "external_link";
      lead_status:
        | "new"
        | "contacted"
        | "qualified"
        | "proposal_sent"
        | "won"
        | "lost";
      lead_type: "contact" | "project_request" | "demo_request";
      legal_page_type: "imprint" | "privacy_policy";
      profile_role: "member" | "admin";
    };
    Tables: {
      company_info: {
        Row: {
          address_line_1: string | null;
          address_line_2: string | null;
          city: string | null;
          company_name: string;
          contact_email: string | null;
          country: string | null;
          created_at: string;
          default_meta_description: string | null;
          default_meta_title: string | null;
          description: string | null;
          id: string;
          legal_form: string | null;
          linkedin_url: string | null;
          logo_url: string | null;
          mission: string | null;
          owner_name: string | null;
          postal_code: string | null;
          primary_cta_href: string | null;
          primary_cta_label: string | null;
          primary_email: string | null;
          primary_phone: string | null;
          secondary_cta_href: string | null;
          secondary_cta_label: string | null;
          singleton_key: string;
          tagline: string | null;
          updated_at: string;
          vision: string | null;
          wordmark_url: string | null;
        };
        Insert: {
          address_line_1?: string | null;
          address_line_2?: string | null;
          city?: string | null;
          company_name: string;
          contact_email?: string | null;
          country?: string | null;
          created_at?: string;
          default_meta_description?: string | null;
          default_meta_title?: string | null;
          description?: string | null;
          id?: string;
          legal_form?: string | null;
          linkedin_url?: string | null;
          logo_url?: string | null;
          mission?: string | null;
          owner_name?: string | null;
          postal_code?: string | null;
          primary_cta_href?: string | null;
          primary_cta_label?: string | null;
          primary_email?: string | null;
          primary_phone?: string | null;
          secondary_cta_href?: string | null;
          secondary_cta_label?: string | null;
          singleton_key?: string;
          tagline?: string | null;
          updated_at?: string;
          vision?: string | null;
          wordmark_url?: string | null;
        };
        Update: {
          address_line_1?: string | null;
          address_line_2?: string | null;
          city?: string | null;
          company_name?: string;
          contact_email?: string | null;
          country?: string | null;
          created_at?: string;
          default_meta_description?: string | null;
          default_meta_title?: string | null;
          description?: string | null;
          id?: string;
          legal_form?: string | null;
          linkedin_url?: string | null;
          logo_url?: string | null;
          mission?: string | null;
          owner_name?: string | null;
          postal_code?: string | null;
          primary_cta_href?: string | null;
          primary_cta_label?: string | null;
          primary_email?: string | null;
          primary_phone?: string | null;
          secondary_cta_href?: string | null;
          secondary_cta_label?: string | null;
          singleton_key?: string;
          tagline?: string | null;
          updated_at?: string;
          vision?: string | null;
          wordmark_url?: string | null;
        };
      };
      faq_items: {
        Row: {
          answer: string;
          category: string | null;
          created_at: string;
          id: string;
          is_active: boolean;
          question: string;
          sort_order: number;
          updated_at: string;
        };
        Insert: {
          answer: string;
          category?: string | null;
          created_at?: string;
          id?: string;
          is_active?: boolean;
          question: string;
          sort_order?: number;
          updated_at?: string;
        };
        Update: {
          answer?: string;
          category?: string | null;
          created_at?: string;
          id?: string;
          is_active?: boolean;
          question?: string;
          sort_order?: number;
          updated_at?: string;
        };
      };
      industries: {
        Row: {
          created_at: string;
          description: string | null;
          id: string;
          is_active: boolean;
          name: string;
          seo_description: string | null;
          seo_title: string | null;
          slug: string;
          typical_problems: string | null;
          typical_use_cases: string | null;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          id?: string;
          is_active?: boolean;
          name: string;
          seo_description?: string | null;
          seo_title?: string | null;
          slug: string;
          typical_problems?: string | null;
          typical_use_cases?: string | null;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          id?: string;
          is_active?: boolean;
          name?: string;
          seo_description?: string | null;
          seo_title?: string | null;
          slug?: string;
          typical_problems?: string | null;
          typical_use_cases?: string | null;
          updated_at?: string;
        };
      };
      leads: {
        Row: {
          company_name: string | null;
          consent_privacy: boolean;
          created_at: string;
          current_tool: string | null;
          email: string;
          employee_count_range: string | null;
          first_name: string;
          id: string;
          industry: string | null;
          internal_notes: string | null;
          last_name: string;
          message: string | null;
          phone: string | null;
          process_to_digitize: string | null;
          related_demo_id: string | null;
          related_solution_slug: string | null;
          source: string | null;
          status: Database["public"]["Enums"]["lead_status"];
          type: Database["public"]["Enums"]["lead_type"];
          updated_at: string;
        };
        Insert: {
          company_name?: string | null;
          consent_privacy: boolean;
          created_at?: string;
          current_tool?: string | null;
          email: string;
          employee_count_range?: string | null;
          first_name: string;
          id?: string;
          industry?: string | null;
          internal_notes?: string | null;
          last_name: string;
          message?: string | null;
          phone?: string | null;
          process_to_digitize?: string | null;
          related_demo_id?: string | null;
          related_solution_slug?: string | null;
          source?: string | null;
          status?: Database["public"]["Enums"]["lead_status"];
          type: Database["public"]["Enums"]["lead_type"];
          updated_at?: string;
        };
        Update: {
          company_name?: string | null;
          consent_privacy?: boolean;
          created_at?: string;
          current_tool?: string | null;
          email?: string;
          employee_count_range?: string | null;
          first_name?: string;
          id?: string;
          industry?: string | null;
          internal_notes?: string | null;
          last_name?: string;
          message?: string | null;
          phone?: string | null;
          process_to_digitize?: string | null;
          related_demo_id?: string | null;
          related_solution_slug?: string | null;
          source?: string | null;
          status?: Database["public"]["Enums"]["lead_status"];
          type?: Database["public"]["Enums"]["lead_type"];
          updated_at?: string;
        };
      };
      legal_pages: {
        Row: {
          content: string;
          created_at: string;
          id: string;
          is_active: boolean;
          last_updated_at: string;
          seo_description: string | null;
          seo_title: string | null;
          title: string;
          type: Database["public"]["Enums"]["legal_page_type"];
          updated_at: string;
        };
        Insert: {
          content: string;
          created_at?: string;
          id?: string;
          is_active?: boolean;
          last_updated_at?: string;
          seo_description?: string | null;
          seo_title?: string | null;
          title: string;
          type: Database["public"]["Enums"]["legal_page_type"];
          updated_at?: string;
        };
        Update: {
          content?: string;
          created_at?: string;
          id?: string;
          is_active?: boolean;
          last_updated_at?: string;
          seo_description?: string | null;
          seo_title?: string | null;
          title?: string;
          type?: Database["public"]["Enums"]["legal_page_type"];
          updated_at?: string;
        };
      };
      page_sections: {
        Row: {
          content: string | null;
          created_at: string;
          data_json: Json;
          id: string;
          is_active: boolean;
          page_slug: string;
          section_type: string;
          sort_order: number;
          subtitle: string | null;
          title: string | null;
          updated_at: string;
        };
        Insert: {
          content?: string | null;
          created_at?: string;
          data_json?: Json;
          id?: string;
          is_active?: boolean;
          page_slug: string;
          section_type: string;
          sort_order?: number;
          subtitle?: string | null;
          title?: string | null;
          updated_at?: string;
        };
        Update: {
          content?: string | null;
          created_at?: string;
          data_json?: Json;
          id?: string;
          is_active?: boolean;
          page_slug?: string;
          section_type?: string;
          sort_order?: number;
          subtitle?: string | null;
          title?: string | null;
          updated_at?: string;
        };
      };
      profiles: {
        Row: {
          created_at: string;
          email: string;
          full_name: string | null;
          id: string;
          role: Database["public"]["Enums"]["profile_role"];
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          email: string;
          full_name?: string | null;
          id: string;
          role?: Database["public"]["Enums"]["profile_role"];
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          email?: string;
          full_name?: string | null;
          id?: string;
          role?: Database["public"]["Enums"]["profile_role"];
          updated_at?: string;
        };
      };
      resources: {
        Row: {
          category: string | null;
          content: string;
          created_at: string;
          excerpt: string | null;
          id: string;
          is_featured: boolean;
          is_published: boolean;
          published_at: string | null;
          seo_description: string | null;
          seo_title: string | null;
          slug: string;
          tags: string[];
          thumbnail_url: string | null;
          title: string;
          updated_at: string;
        };
        Insert: {
          category?: string | null;
          content: string;
          created_at?: string;
          excerpt?: string | null;
          id?: string;
          is_featured?: boolean;
          is_published?: boolean;
          published_at?: string | null;
          seo_description?: string | null;
          seo_title?: string | null;
          slug: string;
          tags?: string[];
          thumbnail_url?: string | null;
          title: string;
          updated_at?: string;
        };
        Update: {
          category?: string | null;
          content?: string;
          created_at?: string;
          excerpt?: string | null;
          id?: string;
          is_featured?: boolean;
          is_published?: boolean;
          published_at?: string | null;
          seo_description?: string | null;
          seo_title?: string | null;
          slug?: string;
          tags?: string[];
          thumbnail_url?: string | null;
          title?: string;
          updated_at?: string;
        };
      };
      security_features: {
        Row: {
          category: string | null;
          created_at: string;
          description: string;
          id: string;
          is_active: boolean;
          sort_order: number;
          title: string;
          updated_at: string;
        };
        Insert: {
          category?: string | null;
          created_at?: string;
          description: string;
          id?: string;
          is_active?: boolean;
          sort_order?: number;
          title: string;
          updated_at?: string;
        };
        Update: {
          category?: string | null;
          created_at?: string;
          description?: string;
          id?: string;
          is_active?: boolean;
          sort_order?: number;
          title?: string;
          updated_at?: string;
        };
      };
      solution_demos: {
        Row: {
          created_at: string;
          demo_url: string;
          description: string | null;
          id: string;
          is_active: boolean;
          solution_id: string;
          sort_order: number;
          thumbnail_url: string | null;
          title: string;
          updated_at: string;
          video_url: string | null;
        };
        Insert: {
          created_at?: string;
          demo_url: string;
          description?: string | null;
          id?: string;
          is_active?: boolean;
          solution_id: string;
          sort_order?: number;
          thumbnail_url?: string | null;
          title: string;
          updated_at?: string;
          video_url?: string | null;
        };
        Update: {
          created_at?: string;
          demo_url?: string;
          description?: string | null;
          id?: string;
          is_active?: boolean;
          solution_id?: string;
          sort_order?: number;
          thumbnail_url?: string | null;
          title?: string;
          updated_at?: string;
          video_url?: string | null;
        };
      };
      solution_features: {
        Row: {
          description: string | null;
          id: string;
          solution_id: string;
          sort_order: number;
          title: string;
        };
        Insert: {
          description?: string | null;
          id?: string;
          solution_id: string;
          sort_order?: number;
          title: string;
        };
        Update: {
          description?: string | null;
          id?: string;
          solution_id?: string;
          sort_order?: number;
          title?: string;
        };
      };
      solutions: {
        Row: {
          category: string | null;
          created_at: string;
          cta_label: string | null;
          cta_type: Database["public"]["Enums"]["cta_type"];
          demo_url: string | null;
          id: string;
          is_active: boolean;
          is_featured: boolean;
          long_description: string | null;
          problem_statement: string | null;
          seo_description: string | null;
          seo_title: string | null;
          short_description: string | null;
          slug: string;
          sort_order: number;
          target_group: string | null;
          thumbnail_url: string | null;
          title: string;
          updated_at: string;
          value_proposition: string | null;
          video_url: string | null;
        };
        Insert: {
          category?: string | null;
          created_at?: string;
          cta_label?: string | null;
          cta_type?: Database["public"]["Enums"]["cta_type"];
          demo_url?: string | null;
          id?: string;
          is_active?: boolean;
          is_featured?: boolean;
          long_description?: string | null;
          problem_statement?: string | null;
          seo_description?: string | null;
          seo_title?: string | null;
          short_description?: string | null;
          slug: string;
          sort_order?: number;
          target_group?: string | null;
          thumbnail_url?: string | null;
          title: string;
          updated_at?: string;
          value_proposition?: string | null;
          video_url?: string | null;
        };
        Update: {
          category?: string | null;
          created_at?: string;
          cta_label?: string | null;
          cta_type?: Database["public"]["Enums"]["cta_type"];
          demo_url?: string | null;
          id?: string;
          is_active?: boolean;
          is_featured?: boolean;
          long_description?: string | null;
          problem_statement?: string | null;
          seo_description?: string | null;
          seo_title?: string | null;
          short_description?: string | null;
          slug?: string;
          sort_order?: number;
          target_group?: string | null;
          thumbnail_url?: string | null;
          title?: string;
          updated_at?: string;
          value_proposition?: string | null;
          video_url?: string | null;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
  };
};
