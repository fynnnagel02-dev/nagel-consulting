import { getCompanyInfo } from "@/lib/queries/public/company";
import { getLegalPageByType } from "@/lib/queries/public/legal";
import { buildMetadata } from "@/lib/seo/metadata";
import { PageHero } from "@/components/layout/page-hero";
import { SectionShell } from "@/components/layout/section-shell";

export async function generateMetadata() {
  const company = await getCompanyInfo().catch(() => null);

  return buildMetadata({
    title: "Datenschutz",
    description: "Datenschutzhinweise von Nagel Consulting.",
    company,
  });
}

export default async function DatenschutzPage() {
  const legalPage = await getLegalPageByType("privacy_policy").catch(() => null);

  const content = legalPage?.content
    ? legalPage.content.split(/\n{2,}/).filter(Boolean)
    : [
        "Diese Datenschutzhinweise erläutern, welche personenbezogenen Daten im Rahmen der Nutzung dieser Website und bei Kontaktanfragen verarbeitet werden.",
        "Wenn Sie über das Kontaktformular oder per E-Mail mit Nagel Consulting in Verbindung treten, werden die von Ihnen übermittelten Angaben ausschließlich zur Bearbeitung Ihrer Anfrage verarbeitet.",
        "Weitere Informationen zu Verantwortlichkeit, Rechtsgrundlagen, Speicherdauer und Betroffenenrechten sollten im administrierten Rechtstext hinterlegt werden.",
      ];

  return (
    <main>
      <PageHero
        eyebrow="Rechtliches"
        title={legalPage?.title ?? "Datenschutz"}
        lead="Datenschutzhinweise in einer ruhigen, gut lesbaren Darstellung ohne gestalterische Ablenkung."
        compact
      />
      <SectionShell spacing="compact">
        <div className="max-w-3xl space-y-8">
          {content.map((block) => (
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
