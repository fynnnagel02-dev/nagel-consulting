import Link from "next/link";
import { InquiryButton } from "@/components/forms/inquiry-button";
import { SectionShell } from "@/components/layout/section-shell";
import { SectionIntro } from "@/components/layout/section-intro";
import { Button } from "@/components/ui/button";
import type { HomeSolutionPreview } from "@/lib/mappers/marketing";

const offerModels = [
  {
    title: "Standardisierte Workflow-Lösungen",
    summary:
      "Für klar erkennbare operative Problemstellungen, die schnell eine belastbare digitale Form brauchen.",
    when:
      "Wenn Übersicht, Rollenlogik und Statussicherheit fehlen, der Kernprozess aber grundsätzlich greifbar ist.",
  },
  {
    title: "Individuelle Softwareprojekte",
    summary:
      "Für Unternehmen mit spezifischen Abläufen, mehreren Beteiligten oder besonderer interner Prozesslogik.",
    when:
      "Wenn bestehende Abläufe nicht sauber in Standardmuster passen oder strategisch weiterentwickelt werden sollen.",
  },
];

export function HomeOfferModelSection({
  solutions,
}: {
  solutions: HomeSolutionPreview[];
}) {
  return (
    <SectionShell tone="alt" spacing="compact">
      <div className="space-y-10">
        <SectionIntro
          eyebrow="Leistungsmodell"
          title="Zwei Angebotsformen, klar eingeordnet."
          lead="Die Homepage zeigt nur den Überblick. Die eigentliche fachliche Tiefe liegt auf den Lösungsseiten und im Gespräch über den konkreten Prozess."
        />

        <div className="grid gap-6 lg:grid-cols-2">
          {offerModels.map((model) => (
            <article
              key={model.title}
              className="rounded-[32px] border border-[var(--color-border)] bg-white p-8"
            >
              <div className="space-y-5">
                <h3 className="font-display text-[2rem] text-[var(--color-text)]">
                  {model.title}
                </h3>
                <p className="text-base leading-8 text-[var(--color-text)]">
                  {model.summary}
                </p>
                <div className="space-y-3 text-sm leading-7 text-[var(--color-muted)]">
                  <p>{model.when}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr,0.9fr] lg:items-end">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-primary)]">
              Beispielhafte Einsatzfelder
            </p>
            <ul className="space-y-3 text-sm leading-7 text-[var(--color-muted)]">
              {solutions.slice(0, 2).map((solution) => (
                <li key={solution.title} className="border-t border-[var(--color-border)] pt-3">
                  <span className="font-medium text-[var(--color-text)]">
                    {solution.title}
                  </span>
                  {" - "}
                  {solution.solves}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
            <Button asChild variant="secondary">
              <Link href="/loesungen">Zu den Lösungen</Link>
            </Button>
            <InquiryButton
              label="Anfrage stellen"
              inquiryCategory="Individuelle Projektanfrage"
              source="homepage-offer-model"
            />
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
