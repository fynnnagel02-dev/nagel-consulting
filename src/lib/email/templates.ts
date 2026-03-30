import type { LeadEmailPayload } from "@/lib/types/leads";
import { getInquiryCategoryFromLeadType } from "@/lib/leads/inquiry";
import { OFFICIAL_COMPANY } from "@/lib/brand/company";

function getLeadLabel(lead: LeadEmailPayload) {
  return lead.inquiryCategory ?? getInquiryCategoryFromLeadType(lead.type);
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function toHtmlParagraphs(value: string) {
  return escapeHtml(value)
    .split("\n")
    .filter(Boolean)
    .map((line) => `<p style="margin: 0 0 8px;">${line}</p>`)
    .join("");
}

function renderShell({
  eyebrow,
  title,
  intro,
  body,
  footer,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  body: string;
  footer: string;
}) {
  return `
    <div style="margin:0; padding:32px 16px; background:#f8fafc; font-family:Inter,Arial,sans-serif; color:#1f2937;">
      <div style="max-width:600px; margin:0 auto;">
        <div style="margin-bottom:16px; font-size:12px; font-weight:600; letter-spacing:0.18em; text-transform:uppercase; color:#2f4a67;">
          ${escapeHtml(OFFICIAL_COMPANY.name)}
        </div>
        <div style="background:#ffffff; border:1px solid #e5e7eb; border-radius:24px; padding:32px;">
          <div style="margin-bottom:24px;">
            <div style="margin-bottom:12px; font-size:12px; font-weight:600; letter-spacing:0.18em; text-transform:uppercase; color:#2f4a67;">
              ${escapeHtml(eyebrow)}
            </div>
            <h1 style="margin:0 0 12px; font-size:28px; line-height:1.2; font-weight:600; color:#1f2937;">
              ${escapeHtml(title)}
            </h1>
            ${
              intro
                ? `<p style="margin:0; font-size:15px; line-height:1.8; color:#6b7280;">${escapeHtml(intro)}</p>`
                : ""
            }
          </div>
          <div style="font-size:15px; line-height:1.8; color:#374151;">
            ${body}
          </div>
          <div style="margin-top:28px; border-top:1px solid #e5e7eb; padding-top:20px; font-size:13px; line-height:1.8; color:#6b7280;">
            ${footer}
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderInternalField(label: string, value: string) {
  return `
    <div style="margin-bottom:16px; border:1px solid #e5e7eb; border-radius:18px; padding:16px 18px; background:#ffffff;">
      <div style="margin-bottom:6px; font-size:12px; font-weight:600; letter-spacing:0.12em; text-transform:uppercase; color:#2f4a67;">
        ${escapeHtml(label)}
      </div>
      <div style="font-size:15px; line-height:1.7; color:#1f2937;">
        ${toHtmlParagraphs(value)}
      </div>
    </div>
  `;
}

function renderMessageCard({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  return `
    <div style="margin-bottom:16px; border:1px solid #e5e7eb; border-radius:18px; padding:18px 20px; background:#ffffff;">
      <div style="margin-bottom:8px; font-size:12px; font-weight:600; letter-spacing:0.12em; text-transform:uppercase; color:#2f4a67;">
        ${escapeHtml(title)}
      </div>
      <div style="font-size:15px; line-height:1.8; color:#1f2937;">
        ${content}
      </div>
    </div>
  `;
}

export function buildLeadNotificationTemplate(lead: LeadEmailPayload) {
  const subject = "Neue Anfrage über die Website";
  const fields = [
    ["Anfrageart", getLeadLabel(lead)],
    ["Name", `${lead.firstName} ${lead.lastName}`],
    ["E-Mail", lead.email],
    ["Unternehmen", lead.companyName],
    ["Nachricht", lead.message ?? lead.processToDigitize ?? "Keine zusätzliche Nachricht angegeben."],
    ["Quelle / Kontext", lead.source],
  ].filter(([, value]) => value) as Array<[string, string]>;

  const html = renderShell({
    eyebrow: "Interne Benachrichtigung",
    title: "Neue Anfrage eingegangen",
    intro: "Sie haben eine neue Anfrage über die Website erhalten.",
    body: fields.map(([label, value]) => renderInternalField(label, value)).join(""),
    footer:
      "Diese E-Mail wurde automatisch über die Website von Nagel Solutions versendet.",
  });

  const text = [
    "Neue Anfrage eingegangen",
    "",
    "Sie haben eine neue Anfrage über die Website erhalten.",
    "",
    ...fields.flatMap(([label, value]) => [`${label}:`, value, ""]),
    "Diese E-Mail wurde automatisch über die Website von Nagel Solutions versendet.",
  ].join("\n");

  return { subject, html, text };
}

export function buildLeadConfirmationTemplate(lead: LeadEmailPayload) {
  const subject = "Ihre Anfrage bei Nagel Solutions";

  const html = renderShell({
    eyebrow: "Anfragebestätigung",
    title: "Vielen Dank für Ihre Anfrage",
    intro: `Hallo ${lead.firstName},`,
    body: [
      renderMessageCard({
        title: "Eingang bestätigt",
        content:
          "<p style=\"margin:0 0 12px;\">Wir haben Ihre Anfrage erfolgreich erhalten und prüfen Ihr Anliegen derzeit intern.</p><p style=\"margin:0;\">Nagel Solutions wird sich zeitnah mit einer Rückmeldung bei Ihnen melden.</p>",
      }),
      renderMessageCard({
        title: "Ergänzende Informationen",
        content: `<p style="margin:0;">Falls Sie in der Zwischenzeit weitere Informationen ergänzen möchten, können Sie jederzeit auf diese E-Mail antworten oder uns direkt unter <a href="mailto:${escapeHtml(
          OFFICIAL_COMPANY.email,
        )}" style="color:#2f4a67; text-decoration:none;">${escapeHtml(
          OFFICIAL_COMPANY.email,
        )}</a> kontaktieren.</p>`,
      }),
      `<p style="margin:24px 0 0;">Mit freundlichen Grüßen<br />Nagel Solutions</p>`,
    ].join(""),
    footer: `${escapeHtml(OFFICIAL_COMPANY.name)} · ${escapeHtml(
      OFFICIAL_COMPANY.addressLine1,
    )} · ${escapeHtml(`${OFFICIAL_COMPANY.postalCode} ${OFFICIAL_COMPANY.city}`)}`,
  });

  const text = [
    "Vielen Dank für Ihre Anfrage",
    "",
    `Hallo ${lead.firstName},`,
    "",
    "Wir haben Ihre Anfrage erfolgreich erhalten und prüfen Ihr Anliegen derzeit intern.",
    "",
    "Nagel Solutions wird sich zeitnah mit einer Rückmeldung bei Ihnen melden.",
    "",
    `Falls Sie in der Zwischenzeit weitere Informationen ergänzen möchten, können Sie jederzeit auf diese E-Mail antworten oder uns direkt unter ${OFFICIAL_COMPANY.email} kontaktieren.`,
    "",
    "Mit freundlichen Grüßen",
    "Nagel Solutions",
  ].join("\n");

  return { subject, html, text };
}
