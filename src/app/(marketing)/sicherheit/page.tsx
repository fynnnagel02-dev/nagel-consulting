import Link from "next/link";
import { InquiryButton } from "@/components/forms/inquiry-button";
import { getCompanyInfo } from "@/lib/queries/public/company";
import { getActiveSecurityFeatures } from "@/lib/queries/public/security";
import { mapSecurityPillars } from "@/lib/mappers/marketing";
import { buildMetadata } from "@/lib/seo/metadata";
import { PageHero } from "@/components/layout/page-hero";
import { SectionShell } from "@/components/layout/section-shell";
import { TrustPillar } from "@/components/content/trust-pillar";

export async function generateMetadata() {
  const company = await getCompanyInfo().catch(() => null);

  return buildMetadata({
    title: "Sicherheit",
    description:
      "Geschäftsnahe Sicherheitslogik für Rollen, Zugriffe, Anmeldung und nachvollziehbare Prozesshistorie.",
    company,
  });
}

export default async function SecurityPage() {
  const pillars = mapSecurityPillars(
    await getActiveSecurityFeatures().catch(() => null),
  );

  return (
    <main>
      <PageHero
        eyebrow="Sicherheit"
        title="Vertrauen entsteht dort, wo Zugriffe, Verantwortung und Historie klar geregelt sind."
        lead="Sicherheit ist auf dieser Seite kein technischer Selbstzweck. Sie ist ein Teil der betrieblichen Ordnung: Wer sieht was, wer entscheidet was und wie bleibt ein Prozess später nachvollziehbar?"
      />

      <SectionShell>
        <div>
          {pillars.map((pillar) => (
            <TrustPillar key={pillar.title} {...pillar} />
          ))}
        </div>
      </SectionShell>

      <SectionShell tone="alt" spacing="compact">
        <div className="grid gap-8 lg:grid-cols-[1.05fr,0.95fr]">
          <div className="space-y-4">
            <h2 className="font-display text-3xl text-[var(--color-text)]">
              Verständlich formuliert statt technischer Merkmalliste
            </h2>
            <p className="text-base leading-8 text-[var(--color-muted)]">
              Rollenbasierter Zugriff bedeutet in der Praxis: Die richtigen
              Personen sehen die richtigen Informationen. Optionale 2FA bedeutet:
              sensible Prozesse können zusätzlich abgesichert werden.
              Nachvollziehbare Historie bedeutet: Verantwortung bleibt später
              einordenbar.
            </p>
          </div>
          <div className="rounded-[32px] border border-[var(--color-border)] bg-white p-8">
            <div className="space-y-4">
              <h3 className="font-display text-2xl text-[var(--color-text)]">
                Sicherheit im Kontext Ihres Prozesses besprechen
              </h3>
              <p className="text-sm leading-7 text-[var(--color-muted)]">
                Gerade bei internen Freigaben, sensiblen Kundendaten oder
                mehrstufigen Zuständigkeiten lohnt sich eine frühe Einordnung.
              </p>
              <InquiryButton
                label="Anfrage stellen"
                inquiryCategory="Sicherheitslösung"
                source="security-page"
              />
            </div>
          </div>
        </div>
      </SectionShell>
    </main>
  );
}
