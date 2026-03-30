import Link from "next/link";
import { SectionShell } from "@/components/layout/section-shell";
import { SectionIntro } from "@/components/layout/section-intro";
import { Button } from "@/components/ui/button";

const principles = [
  {
    title: "Strukturierte Abläufe",
    body:
      "Wiederkehrende Schritte werden klar abgebildet, damit weniger Rückfragen und weniger Reibung im Tagesgeschäft entstehen.",
  },
  {
    title: "Zentrale Datenbasis",
    body:
      "Relevante Informationen laufen an einer Stelle zusammen, statt über Listen, E-Mails und Einzelstände verteilt zu bleiben.",
  },
  {
    title: "Rollenbasierter Zugriff",
    body:
      "Zugriffe und Zuständigkeiten werden sauber geregelt, damit Prozesse klar und sensible Bereiche kontrolliert bleiben.",
  },
];

export function HomeTransformationSection() {
  return (
    <SectionShell spacing="compact">
      <div className="space-y-8">
        <SectionIntro
          eyebrow="Kurz erklärt"
          title="Nagel Solutions übersetzt gewachsene Abläufe in digitale Struktur."
          lead="Im Zentrum stehen keine Dashboards, sondern belastbare Arbeitsflüsse: klare Zuständigkeiten, sauber geführte Daten und Prozesse, die auch bei Wachstum kontrollierbar bleiben."
        />
        <div className="grid gap-5 lg:grid-cols-3">
          {principles.map((principle) => (
            <article
              key={principle.title}
              className="grid gap-2 border-t border-[var(--color-border)] pt-4"
            >
              <h3 className="font-display text-[1.75rem] text-[var(--color-text)]">
                {principle.title}
              </h3>
              <p className="text-sm leading-7 text-[var(--color-muted)]">
                {principle.body}
              </p>
            </article>
          ))}
        </div>
        <div>
          <Button asChild variant="secondary">
            <Link href="/ueber-uns">Arbeitsweise ansehen</Link>
          </Button>
        </div>
      </div>
    </SectionShell>
  );
}
