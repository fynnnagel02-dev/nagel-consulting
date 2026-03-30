import { InquiryButton } from "@/components/forms/inquiry-button";
import { PageHero } from "@/components/layout/page-hero";
import { SectionShell } from "@/components/layout/section-shell";
import { getCompanyInfo } from "@/lib/queries/public/company";
import { buildMetadata } from "@/lib/seo/metadata";

const topics = [
  {
    title: "Zeiterfassung richtig aufsetzen",
    text:
      "In vielen Betrieben ist die Zeiterfassung ungenau, aufwendig oder fehleranfällig. Excel-Tabellen, manuelle Einträge und fehlende Strukturen führen schnell zu Problemen.\n\nWir zeigen, wie eine saubere Zeiterfassung funktioniert – einfach in der Nutzung, aber strukturiert im Hintergrund.",
  },
  {
    title: "Projekte strukturiert steuern",
    text:
      "Unklare Zuständigkeiten, fehlende Transparenz und manuelle Abstimmungen kosten täglich Zeit.\n\nEine klare Projektstruktur sorgt dafür, dass alle Beteiligten wissen, was zu tun ist – und dass Zeiten und Leistungen korrekt zugeordnet werden.",
  },
  {
    title: "Warum Excel langfristig zum Problem wird",
    text:
      "Excel ist flexibel und schnell gestartet – wird aber mit wachsender Nutzung oft unübersichtlich und fehleranfällig.\n\nWir zeigen, wann Excel an seine Grenzen kommt und wie moderne Lösungen diese Probleme gezielt lösen.",
  },
  {
    title: "Datensicherheit und Zugriff",
    text:
      "Unternehmensdaten sollten zentral, sicher und nachvollziehbar gespeichert werden – nicht verteilt über Dateien und E-Mails.\n\nModerne Systeme bieten klare Zugriffskonzepte, automatische Sicherung und Schutz vor Datenverlust.",
  },
] as const;

const practicalChallenges = [
  "Unvollständige oder fehlerhafte Zeiterfassung",
  "Mehrfach gepflegte Daten in verschiedenen Dateien",
  "Hoher manueller Abstimmungsaufwand",
  "Fehlende Transparenz bei Projekten",
  "Schwierigkeiten bei Auswertung und Nachkalkulation",
] as const;

const solutionPrinciples = [
  "Zentrale Datenerfassung statt verteilter Dateien",
  "Klare Zuordnung von Zeiten zu Projekten",
  "Einfache Bedienung für Mitarbeiter",
  "Automatische Berechnungen und Auswertungen",
  "Transparente Prozesse für alle Beteiligten",
] as const;

export async function generateMetadata() {
  const company = await getCompanyInfo().catch(() => null);

  return buildMetadata({
    title: "Wissen",
    description:
      "Praxisnahes Wissen zur Zeiterfassung, Projektorganisation und Digitalisierung – für Handwerksbetriebe und kleine Dienstleister.",
    company,
  });
}

export default async function WissenPage() {
  return (
    <main>
      <PageHero
        eyebrow="Wissen"
        title="Wissen für effiziente Betriebsprozesse"
        lead="Praxisnahes Wissen zur Zeiterfassung, Projektorganisation und Digitalisierung – speziell für Handwerksbetriebe und kleine Dienstleister."
      />

      <SectionShell spacing="compact">
        <div className="max-w-4xl space-y-6">
          <p className="text-base leading-8 text-[var(--color-muted)]">
            Viele Betriebe arbeiten täglich mit gewachsenen Excel-Lösungen,
            unklaren Prozessen und manuellem Aufwand. Das führt langfristig zu
            Fehlern, Zeitverlust und mangelnder Transparenz.
          </p>
          <p className="text-base leading-8 text-[var(--color-muted)]">
            Im Wissensbereich von Nagel Solutions zeigen wir, wie saubere,
            digitale Prozesse aufgebaut sind und welche typischen Probleme dabei
            auftreten – verständlich, praxisnah und direkt aus der Anwendung.
          </p>
        </div>
      </SectionShell>

      <SectionShell tone="alt">
        <div className="grid gap-6 lg:grid-cols-2">
          {topics.map((topic) => (
            <article
              key={topic.title}
              className="rounded-[28px] border border-[var(--color-border)] bg-white p-7"
            >
              <div className="space-y-4">
                <h2 className="font-display text-2xl text-[var(--color-text)]">
                  {topic.title}
                </h2>
                <div className="space-y-4 text-sm leading-7 text-[var(--color-muted)]">
                  {topic.text.split("\n\n").map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </SectionShell>

      <SectionShell spacing="compact">
        <div className="grid gap-8 lg:grid-cols-[0.9fr,1.1fr]">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-primary)]">
              Praxis
            </p>
            <h2 className="font-display text-3xl text-[var(--color-text)]">
              Typische Herausforderungen in der Praxis
            </h2>
          </div>
          <div className="space-y-5">
            <ul className="space-y-3">
              {practicalChallenges.map((challenge) => (
                <li
                  key={challenge}
                  className="border-t border-[var(--color-border)] pt-3 text-base leading-8 text-[var(--color-text)]"
                >
                  {challenge}
                </li>
              ))}
            </ul>
            <p className="text-base leading-8 text-[var(--color-muted)]">
              Diese Probleme entstehen nicht durch einzelne Fehler, sondern
              durch fehlende Systemstruktur. Genau hier setzen wir an.
            </p>
          </div>
        </div>
      </SectionShell>

      <SectionShell tone="alt" spacing="compact">
        <div className="grid gap-8 lg:grid-cols-[0.95fr,1.05fr]">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-primary)]">
              Lösungsbild
            </p>
            <h2 className="font-display text-3xl text-[var(--color-text)]">
              Wie moderne Lösungen aussehen
            </h2>
            <p className="text-base leading-8 text-[var(--color-muted)]">
              Eine gute Lösung ist nicht komplex, sondern klar strukturiert:
            </p>
          </div>
          <div className="space-y-5">
            <ul className="space-y-3">
              {solutionPrinciples.map((principle) => (
                <li
                  key={principle}
                  className="border-t border-[var(--color-border)] pt-3 text-base leading-8 text-[var(--color-text)]"
                >
                  {principle}
                </li>
              ))}
            </ul>
            <p className="text-base leading-8 text-[var(--color-muted)]">
              Ziel ist es, Prozesse zu vereinfachen und gleichzeitig die
              Datenqualität zu erhöhen.
            </p>
          </div>
        </div>
      </SectionShell>

      <SectionShell spacing="compact">
        <div className="flex flex-col gap-5 rounded-[32px] border border-[var(--color-border)] bg-white p-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-3">
            <h2 className="font-display text-3xl text-[var(--color-text)]">
              Individuelle Lösung für Ihren Betrieb
            </h2>
            <p className="text-base leading-8 text-[var(--color-muted)]">
              Jeder Betrieb hat eigene Abläufe und Anforderungen. Wir
              analysieren bestehende Prozesse und entwickeln darauf aufbauend
              eine passende, digitale Lösung.
            </p>
          </div>
          <InquiryButton
            label="Beratung anfragen"
            inquiryCategory="Beratungsanfrage"
            source="wissen-page"
          />
        </div>
      </SectionShell>
    </main>
  );
}
