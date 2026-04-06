import Link from "next/link";
import { InquiryButton } from "@/components/forms/inquiry-button";
import { getCompanyInfo } from "@/lib/queries/public/company";
import { getPageSections } from "@/lib/queries/public/page-sections";
import { getSafePageSections } from "@/lib/content/page-sections";
import { buildMetadata } from "@/lib/seo/metadata";
import { PageHero } from "@/components/layout/page-hero";
import { SectionShell } from "@/components/layout/section-shell";
import { SectionIntro } from "@/components/layout/section-intro";
import { PageSectionRenderer } from "@/components/sections/page-section-renderer";
import { Button } from "@/components/ui/button";

const standardSolutions = [
  {
    title: "Digitale Zeiterfassung für operative Teams",
    description:
      "Ein standardisierter Lösungsbaustein zur strukturierten Erfassung, Prüfung und Auswertung von Arbeitszeiten im operativen Alltag.",
    hint: "Interaktive Demo verfügbar",
    details: [
      "Klare Erfassung von Arbeitszeiten und Pausen ohne Excel oder Papier",
      "Nachvollziehbare Freigabeprozesse für Teamleitung und Verwaltung",
      "Einheitliche Datengrundlage für Auswertung und Abrechnung",
    ],
    audience:
      "Für Handwerksbetriebe und Dienstleister mit operativen Teams und wiederkehrenden Arbeitsabläufen.",
    primaryCtaLabel: "Demo ansehen",
    primaryCtaHref: "/demo",
    secondaryCtaLabel: "Individuelle Anpassung anfragen",
    inquiryCategory: "Standardisierte Lösungsanfrage" as const,
  },
];

export async function generateMetadata() {
  const company = await getCompanyInfo().catch(() => null);

  return buildMetadata({
    title: "Lösungen",
    description:
      "Digitale Lösungen für Anfragebearbeitung, Freigaben, Einsatzkoordination und andere operative Kernprozesse, als standardisierte Bausteine oder individuelle Projekte.",
    company,
  });
}

export default async function SolutionsPage() {
  const pageSections = await getPageSections("loesungen").catch(() => null);

  return (
    <main>
      <PageHero
        eyebrow="Lösungen"
        title="Ein Lösungsbereich für standardisierte Bausteine und individuelle Projektlogik."
        lead="Nagel Solutions bündelt wiederverwendbare Werkzeuge und individuelle Softwareprojekte unter einem gemeinsamen Lösungsdach, damit operative Unternehmen nicht zwischen künstlich getrennten Angebotskategorien wählen müssen."
      />

      <SectionShell spacing="compact">
        <div className="grid gap-8 lg:grid-cols-2">
          <SectionIntro
            eyebrow="Leistungsmodell"
            title="Zwei Wege, ein gemeinsamer Zweck."
            lead="Die Unterscheidung verläuft nicht zwischen Produktebene und Lösungsebene, sondern zwischen standardisierbaren Mustern und individueller Projekttiefe."
          />
          <div className="grid gap-5">
            <article className="rounded-[28px] border border-[var(--color-border)] bg-white p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-primary)]">
                Standardisierte Lösungen
              </p>
              <h2 className="mt-3 font-display text-3xl text-[var(--color-text)]">
                Wiederverwendbare Bausteine für wiederkehrende Ablaufmuster.
              </h2>
              <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">
                Geeignet, wenn der Kernprozess klar erkennbar ist und schnell in
                eine belastbare digitale Form überführt werden soll.
              </p>
            </article>
            <article className="rounded-[28px] border border-[var(--color-border)] bg-white p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-primary)]">
                Individuelle Projekte
              </p>
              <h2 className="mt-3 font-display text-3xl text-[var(--color-text)]">
                Maßgeschneiderte Software für spezifische Prozesslogik.
              </h2>
              <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">
                Sinnvoll, wenn mehrere Rollen, Sonderfälle oder strategische
                Weiterentwicklungen nicht sauber in ein Standardmuster passen.
              </p>
            </article>
          </div>
        </div>
      </SectionShell>

      <SectionShell tone="alt">
        <div className="space-y-6">
          <SectionIntro
            eyebrow="Standardisierte Lösungen"
            title="Wiederkehrende Probleme lassen sich oft mit klar umrissenen Bausteinen lösen."
            lead="Diese Bausteine schaffen schnelle Orientierung, klare Zuständigkeiten und belastbare Abläufe in wiederkehrenden Prozessmustern."
          />
          <div className="space-y-6">
            {standardSolutions.map((solution) => (
              <article
                key={solution.title}
                className="grid gap-6 border-t border-[var(--color-border)] py-8 lg:grid-cols-[0.85fr,1.15fr]"
              >
                <div className="space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-primary)]">
                    Standardisierte Lösung
                  </p>
                  <h2 className="font-display text-3xl text-[var(--color-text)]">
                    {solution.title}
                  </h2>
                  <p className="text-base leading-8 text-[var(--color-text)]">
                    {solution.description}
                  </p>
                  {solution.hint ? (
                    <p className="text-sm leading-7 text-[var(--color-muted)]">
                      {solution.hint}
                    </p>
                  ) : null}
                </div>
                <div className="space-y-4">
                  {solution.details.map((detail) => (
                    <p
                      key={detail}
                      className="text-sm leading-7 text-[var(--color-muted)]"
                    >
                      {detail}
                    </p>
                  ))}
                  <p className="text-sm leading-7 text-[var(--color-muted)]">
                    {solution.audience}
                  </p>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <Button asChild>
                      <Link href={solution.primaryCtaHref}>{solution.primaryCtaLabel}</Link>
                    </Button>
                    <InquiryButton
                      label={solution.secondaryCtaLabel}
                      inquiryCategory={solution.inquiryCategory}
                      source={`loesungen-standard-${solution.title}`}
                    />
                  </div>
                </div>
              </article>
            ))}
          </div>
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
