import { SectionShell } from "@/components/layout/section-shell";
import { SectionIntro } from "@/components/layout/section-intro";

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
  solutions: _solutions,
}: {
  solutions: unknown[];
}) {
  void _solutions;

  return (
    <SectionShell tone="alt" spacing="compact">
      <div className="space-y-10">
        <SectionIntro
          eyebrow="Leistungsmodell"
          title="Ein Angebotsbereich, zwei klar unterscheidbare Wege."
          lead="Nagel Solutions bündelt standardisierbare Werkzeuge und individuelle Projektlogik unter einem gemeinsamen Lösungsdach."
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
      </div>
    </SectionShell>
  );
}
