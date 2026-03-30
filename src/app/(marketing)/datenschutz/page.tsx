import { DATENSCHUTZ_BLOCKS } from "@/lib/brand/company";
import { buildMetadata } from "@/lib/seo/metadata";
import { PageHero } from "@/components/layout/page-hero";
import { SectionShell } from "@/components/layout/section-shell";

export async function generateMetadata() {
  return buildMetadata({
    title: "Datenschutzerklärung",
    description: "Datenschutzhinweise von Nagel Solutions.",
  });
}

export default async function DatenschutzPage() {
  return (
    <main>
      <PageHero
        eyebrow="Rechtliches"
        title="Datenschutzerklärung"
        lead="Datenschutzhinweise in einer ruhigen, gut lesbaren Darstellung ohne gestalterische Ablenkung."
        compact
      />
      <SectionShell spacing="compact">
        <div className="max-w-3xl space-y-8">
          {DATENSCHUTZ_BLOCKS.map((block) => (
            <div
              key={block}
              className="whitespace-pre-line text-base leading-8 text-[var(--color-muted)]"
            >
              {block}
            </div>
          ))}
        </div>
      </SectionShell>
    </main>
  );
}
