import Link from "next/link";
import { SectionShell } from "@/components/layout/section-shell";
import { SectionIntro } from "@/components/layout/section-intro";
import { Button } from "@/components/ui/button";

export function HomeAboutTeaserSection() {
  return (
    <SectionShell>
      <div className="grid gap-10 lg:grid-cols-[0.9fr,1.1fr]">
        <SectionIntro
          eyebrow="Über Nagel Solutions"
          title="Technische Lösungen sind nur dann gut, wenn sie operative Verantwortung wirklich stützen."
          lead="Nagel Solutions verbindet strukturiertes Denken, moderne Webarchitektur und einen klaren Blick auf reale Unternehmensabläufe. Im Mittelpunkt steht nicht die Technologie als Selbstzweck, sondern die Frage, wie Prozesse verlässlicher, transparenter und wartbarer werden."
        />
        <div className="space-y-6">
          <p className="text-base leading-8 text-[var(--color-text)]">
            Die Arbeit beginnt nah am Tagesgeschäft: Welche Schritte laufen
            heute wie, wo entstehen Übergaben und welche Rollen brauchen
            Klarheit, Sicherheit und Nachvollziehbarkeit?
          </p>
          <p className="text-base leading-8 text-[var(--color-muted)]">
            Wer eine betriebliche Kernlogik digitalisiert, braucht einen
            Partner, der strukturiert arbeitet, technische Entscheidungen
            sauber einordnet und Prozesse dauerhaft tragfähig gestaltet.
          </p>
          <Button asChild variant="secondary">
            <Link href="/ueber-uns">Mehr über Arbeitsweise und Haltung</Link>
          </Button>
        </div>
      </div>
    </SectionShell>
  );
}
