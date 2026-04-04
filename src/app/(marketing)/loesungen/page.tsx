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
import { Button } from "@/components/ui/button";

const standardSolutions = [
  {
    title: "Anfrage- und Auftragsboard",
    description:
      "Ein standardisierter Lösungsbaustein für die strukturierte Erfassung, Bearbeitung und Nachverfolgung eingehender Anfragen und Aufträge.",
    helpsWith:
      "Reduziert Mehrfacheingaben, schafft klare Statussicht und ordnet Zuständigkeiten zwischen Büro und operativer Bearbeitung.",
    audience:
      "Für Handwerksbetriebe und Dienstleister mit wiederkehrender Anfrage- und Auftragskoordination.",
  },
  {
    title: "Freigabe- und Entscheidungsfluss",
    description:
      "Ein wiederverwendbarer Lösungsbaustein für interne Freigaben mit Rollenlogik, Kommentaren und nachvollziehbarer Historie statt losem Abstimmungsverkehr.",
    helpsWith:
      "Macht Entscheidungen klarer, verringert Rückfragen und sorgt für bessere Nachvollziehbarkeit im Tagesgeschäft.",
    audience:
      "Für operative Teams, die mehrere interne Freigabeschritte sauber organisieren müssen.",
  },
  {
    title: "Einsatz- und Rückmeldewerkzeug",
    description:
      "Ein standardisierbarer Ablauf für Koordination, Statusrückmeldung und geordnete Nachbearbeitung im laufenden Betrieb.",
    helpsWith:
      "Verbindet Disposition, Bearbeitungsstand und Rückmeldung in einer einheitlichen Struktur.",
    audience:
      "Für einsatzgetriebene KMU und lokale Serviceunternehmen mit operativem Abstimmungsbedarf.",
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
  const [solutions, pageSections] = await Promise.all([
    getActiveSolutions().catch(() => null),
    getPageSections("loesungen").catch(() => null),
  ]);

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

      <SectionShell>
        <SectionIntro
          eyebrow="Individuelle Lösungswege"
          title="Keine Merkmalsliste, sondern gezielte Eingriffe in operative Reibung."
          lead="Diese Lösungen orientieren sich an realen Arbeitsabläufen: Anfrage, Freigabe, Bearbeitung, Rückmeldung, Dokumentation und Verantwortung."
        />
      </SectionShell>

      <SectionShell>
        <div>
          {mapFeaturedSolutions(solutions).map((solution) => (
            <SolutionPreview key={solution.title} {...solution} />
          ))}
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
                </div>
                <div className="space-y-4">
                  <p className="text-sm leading-7 text-[var(--color-muted)]">
                    {solution.helpsWith}
                  </p>
                  <p className="text-sm leading-7 text-[var(--color-muted)]">
                    {solution.audience}
                  </p>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <InquiryButton
                      label="Anfrage stellen"
                      inquiryCategory="Standardisierte Lösungsanfrage"
                      source={`loesungen-standard-${solution.title}`}
                    />
                    <Button asChild variant="secondary">
                      <Link href="/demo">Passende Demo ansehen</Link>
                    </Button>
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
