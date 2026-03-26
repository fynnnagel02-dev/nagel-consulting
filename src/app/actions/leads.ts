"use server";

import type { ActionResult } from "@/lib/types/actions";
import type { LeadEmailPayload } from "@/lib/types/leads";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import {
  contactLeadSchema,
  demoRequestSchema,
  projectRequestSchema,
  type ContactLeadInput,
  type DemoRequestInput,
  type ProjectRequestInput,
} from "@/lib/validations/leads";
import {
  getErrorMessage,
  objectFromFormData,
  validationErrorResult,
} from "@/lib/utils/format";
import {
  sendLeadConfirmationEmail,
  sendLeadNotificationEmail,
} from "@/lib/email/resend";

function toLeadEmailPayload(
  input: ContactLeadInput | ProjectRequestInput | DemoRequestInput,
  type: LeadEmailPayload["type"],
): LeadEmailPayload {
  return {
    type,
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

async function insertLeadAndSendEmails(
  input: ContactLeadInput | ProjectRequestInput | DemoRequestInput,
  type: LeadEmailPayload["type"],
): Promise<ActionResult> {
  const supabase = await createSupabaseServerClient();
  const payload = toLeadEmailPayload(input, type);

  const { error } = await supabase
    .from("leads")
    .insert({
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
      message: input.message ?? null,
      source: input.source ?? null,
      consent_privacy: true,
      related_solution_slug: input.related_solution_slug ?? null,
      related_demo_id: input.related_demo_id ?? null,
    } as never);

  if (error) {
    throw error;
  }

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
      ? "Your request was saved, but email delivery needs attention."
      : "Your request was submitted successfully.",
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
