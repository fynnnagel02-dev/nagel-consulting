import type { LeadEmailPayload } from "@/lib/types/leads";

function renderLeadDetails(lead: LeadEmailPayload) {
  return [
    ["Request type", lead.type],
    ["First name", lead.firstName],
    ["Last name", lead.lastName],
    ["Email", lead.email],
    ["Company", lead.companyName],
    ["Phone", lead.phone],
    ["Industry", lead.industry],
    ["Employee range", lead.employeeCountRange],
    ["Current tool", lead.currentTool],
    ["Process to digitize", lead.processToDigitize],
    ["Related solution", lead.relatedSolutionSlug],
    ["Related demo ID", lead.relatedDemoId],
    ["Source", lead.source],
    ["Message", lead.message],
  ]
    .filter(([, value]) => value)
    .map(([label, value]) => ({ label, value: String(value) }));
}

export function buildLeadNotificationTemplate(lead: LeadEmailPayload) {
  const rows = renderLeadDetails(lead);
  const subject = `New ${lead.type.replace("_", " ")} lead from ${lead.firstName} ${lead.lastName}`;

  const html = `
    <div style="font-family: Arial, sans-serif; color: #1c1917;">
      <h1 style="font-size: 20px; margin-bottom: 16px;">New lead received</h1>
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
  const subject = "We received your request";

  const html = `
    <div style="font-family: Arial, sans-serif; color: #1c1917;">
      <h1 style="font-size: 20px; margin-bottom: 16px;">Thanks for reaching out</h1>
      <p style="margin: 0 0 12px;">Hello ${lead.firstName},</p>
      <p style="margin: 0 0 12px;">
        We received your ${lead.type.replace("_", " ")} request and will review it as soon as possible.
      </p>
      <p style="margin: 0 0 12px;">
        If you shared project or demo details, we will use them to prepare the next step.
      </p>
      <p style="margin: 0;">Nagel Consulting</p>
    </div>
  `;

  const text = [
    `Hello ${lead.firstName},`,
    "",
    `We received your ${lead.type.replace("_", " ")} request and will review it as soon as possible.`,
    "If you shared project or demo details, we will use them to prepare the next step.",
    "",
    "Nagel Consulting",
  ].join("\n");

  return { subject, html, text };
}
