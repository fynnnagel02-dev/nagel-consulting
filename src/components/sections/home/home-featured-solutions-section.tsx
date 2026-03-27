import { SectionShell } from "@/components/layout/section-shell";
import { SectionIntro } from "@/components/layout/section-intro";
import { SolutionPreview } from "@/components/content/solution-preview";
import type { HomeSolutionPreview } from "@/lib/mappers/marketing";

export function HomeFeaturedSolutionsSection({
  solutions,
}: {
  solutions: HomeSolutionPreview[];
}) {
  return (
    <SectionShell tone="surface">
      <div className="space-y-12">
        <SectionIntro
          eyebrow="Konkrete Einsatzfelder"
          title="Drei Beispiele dafür, wie operative Abläufe digital klarer werden."
          lead="Die Lösung ist nie „Software um der Software willen“, sondern immer ein präziser Eingriff in einen Prozess, der heute unnötig Reibung erzeugt."
        />

        <div>
          {solutions.map((solution) => (
            <SolutionPreview key={solution.title} {...solution} />
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
