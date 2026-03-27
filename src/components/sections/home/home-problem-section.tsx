import { SectionShell } from "@/components/layout/section-shell";
import { SectionIntro } from "@/components/layout/section-intro";

const problemThemes = [
  {
    title: "Verteilte Daten und Mehrfacheingaben",
    body:
      "Informationen liegen gleichzeitig in Excel-Dateien, Papierformularen, E-Mails und einzelnen Köpfen. Das führt zu doppelter Pflege und widersprüchlichen Ständen.",
  },
  {
    title: "Manuelle Abstimmung und unklarer Status",
    body:
      "Wer etwas bearbeitet hat, was noch offen ist oder worauf gewartet wird, lässt sich oft nur über Rückfragen herausfinden. Das kostet Zeit und erzeugt Unsicherheit.",
  },
  {
    title: "Abhängigkeit von Einzelwissen",
    body:
      "Wenn bestimmte Abläufe nur von einzelnen Personen sicher beherrscht werden, wird jeder Ausfall und jede Vertretung sofort zum Risiko für den gesamten Prozess.",
  },
  {
    title: "Fehlende Nachvollziehbarkeit und Kontrolle",
    body:
      "Freigaben, Änderungen und Entscheidungen sind später nur schwer einzuordnen. Damit fehlen die Grundlagen für Verlässlichkeit, Verantwortung und saubere Weiterentwicklung.",
  },
];

export function HomeProblemSection() {
  return (
    <SectionShell tone="alt">
      <div className="space-y-12">
        <SectionIntro
          eyebrow="Ausgangslage"
          title="Viele operative Unternehmen arbeiten digital, aber nicht strukturiert."
          lead="Die eigentliche Herausforderung liegt selten im Mangel an Werkzeugen. Sie liegt in verteilten Informationen, informellen Absprachen und Prozessen, die mit dem Unternehmen gewachsen sind, aber nicht mit ihm skaliert werden."
        />

        <div className="grid gap-8 lg:grid-cols-2">
          {problemThemes.map((theme, index) => (
            <article
              key={theme.title}
              className="grid gap-4 border-t border-[var(--color-border)] pt-6"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-primary)]">
                {`0${index + 1}`}
              </p>
              <h3 className="font-display text-2xl text-[var(--color-text)]">
                {theme.title}
              </h3>
              <p className="max-w-xl text-sm leading-7 text-[var(--color-muted)]">
                {theme.body}
              </p>
            </article>
          ))}
        </div>

        <p className="max-w-3xl text-base leading-8 text-[var(--color-text)]">
          Sobald Abstimmung, Zugriff und Prozesslogik nicht klar geregelt sind,
          wird Wachstum anstrengend: Fehler nehmen zu, Wissen konzentriert sich
          auf wenige Personen und operative Entscheidungen bleiben unnötig
          fragil.
        </p>
      </div>
    </SectionShell>
  );
}
