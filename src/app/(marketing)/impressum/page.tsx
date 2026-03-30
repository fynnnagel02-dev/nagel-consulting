import { IMPRESSUM_BLOCKS } from "@/lib/brand/company";
import { buildMetadata } from "@/lib/seo/metadata";
import { PageHero } from "@/components/layout/page-hero";
import { SectionShell } from "@/components/layout/section-shell";

export async function generateMetadata() {
  return buildMetadata({
    title: "Impressum",
    description: "Impressum von Nagel Solutions.",
  });
}

export default async function ImpressumPage() {
  return (
    <main>
      <PageHero
        eyebrow="Rechtliches"
        title="Impressum"
        lead="Anbieterkennzeichnung und Unternehmensangaben in klarer, gut lesbarer Form."
        compact
      />
      <SectionShell spacing="compact">
        <div className="max-w-3xl space-y-8">
          {IMPRESSUM_BLOCKS.map((block) => (
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
