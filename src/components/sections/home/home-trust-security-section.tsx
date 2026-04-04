import { SectionShell } from "@/components/layout/section-shell";
import { SectionIntro } from "@/components/layout/section-intro";
import type { SecurityPillar } from "@/lib/mappers/marketing";

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
            lead="Kontrollierter Zugriff, sichere Anmeldung, verlässliche technische Grundlage und nachvollziehbare Prozesse bilden den Rahmen für belastbare operative Anwendungen."
          />
          <p className="max-w-xl text-sm leading-7 text-[var(--color-muted)]">
            Rollen, Rechte, Anmeldung, Netzwerkbeschränkung und
            Nachvollziehbarkeit werden entlang realer Betriebsanforderungen
            gedacht.
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
          <p className="pt-3 text-sm leading-7 text-[var(--color-muted)]">
            So entstehen Anwendungen, die sensible Informationen schützen und
            Verantwortung im Prozess klar abbilden.
          </p>
        </div>
      </div>
    </SectionShell>
  );
}
