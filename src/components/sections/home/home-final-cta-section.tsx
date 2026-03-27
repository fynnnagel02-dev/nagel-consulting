import Link from "next/link";
import { SectionShell } from "@/components/layout/section-shell";
import { Button } from "@/components/ui/button";

export function HomeFinalCtaSection({
  primaryCta,
  secondaryCta,
}: {
  primaryCta: { href: string; label: string };
  secondaryCta: { href: string; label: string };
}) {
  return (
    <SectionShell tone="primary" spacing="compact" className="rounded-t-[40px]">
      <div className="grid gap-7 lg:grid-cols-[1.2fr,0.8fr] lg:items-end">
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/72">
            Nächster Schritt
          </p>
          <h2 className="font-display text-4xl leading-tight text-white sm:text-[3.4rem]">
            Wenn ein Ablauf heute zu viel Abstimmung braucht, ist jetzt der
            richtige Moment für eine saubere Einordnung.
          </h2>
          <p className="max-w-2xl text-base leading-8 text-white/76">
            Ein erstes Gespräch reicht oft aus, um den passenden Weg zwischen
            fokussierter Workflow-Lösung und individuellem Softwareprojekt zu
            erkennen.
          </p>
        </div>
        <div className="flex flex-col gap-3 lg:items-start lg:justify-end">
          <Button asChild size="lg" variant="inverse">
            <Link href={primaryCta.href}>{primaryCta.label}</Link>
          </Button>
          <Button asChild size="lg" variant="contrast">
            <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
          </Button>
        </div>
      </div>
    </SectionShell>
  );
}
