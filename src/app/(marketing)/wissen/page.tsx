import Link from "next/link";
import { getCompanyInfo } from "@/lib/queries/public/company";
import {
  getFeaturedResources,
  getPublishedResources,
} from "@/lib/queries/public/resources";
import { mapFeaturedResource } from "@/lib/mappers/marketing";
import { buildMetadata } from "@/lib/seo/metadata";
import { PageHero } from "@/components/layout/page-hero";
import { SectionShell } from "@/components/layout/section-shell";

export async function generateMetadata() {
  const company = await getCompanyInfo().catch(() => null);

  return buildMetadata({
    title: "Wissen",
    description:
      "Kuratiertes Wissen zu Prozessdigitalisierung, Sicherheit und praktischen Einsatzfeldern für operative Unternehmen.",
    company,
  });
}

export default async function WissenPage() {
  const [featuredResources, resources] = await Promise.all([
    getFeaturedResources().catch(() => null),
    getPublishedResources().catch(() => null),
  ]);

  const featured = mapFeaturedResource(featuredResources?.[0]);
  const list = resources ?? [];

  return (
    <main>
      <PageHero
        eyebrow="Wissen"
        title="Kuratiertes Wissen für Unternehmen, die operative Abläufe klarer digitalisieren möchten."
        lead="Der Bereich Wissen ist bewusst zurückhaltend aufgebaut: keine News-Maschine, sondern ausgewählte Inhalte zu Prozessstruktur, Zugriff, Verantwortung und praktischer Umsetzung."
      />

      <SectionShell spacing="compact">
        <article className="grid gap-6 rounded-[32px] border border-[var(--color-border)] bg-white p-8 lg:grid-cols-[0.7fr,1.3fr] lg:items-end">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-primary)]">
              Hervorgehoben
            </p>
            <p className="text-sm text-[var(--color-muted)]">{featured.category}</p>
          </div>
          <div className="space-y-4">
            <h2 className="font-display text-3xl text-[var(--color-text)]">
              {featured.title}
            </h2>
            <p className="text-base leading-8 text-[var(--color-muted)]">
              {featured.excerpt}
            </p>
            <Link
              href={featured.href}
              className="inline-flex text-sm font-medium text-[var(--color-primary)] transition hover:text-[var(--color-primary-strong)]"
            >
              Zum Wissensbereich
            </Link>
          </div>
        </article>
      </SectionShell>

      <SectionShell tone="alt">
        <div className="grid gap-6 lg:grid-cols-2">
          {(list.length > 0
            ? list.slice(0, 6).map((resource) => ({
                title: resource.title,
                excerpt:
                  resource.excerpt ??
                  "Ein kuratierter Beitrag zu Prozessdigitalisierung, Sicherheit oder einem konkreten Einsatzfeld.",
                category: resource.category ?? "Wissen",
              }))
            : [
                {
                  title: "Warum Prozessklarheit vor der Werkzeugauswahl kommt",
                  excerpt:
                    "Ein Blick darauf, warum operative Digitalisierung oft an unklaren Zuständigkeiten scheitert und nicht an fehlenden Werkzeugen.",
                  category: "Prozesse & Digitalisierung",
                },
                {
                  title: "Wer darf was sehen? Zugriffslogik verständlich gedacht",
                  excerpt:
                    "Wie Rollen, Benutzerverwaltung und kontrollierter Zugriff im betrieblichen Alltag zu mehr Sicherheit und Klarheit führen.",
                  category: "Sicherheit & Zugriffssteuerung",
                },
                {
                  title: "Praxisbeispiel: Freigaben ohne Excel-Ketten",
                  excerpt:
                    "Wie ein interner Freigabeprozess mit klaren Statuswechseln und nachvollziehbarer Historie belastbarer wird.",
                  category: "Praxisbeispiele",
                },
              ]
          ).map((item) => (
            <article
              key={item.title}
              className="rounded-[28px] border border-[var(--color-border)] bg-white p-7"
            >
              <div className="space-y-4">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-primary)]">
                  {item.category}
                </p>
                <h2 className="font-display text-2xl text-[var(--color-text)]">
                  {item.title}
                </h2>
                <p className="text-sm leading-7 text-[var(--color-muted)]">
                  {item.excerpt}
                </p>
              </div>
            </article>
          ))}
        </div>
      </SectionShell>
    </main>
  );
}
