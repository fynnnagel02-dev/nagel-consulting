import Link from "next/link";
import { InquiryButton } from "@/components/forms/inquiry-button";
import { getCompanyInfo } from "@/lib/queries/public/company";
import { getActiveSolutionDemos } from "@/lib/queries/public/demos";
import { buildMetadata } from "@/lib/seo/metadata";
import { PageHero } from "@/components/layout/page-hero";
import { SectionShell } from "@/components/layout/section-shell";
import { SectionIntro } from "@/components/layout/section-intro";
import {
  DemoScenarioSwitcher,
  type DemoScenario,
} from "@/components/content/demo-scenario-switcher";
import { Button } from "@/components/ui/button";
import { VisualPlaceholder } from "@/components/content/visual-placeholder";

export async function generateMetadata() {
  const company = await getCompanyInfo().catch(() => null);

  return buildMetadata({
    title: "Demo",
    description:
      "Einblick in strukturierte Prozessabläufe für Anfragebearbeitung, Freigaben und operative Koordination.",
    company,
  });
}

export default async function DemoPage() {
  const demos = await getActiveSolutionDemos().catch(() => null);

  const scenarios: DemoScenario[] =
    demos && demos.length > 0
      ? demos.slice(0, 3).map((demo, index) => ({
          key: demo.id,
          label: demo.title,
          title: demo.title,
          summary:
            demo.description ??
            "Ein strukturierter Demo-Ausschnitt für einen operativen Ablauf.",
          detail:
            index === 0
              ? "Die Demo fokussiert auf Prozessklarheit statt auf Produktinszenierung."
              : "Jede Vorschau zeigt, wie Zuständigkeiten, Status und Informationen sauber zusammengeführt werden.",
          caption: `Demo ${index + 1}`,
        }))
      : [
          {
            key: "anfrage",
            label: "Anfrage & Termin",
            title: "Von der Anfrage bis zum nächsten eindeutigen Schritt",
            summary:
              "Die Demo macht sichtbar, wie Erfassung, Bearbeitung und Rückmeldung in einem klaren Arbeitsfluss zusammenlaufen.",
            detail:
              "Statt isolierter Einträge und Rückfragen entsteht ein gemeinsamer Blick auf Bearbeitungsstand und Zuständigkeit.",
            caption: "Beispielablauf",
          },
          {
            key: "freigabe",
            label: "Freigaben",
            title: "Interne Entscheidungen sauber abbilden",
            summary:
              "Rollen, Verantwortung und Historie werden nicht nachträglich rekonstruiert, sondern von Beginn an mitgeführt.",
            detail:
              "Das ist besonders hilfreich, wenn mehrere Personen mit unterschiedlicher Rolle an einem Vorgang beteiligt sind.",
            caption: "Beispielablauf",
          },
        ];

  return (
    <main>
      <PageHero
        eyebrow="Demo"
        title="Konkrete Vorschauen auf bessere Arbeitsabläufe."
        lead="Die Demo-Seite zeigt keine künstliche Produktpräsentation, sondern reale Prozesssituationen: Anfrage, Freigabe, Bearbeitung und nachvollziehbare Statuslogik."
      />

      <SectionShell>
        <div className="grid gap-10 lg:grid-cols-[0.85fr,1.15fr]">
          <SectionIntro
            eyebrow="Demo"
            title="Konkrete Einblicke in strukturierte Arbeitsabläufe."
            lead="Die Demo zeigt, wie Anfragebearbeitung, Freigaben und operative Koordination in einer klaren Anwendung zusammenlaufen."
          />
          <div className="space-y-4 text-base leading-8 text-[var(--color-muted)]">
            <p>
              Sichtbar werden Rollen, Zuständigkeiten, Statuswechsel und
              Informationswege, die im Tagesgeschäft zuverlässig ineinandergreifen.
            </p>
            <p>
              Je nach Prozess kann eine Demo auf Anfragebearbeitung, interne
              Freigaben, Einsatzkoordination oder ähnliche operative Abläufe
              eingehen.
            </p>
          </div>
        </div>
      </SectionShell>

      <SectionShell tone="alt">
        <DemoScenarioSwitcher scenarios={scenarios} />
      </SectionShell>

      <SectionShell spacing="compact">
        <div className="grid gap-6 lg:grid-cols-2">
          <VisualPlaceholder
            variant="diagram"
            title="Klarer Ablauf statt oberflächlicher Darstellung"
            caption="Demo-Prinzip"
            eyebrow="Produktvorschau"
          />
          <div className="space-y-5">
            <h2 className="font-display text-3xl text-[var(--color-text)]">
              Die passende Demo ergibt sich aus Ihrem Prozess, nicht aus einer
              generischen Produktfolie.
            </h2>
            <p className="text-base leading-8 text-[var(--color-muted)]">
              In einem kurzen Gespräch lässt sich oft direkt eingrenzen, welche
              Prozesssituation sich am besten als Einstieg eignet.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <InquiryButton
                label="Beratung anfragen"
                inquiryCategory="Beratungsanfrage"
                source="demo-page"
              />
              <Button asChild variant="secondary">
                <Link href="/loesungen">Zu den Lösungen</Link>
              </Button>
            </div>
          </div>
        </div>
      </SectionShell>
    </main>
  );
}
