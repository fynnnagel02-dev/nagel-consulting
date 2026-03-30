import Link from "next/link";
import { InquiryButton } from "@/components/forms/inquiry-button";
import { getCompanyInfo } from "@/lib/queries/public/company";
import { getActiveSolutions } from "@/lib/queries/public/solutions";
import { getPageSections } from "@/lib/queries/public/page-sections";
import { getSafePageSections } from "@/lib/content/page-sections";
import { mapFeaturedSolutions } from "@/lib/mappers/marketing";
import { buildMetadata } from "@/lib/seo/metadata";
import { PageHero } from "@/components/layout/page-hero";
import { SectionShell } from "@/components/layout/section-shell";
import { SectionIntro } from "@/components/layout/section-intro";
import { SolutionPreview } from "@/components/content/solution-preview";
import { PageSectionRenderer } from "@/components/sections/page-section-renderer";

export async function generateMetadata() {
  const company = await getCompanyInfo().catch(() => null);

  return buildMetadata({
    title: "Lösungen",
    description:
      "Digitale Lösungen für Anfragebearbeitung, Freigaben, Einsatzkoordination und andere operative Kernprozesse.",
    company,
  });
}

export default async function SolutionsPage() {
  const [solutions, pageSections] = await Promise.all([
    getActiveSolutions().catch(() => null),
    getPageSections("loesungen").catch(() => null),
  ]);

  return (
    <main>
      <PageHero
        eyebrow="Lösungen"
        title="Strukturierte Anwendungen für Prozesse, die im Alltag zuverlässig funktionieren müssen."
        lead="Nagel Solutions entwickelt digitale Lösungen dort, wo operative Abläufe heute durch Mehrfacheingaben, unklare Zuständigkeiten und informelle Abstimmung gebremst werden."
      />

      <SectionShell spacing="compact">
        <SectionIntro
          eyebrow="Einsatzfelder"
          title="Keine Merkmalsliste, sondern gezielte Eingriffe in operative Reibung."
          lead="Die Lösungen orientieren sich an realen Arbeitsabläufen: Anfrage, Freigabe, Bearbeitung, Rückmeldung, Dokumentation und Verantwortung."
        />
      </SectionShell>

      <SectionShell>
        <div>
          {mapFeaturedSolutions(solutions).map((solution) => (
            <SolutionPreview key={solution.title} {...solution} />
          ))}
        </div>
      </SectionShell>

      <PageSectionRenderer sections={getSafePageSections(pageSections)} />

      <SectionShell tone="alt" spacing="compact">
        <div className="flex flex-col gap-5 rounded-[32px] border border-[var(--color-border)] bg-white p-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-3">
            <h2 className="font-display text-3xl text-[var(--color-text)]">
              Wenn Ihr Kernprozess heute in Listen, Telefonaten und Einzelwissen
              hängt, lohnt sich ein strukturierter Blick.
            </h2>
            <p className="text-base leading-8 text-[var(--color-muted)]">
              In einem Gespräch lässt sich meist schnell einordnen, welcher
              Lösungsweg sinnvoll ist und wo der größte Hebel liegt.
            </p>
          </div>
          <InquiryButton
            label="Anfrage stellen"
            inquiryCategory="Individuelle Projektanfrage"
            source="solutions-page"
          />
        </div>
      </SectionShell>
    </main>
  );
}
