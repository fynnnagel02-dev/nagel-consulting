import { getCompanyInfo } from "@/lib/queries/public/company";
import { getLegalPageByType } from "@/lib/queries/public/legal";
import { buildMetadata } from "@/lib/seo/metadata";
import { PageHero } from "@/components/layout/page-hero";
import { SectionShell } from "@/components/layout/section-shell";

export async function generateMetadata() {
  const company = await getCompanyInfo().catch(() => null);

  return buildMetadata({
    title: "Impressum",
    description: "Impressum von Nagel Consulting.",
    company,
  });
}

export default async function ImpressumPage() {
  const [company, legalPage] = await Promise.all([
    getCompanyInfo().catch(() => null),
    getLegalPageByType("imprint").catch(() => null),
  ]);

  const content = legalPage?.content
    ? legalPage.content.split(/\n{2,}/).filter(Boolean)
    : [
        `${company?.company_name ?? "Nagel Consulting"}`,
        [company?.owner_name, company?.legal_form].filter(Boolean).join(", "),
        [
          company?.address_line_1,
          company?.address_line_2,
          [company?.postal_code, company?.city].filter(Boolean).join(" "),
          company?.country,
        ]
          .filter(Boolean)
          .join("\n"),
        [company?.primary_email, company?.primary_phone].filter(Boolean).join("\n"),
      ].filter(Boolean);

  return (
    <main>
      <PageHero
        eyebrow="Rechtliches"
        title={legalPage?.title ?? "Impressum"}
        lead="Anbieterkennzeichnung und Unternehmensangaben in klarer, gut lesbarer Form."
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
