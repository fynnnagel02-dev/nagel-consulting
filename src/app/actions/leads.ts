"use server";

import type { ActionResult } from "@/lib/types/actions";
import type { LeadEmailPayload } from "@/lib/types/leads";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import {
  contactLeadSchema,
  demoRequestSchema,
  inquiryLeadSchema,
  projectRequestSchema,
  type ContactLeadInput,
  type DemoRequestInput,
  type InquiryLeadInput,
  type ProjectRequestInput,
} from "@/lib/validations/leads";
import { getLeadTypeForInquiryCategory } from "@/lib/leads/inquiry";
import {
  getErrorMessage,
  objectFromFormData,
  validationErrorResult,
} from "@/lib/utils/format";
import {
  sendLeadConfirmationEmail,
  sendLeadNotificationEmail,
} from "@/lib/email/resend";

type LeadInsertInput =
  | ContactLeadInput
  | ProjectRequestInput
  | DemoRequestInput
  | InquiryLeadInput;

function toLeadEmailPayload(
  input: ContactLeadInput | ProjectRequestInput | DemoRequestInput | InquiryLeadInput,
  type: LeadEmailPayload["type"],
): LeadEmailPayload {
  return {
    type,
    inquiryCategory: input.inquiry_category ?? null,
    firstName: input.first_name,
    lastName: input.last_name,
    email: input.email,
    companyName: input.company_name ?? null,
    phone: input.phone ?? null,
    industry: input.industry ?? null,
    employeeCountRange: input.employee_count_range ?? null,
    currentTool: input.current_tool ?? null,
    processToDigitize: input.process_to_digitize ?? null,
    message: input.message ?? null,
    source: input.source ?? null,
    relatedSolutionSlug: input.related_solution_slug ?? null,
    relatedDemoId: input.related_demo_id ?? null,
  };
}

function buildLeadInsertPayload(
  input: LeadInsertInput,
  type: LeadEmailPayload["type"],
  includeInquiryCategory: boolean,
) {
  return {
    type,
    first_name: input.first_name,
    last_name: input.last_name,
    company_name: input.company_name ?? null,
    email: input.email,
    phone: input.phone ?? null,
    industry: input.industry ?? null,
    employee_count_range: input.employee_count_range ?? null,
    current_tool: input.current_tool ?? null,
    process_to_digitize: input.process_to_digitize ?? null,
    ...(includeInquiryCategory
      ? { inquiry_category: input.inquiry_category ?? null }
      : {}),
    message: input.message ?? null,
    source: input.source ?? null,
    consent_privacy: true,
    related_solution_slug: input.related_solution_slug ?? null,
    related_demo_id: input.related_demo_id ?? null,
  };
}

function isMissingInquiryCategoryColumn(error: unknown) {
  if (
    typeof error !== "object" ||
    error === null ||
    !("message" in error) ||
    typeof error.message !== "string"
  ) {
    return false;
  }

  const message = error.message.toLowerCase();
  return message.includes("inquiry_category") && message.includes("column");
}

async function insertLead(
  input: LeadInsertInput,
  type: LeadEmailPayload["type"],
) {
  const supabase = await createSupabaseServerClient();
  const firstAttempt = await supabase
    .from("leads")
    .insert(buildLeadInsertPayload(input, type, true) as never);

  if (!firstAttempt.error) {
    return;
  }

  if (!isMissingInquiryCategoryColumn(firstAttempt.error)) {
    throw firstAttempt.error;
  }

  console.warn(
    "Leads table is missing inquiry_category. Retrying insert without inquiry category.",
    firstAttempt.error,
  );

  const fallbackAttempt = await supabase
    .from("leads")
    .insert(buildLeadInsertPayload(input, type, false) as never);

  if (fallbackAttempt.error) {
    throw fallbackAttempt.error;
  }
}

async function insertLeadAndSendEmails(
  input: LeadInsertInput,
  type: LeadEmailPayload["type"],
): Promise<ActionResult> {
  const payload = toLeadEmailPayload(input, type);

  await insertLead(input, type);

  let emailFailed = false;

  try {
    await Promise.all([
      sendLeadNotificationEmail(payload),
      sendLeadConfirmationEmail(payload),
    ]);
  } catch (emailError) {
    emailFailed = true;
    console.error("Lead email delivery failed", emailError);
  }

  return {
    success: true,
    message: emailFailed
      ? "Ihre Anfrage wurde gespeichert. Die E-Mail-Bestätigung konnte gerade nicht versendet werden."
      : "Ihre Anfrage wurde erfolgreich übermittelt.",
  };
}

export async function submitContactLead(
  input: FormData | ContactLeadInput,
): Promise<ActionResult> {
  const parsed = contactLeadSchema.safeParse(
    input instanceof FormData ? objectFromFormData(input) : input,
  );

  if (!parsed.success) {
    return validationErrorResult(parsed.error);
  }

  try {
    return await insertLeadAndSendEmails(parsed.data, "contact");
  } catch (error) {
    return {
      success: false,
      message: getErrorMessage(error),
    };
  }
}

export async function submitProjectRequest(
  input: FormData | ProjectRequestInput,
): Promise<ActionResult> {
  const parsed = projectRequestSchema.safeParse(
    input instanceof FormData ? objectFromFormData(input) : input,
  );

  if (!parsed.success) {
    return validationErrorResult(parsed.error);
  }

  try {
    return await insertLeadAndSendEmails(parsed.data, "project_request");
  } catch (error) {
    return {
      success: false,
      message: getErrorMessage(error),
    };
  }
}

export async function submitDemoRequest(
  input: FormData | DemoRequestInput,
): Promise<ActionResult> {
  const parsed = demoRequestSchema.safeParse(
    input instanceof FormData ? objectFromFormData(input) : input,
  );

  if (!parsed.success) {
    return validationErrorResult(parsed.error);
  }

  try {
    return await insertLeadAndSendEmails(parsed.data, "demo_request");
  } catch (error) {
    return {
      success: false,
      message: getErrorMessage(error),
    };
  }
}

export async function submitInquiryLead(
  input: FormData | InquiryLeadInput,
): Promise<ActionResult> {
  const parsed = inquiryLeadSchema.safeParse(
    input instanceof FormData ? objectFromFormData(input) : input,
  );

  if (!parsed.success) {
    return validationErrorResult(parsed.error);
  }

  try {
    const type = getLeadTypeForInquiryCategory(parsed.data.inquiry_category);
    return await insertLeadAndSendEmails(parsed.data, type);
  } catch (error) {
    return {
      success: false,
      message: getErrorMessage(error),
    };
  }
}
