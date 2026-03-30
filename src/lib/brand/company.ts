export const OFFICIAL_COMPANY = {
  name: "Nagel Solutions",
  owner: "Fynn Nagel",
  addressLine1: "Bahrenfelder Steindamm 48",
  postalCode: "22761",
  city: "Hamburg",
  country: "Deutschland",
  email: "info@nagel-solutions.com",
  vatNote: "Gemäß § 19 UStG wird keine Umsatzsteuer berechnet.",
} as const;

export const IMPRESSUM_BLOCKS = [
  "Angaben gemäß § 5 TMG",
  [
    OFFICIAL_COMPANY.owner,
    OFFICIAL_COMPANY.name,
    OFFICIAL_COMPANY.addressLine1,
    `${OFFICIAL_COMPANY.postalCode} ${OFFICIAL_COMPANY.city}`,
    OFFICIAL_COMPANY.country,
  ].join("\n"),
  ["Kontakt", `E-Mail: ${OFFICIAL_COMPANY.email}`].join("\n"),
  ["Umsatzsteuer", OFFICIAL_COMPANY.vatNote].join("\n"),
  [
    "Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV",
    OFFICIAL_COMPANY.owner,
    OFFICIAL_COMPANY.addressLine1,
    `${OFFICIAL_COMPANY.postalCode} ${OFFICIAL_COMPANY.city}`,
    OFFICIAL_COMPANY.country,
  ].join("\n"),
  [
    "Haftung für Inhalte",
    "Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.",
  ].join("\n"),
  [
    "Haftung für Links",
    "Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen.",
  ].join("\n"),
  [
    "Urheberrecht",
    "Die durch den Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht.",
  ].join("\n"),
] as const;

export const DATENSCHUTZ_BLOCKS = [
  [
    "1. Allgemeine Hinweise",
    "Der Schutz Ihrer persönlichen Daten ist uns ein besonderes Anliegen. Wir verarbeiten Ihre Daten ausschließlich auf Grundlage der gesetzlichen Bestimmungen, insbesondere der DSGVO.",
  ].join("\n"),
  [
    "2. Verantwortlicher",
    OFFICIAL_COMPANY.owner,
    OFFICIAL_COMPANY.name,
    OFFICIAL_COMPANY.addressLine1,
    `${OFFICIAL_COMPANY.postalCode} ${OFFICIAL_COMPANY.city}`,
    OFFICIAL_COMPANY.country,
    `E-Mail: ${OFFICIAL_COMPANY.email}`,
  ].join("\n"),
  [
    "3. Hosting",
    "Unsere Website wird auf einer modernen Hosting-Infrastruktur betrieben. Dabei können technische Zugriffsdaten verarbeitet werden, die erforderlich sind, um die Website stabil und sicher bereitzustellen.",
  ].join("\n"),
  [
    "4. Backend und Datenbank",
    "Zur Verarbeitung und Speicherung von Daten nutzen wir eine cloudbasierte Infrastruktur. Personenbezogene Daten werden nur verarbeitet, soweit dies für den Betrieb der Website und die Bearbeitung von Anfragen erforderlich ist.",
  ].join("\n"),
  [
    "5. Datenverarbeitung bei Anfragen",
    "- Name\n- E-Mail-Adresse\n- Inhalte Ihrer Anfrage",
  ].join("\n"),
  [
    "6. Zweck",
    "- Bearbeitung von Anfragen\n- Kommunikation\n- Angebotserstellung",
  ].join("\n"),
  [
    "7. Rechtsgrundlage",
    "Art. 6 Abs. 1 lit. b DSGVO (Anfragen)\nArt. 6 Abs. 1 lit. f DSGVO (Betrieb der Website)",
  ].join("\n"),
  [
    "8. Speicherdauer",
    "Daten werden nur so lange gespeichert, wie notwendig.",
  ].join("\n"),
  [
    "9. Ihre Rechte",
    "- Auskunft\n- Berichtigung\n- Löschung\n- Widerspruch\n- Einschränkung\n- Datenübertragbarkeit",
  ].join("\n"),
  [
    "10. Datensicherheit",
    "Technische und organisatorische Maßnahmen zum Schutz der Daten.",
  ].join("\n"),
  [
    "11. Verschlüsselung",
    "Diese Website nutzt eine sichere Verbindung (SSL/TLS).",
  ].join("\n"),
  [
    "12. Server-Logs",
    "Technische Daten können zur Sicherstellung des Betriebs gespeichert werden.",
  ].join("\n"),
  [
    "13. Änderungen",
    "Diese Datenschutzerklärung kann angepasst werden.",
  ].join("\n"),
] as const;
