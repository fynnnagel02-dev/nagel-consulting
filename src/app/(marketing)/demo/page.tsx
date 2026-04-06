import Link from "next/link";
import { InquiryButton } from "@/components/forms/inquiry-button";
import { getCompanyInfo } from "@/lib/queries/public/company";
import { buildMetadata } from "@/lib/seo/metadata";
import { PageHero } from "@/components/layout/page-hero";
import { SectionShell } from "@/components/layout/section-shell";
import { SectionIntro } from "@/components/layout/section-intro";
import { Button } from "@/components/ui/button";
import { DemoEmbed } from "@/components/content/demo-embed";

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
        <DemoEmbed
          variant="page"
          title="Rollenbasiert durch dieselbe Demo navigieren."
          description="Die Vorschau bleibt bewusst nah an der echten Anwendung. Wechseln Sie zwischen Verwaltung, Teamleitung und Mitarbeitersicht, um den Ablauf aus jeder Rolle direkt zu erleben."
        />
      </SectionShell>

      <SectionShell spacing="compact">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="surface-panel rounded-[2rem] border border-[rgba(36,51,69,0.08)] p-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[var(--color-accent)]">
              Demo-Prinzip
            </p>
            <div className="mt-6 space-y-5">
              <h2 className="font-display text-3xl text-[var(--color-text)]">
                Klarer Ablauf statt einer losgelösten Showansicht.
              </h2>
              <p className="text-base leading-8 text-[var(--color-muted)]">
                Die eingebettete Demo bleibt nah an der echten Nutzungssituation.
                Genau dadurch wird sichtbar, wie Rollen, Status und Tagesgeschäft
                in einer belastbaren Oberfläche zusammenfinden.
              </p>
            </div>
          </div>
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
