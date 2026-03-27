import type { LeadEmailPayload } from "@/lib/types/leads";

function renderLeadDetails(lead: LeadEmailPayload) {
  return [
    ["Anfrageart", lead.type],
    ["Vorname", lead.firstName],
    ["Nachname", lead.lastName],
    ["E-Mail", lead.email],
    ["Unternehmen", lead.companyName],
    ["Telefon", lead.phone],
    ["Branche", lead.industry],
    ["Mitarbeiterzahl", lead.employeeCountRange],
    ["Bisheriges Werkzeug", lead.currentTool],
    ["Zu digitalisierender Ablauf", lead.processToDigitize],
    ["Zugehörige Lösung", lead.relatedSolutionSlug],
    ["Zugehörige Demo-ID", lead.relatedDemoId],
    ["Quelle", lead.source],
    ["Nachricht", lead.message],
  ]
    .filter(([, value]) => value)
    .map(([label, value]) => ({ label, value: String(value) }));
}

export function buildLeadNotificationTemplate(lead: LeadEmailPayload) {
  const rows = renderLeadDetails(lead);
  const subject = `Neue Anfrage (${lead.type.replace("_", " ")}) von ${lead.firstName} ${lead.lastName}`;

  const html = `
    <div style="font-family: Arial, sans-serif; color: #1c1917;">
      <h1 style="font-size: 20px; margin-bottom: 16px;">Neue Anfrage eingegangen</h1>
      <table style="border-collapse: collapse; width: 100%;">
        <tbody>
          ${rows
            .map(
              (row) => `
                <tr>
                  <td style="padding: 8px 12px; border: 1px solid #e7e5e4; font-weight: 600; width: 180px;">${row.label}</td>
                  <td style="padding: 8px 12px; border: 1px solid #e7e5e4;">${row.value}</td>
                </tr>
              `,
            )
            .join("")}
        </tbody>
      </table>
    </div>
  `;

  const text = rows.map((row) => `${row.label}: ${row.value}`).join("\n");

  return { subject, html, text };
}

export function buildLeadConfirmationTemplate(lead: LeadEmailPayload) {
  const subject = "Ihre Anfrage ist bei uns eingegangen";

  const html = `
    <div style="font-family: Arial, sans-serif; color: #1c1917;">
      <h1 style="font-size: 20px; margin-bottom: 16px;">Vielen Dank für Ihre Nachricht</h1>
      <p style="margin: 0 0 12px;">Hallo ${lead.firstName},</p>
      <p style="margin: 0 0 12px;">
        wir haben Ihre Anfrage (${lead.type.replace("_", " ")}) erhalten und prüfen sie so schnell wie möglich.
      </p>
      <p style="margin: 0 0 12px;">
        Wenn Sie bereits Projekt- oder Demo-Informationen geteilt haben, nutzen wir diese zur Vorbereitung des nächsten Schritts.
      </p>
      <p style="margin: 0;">Nagel Consulting</p>
    </div>
  `;

  const text = [
    `Hallo ${lead.firstName},`,
    "",
    `wir haben Ihre Anfrage (${lead.type.replace("_", " ")}) erhalten und prüfen sie so schnell wie möglich.`,
    "Wenn Sie bereits Projekt- oder Demo-Informationen geteilt haben, nutzen wir diese zur Vorbereitung des nächsten Schritts.",
    "",
    "Nagel Consulting",
  ].join("\n");

  return { subject, html, text };
}
