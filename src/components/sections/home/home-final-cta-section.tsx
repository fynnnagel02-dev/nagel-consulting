import { SectionShell } from "@/components/layout/section-shell";

export function HomeFinalCtaSection() {
  return (
    <SectionShell tone="primary" spacing="compact" className="rounded-t-[40px]">
      <div className="max-w-4xl space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/72">
          Nächster Schritt
        </p>
        <h2 className="font-display text-4xl leading-tight text-white sm:text-[3.4rem]">
          Wenn ein Ablauf heute zu viel Abstimmung braucht, ist jetzt der
          richtige Moment für ein erstes Gespräch.
        </h2>
        <p className="max-w-2xl text-base leading-8 text-white/76">
          Ein erstes Gespräch reicht oft aus, um den passenden Weg zwischen
          fokussierter Workflow-Lösung und individuellem Softwareprojekt zu
          erkennen.
        </p>
      </div>
    </SectionShell>
  );
}
