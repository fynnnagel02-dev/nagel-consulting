import { InquiryButton } from "@/components/forms/inquiry-button";
import { getCompanyInfo } from "@/lib/queries/public/company";
import { getActiveIndustries } from "@/lib/queries/public/industries";
import { mapIndustryScenarios } from "@/lib/mappers/marketing";
import { buildMetadata } from "@/lib/seo/metadata";
import { PageHero } from "@/components/layout/page-hero";
import { SectionShell } from "@/components/layout/section-shell";
import { SectionIntro } from "@/components/layout/section-intro";
import { IndustryScenarioCard } from "@/components/content/industry-scenario";

export async function generateMetadata() {
  const company = await getCompanyInfo().catch(() => null);

  return buildMetadata({
    title: "Branchen",
    description:
      "Typische Einsatzfelder für strukturierte, sichere Webanwendungen in Handwerk, Dienstleistung und operativen Teams.",
    company,
  });
}

export default async function IndustriesPage() {
  const industries = mapIndustryScenarios(
    await getActiveIndustries().catch(() => null),
  );

  return (
    <main>
      <PageHero
        eyebrow="Branchen"
        title="Besonders wirksam dort, wo operative Verantwortung im Tagesgeschäft entsteht."
        lead="Nagel Solutions richtet sich an Unternehmen, deren Prozesse nicht nur dokumentiert, sondern täglich zuverlässig geführt werden müssen."
      />

      <SectionShell spacing="compact">
        <SectionIntro
          eyebrow="Typische Situationen"
          title="Wenn viele Beteiligte, Übergaben und Statusfragen zusammenkommen, wird Struktur geschäftskritisch."
          lead="Das betrifft Handwerk, lokale Services, einsatzgetriebene Organisationen und operative Backoffice-Teams oft stärker als klassische Wissensarbeit."
        />
      </SectionShell>

      <SectionShell tone="alt">
        <div className="grid gap-6 lg:grid-cols-2">
          {industries.map((industry) => (
            <IndustryScenarioCard key={industry.title} {...industry} />
          ))}
        </div>
      </SectionShell>

      <SectionShell spacing="compact">
        <div className="flex flex-col gap-5 rounded-[32px] border border-[var(--color-border)] bg-white p-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-3">
            <h2 className="font-display text-3xl text-[var(--color-text)]">
              Die eigentliche Frage ist selten „Welche Branche?“, sondern „Welcher
              Ablauf muss zuverlässig funktionieren?“
            </h2>
            <p className="text-base leading-8 text-[var(--color-muted)]">
              Wenn ein wiederkehrender Prozess heute zu viel Rückfrage,
              Einzelwissen oder manuelle Pflege braucht, ist das ein sinnvoller
              Ansatzpunkt.
            </p>
          </div>
          <InquiryButton
            label="Anfrage stellen"
            inquiryCategory="Individuelle Projektanfrage"
            source="industries-page"
          />
        </div>
      </SectionShell>
    </main>
  );
}
