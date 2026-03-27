import Link from "next/link";
import { SectionShell } from "@/components/layout/section-shell";
import { SectionIntro } from "@/components/layout/section-intro";
import type { SecurityPillar } from "@/lib/mappers/marketing";
import { Button } from "@/components/ui/button";

export function HomeTrustSecuritySection({
  pillars,
}: {
  pillars: SecurityPillar[];
}) {
  return (
    <SectionShell tone="alt" spacing="compact">
      <div className="grid gap-10 lg:grid-cols-[0.9fr,1.1fr] lg:items-start">
        <div className="space-y-6">
          <SectionIntro
            eyebrow="Vertrauen & Sicherheit"
            title="Vertrauen entsteht, wenn Zugriff, Verantwortung und Historie klar geregelt sind."
            lead="Die Startseite gibt nur den Überblick: kontrollierter Zugriff, sichere Anmeldung, verlässliche technische Grundlage und nachvollziehbare Prozesse."
          />
          <p className="max-w-xl text-sm leading-7 text-[var(--color-muted)]">
            Die inhaltliche Tiefe zu Rollen, Rechten, Anmeldung,
            Netzwerkbeschränkung und Nachvollziehbarkeit liegt auf der
            Sicherheitsseite.
          </p>
        </div>

        <div className="space-y-6">
          {pillars.slice(0, 3).map((pillar) => (
            <article
              key={pillar.title}
              className="border-t border-[var(--color-border)] pt-5"
            >
              <h3 className="font-display text-2xl text-[var(--color-text)]">
                {pillar.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">
                {pillar.body}
              </p>
            </article>
          ))}
          <div className="pt-3">
            <Button asChild variant="secondary">
              <Link href="/sicherheit">Mehr zu Sicherheit und Zugriff</Link>
            </Button>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
