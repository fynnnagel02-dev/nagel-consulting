"use server";

import { revalidatePath } from "next/cache";
import { OFFICIAL_COMPANY } from "@/lib/brand/company";
import type { ActionResult } from "@/lib/types/actions";
import type { Database } from "@/lib/supabase/types";
import { requireAdminUser } from "@/lib/auth/guard";
import { getAdminCompanyInfo } from "@/lib/queries/admin/company";
import { getErrorMessage, validationErrorResult } from "@/lib/utils/format";
import {
  updateCompanyInfoSchema,
  type UpdateCompanyInfoInput,
} from "@/lib/validations/company";

export async function updateCompanyInfo(
  input: UpdateCompanyInfoInput,
): Promise<ActionResult<{ id: string }>> {
  const parsed = updateCompanyInfoSchema.safeParse(input);

  if (!parsed.success) {
    return validationErrorResult(parsed.error);
  }

  try {
    const { supabase } = await requireAdminUser();
    const existing: Database["public"]["Tables"]["company_info"]["Row"] | null =
      await getAdminCompanyInfo();

    const payload = {
      singleton_key: "default",
      company_name:
        parsed.data.company_name ?? existing?.company_name ?? OFFICIAL_COMPANY.name,
      tagline: parsed.data.tagline ?? existing?.tagline ?? null,
      description: parsed.data.description ?? existing?.description ?? null,
      mission: parsed.data.mission ?? existing?.mission ?? null,
      vision: parsed.data.vision ?? existing?.vision ?? null,
      address_line_1:
        parsed.data.address_line_1 ??
        existing?.address_line_1 ??
        OFFICIAL_COMPANY.addressLine1,
      address_line_2: parsed.data.address_line_2 ?? existing?.address_line_2 ?? null,
      postal_code:
        parsed.data.postal_code ?? existing?.postal_code ?? OFFICIAL_COMPANY.postalCode,
      city: parsed.data.city ?? existing?.city ?? OFFICIAL_COMPANY.city,
      country: parsed.data.country ?? existing?.country ?? OFFICIAL_COMPANY.country,
      legal_form: parsed.data.legal_form ?? existing?.legal_form ?? null,
      owner_name:
        parsed.data.owner_name ?? existing?.owner_name ?? OFFICIAL_COMPANY.owner,
      logo_url: parsed.data.logo_url ?? existing?.logo_url ?? null,
      wordmark_url: parsed.data.wordmark_url ?? existing?.wordmark_url ?? null,
      primary_email:
        parsed.data.primary_email ?? existing?.primary_email ?? OFFICIAL_COMPANY.email,
      contact_email:
        parsed.data.contact_email ?? existing?.contact_email ?? OFFICIAL_COMPANY.email,
      primary_phone: parsed.data.primary_phone ?? existing?.primary_phone ?? null,
      linkedin_url: parsed.data.linkedin_url ?? existing?.linkedin_url ?? null,
      default_meta_title:
        parsed.data.default_meta_title ?? existing?.default_meta_title ?? null,
      default_meta_description:
        parsed.data.default_meta_description ??
        existing?.default_meta_description ??
        null,
      primary_cta_label:
        parsed.data.primary_cta_label ?? existing?.primary_cta_label ?? "Beratung anfragen",
      primary_cta_href:
        parsed.data.primary_cta_href ?? existing?.primary_cta_href ?? "/kontakt",
      secondary_cta_label:
        parsed.data.secondary_cta_label ?? existing?.secondary_cta_label ?? "Demo ansehen",
      secondary_cta_href:
        parsed.data.secondary_cta_href ?? existing?.secondary_cta_href ?? "/demo",
    };

    const { data, error } = await supabase
      .from("company_info")
      .upsert(payload as never, { onConflict: "singleton_key" })
      .select("id")
      .single();

    if (error) {
      throw error;
    }

    revalidatePath("/");
    revalidatePath("/ueber-uns");
    revalidatePath("/kontakt");
    revalidatePath("/admin");

    return {
      success: true,
      message: "Unternehmensinformationen wurden aktualisiert.",
      data,
    };
  } catch (error) {
    return {
      success: false,
      message: getErrorMessage(error),
    };
  }
}
