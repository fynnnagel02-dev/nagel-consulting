import "server-only";

import { Resend } from "resend";
import type { LeadEmailPayload } from "@/lib/types/leads";
import { getEnv } from "@/lib/utils/env";
import {
  buildLeadConfirmationTemplate,
  buildLeadNotificationTemplate,
} from "@/lib/email/templates";

function getResendClient() {
  const env = getEnv();
  return new Resend(env.RESEND_API_KEY);
}

export async function sendLeadNotificationEmail(lead: LeadEmailPayload) {
  const env = getEnv();
  const resend = getResendClient();
  const template = buildLeadNotificationTemplate(lead);

  return resend.emails.send({
    from: env.RESEND_FROM_EMAIL,
    to: env.LEAD_NOTIFICATION_EMAIL,
    subject: template.subject,
    html: template.html,
    text: template.text,
  });
}

export async function sendLeadConfirmationEmail(lead: LeadEmailPayload) {
  const env = getEnv();
  const resend = getResendClient();
  const template = buildLeadConfirmationTemplate(lead);

  return resend.emails.send({
    from: env.RESEND_FROM_EMAIL,
    to: lead.email,
    subject: template.subject,
    html: template.html,
    text: template.text,
  });
}
