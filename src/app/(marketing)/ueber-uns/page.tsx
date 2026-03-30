import { InquiryButton } from "@/components/forms/inquiry-button";
import { getCompanyInfo } from "@/lib/queries/public/company";
import { buildMetadata } from "@/lib/seo/metadata";
import { PageHero } from "@/components/layout/page-hero";
import { SectionShell } from "@/components/layout/section-shell";

export async function generateMetadata() {
  const company = await getCompanyInfo().catch(() => null);

  return buildMetadata({
    title: "Über uns",
    description:
      "Arbeitsweise, Haltung und Anspruch von Nagel Solutions bei der Digitalisierung operativer Unternehmensabläufe.",
    company,
  });
}

export default function AboutPage() {
  return (
    <main>
      <PageHero
        eyebrow="Über Nagel Solutions"
        title="Seriöse Digitalisierung beginnt mit Struktur, nicht mit Lautstärke."
        lead="Nagel Solutions entwickelt digitale Arbeitsabläufe für Unternehmen, die verlässlich funktionieren müssen. Im Zentrum stehen Klarheit, Verantwortlichkeit und eine technische Basis, die das Tagesgeschäft entlastet."
      />

      <SectionShell>
        <div className="grid gap-8 lg:grid-cols-[0.9fr,1.1fr]">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-primary)]">
              Mission
            </p>
            <h2 className="font-display text-3xl text-[var(--color-text)]">
              Operative Abläufe so digitalisieren, dass sie ruhiger, klarer und
              belastbarer werden.
            </h2>
          </div>
          <div className="space-y-5 text-base leading-8 text-[var(--color-muted)]">
            <p>
              Viele Unternehmen arbeiten bereits mit digitalen Hilfsmitteln, aber
              nicht mit einer klaren Prozessstruktur. Genau dort setzt Nagel
              Solutions an: zwischen Tagesgeschäft, Verantwortung und sauberer
              technischer Umsetzung.
            </p>
            <p>
              Ziel ist keine oberflächliche Modernisierung, sondern eine Lösung,
              die echten operativen Nutzen bringt: weniger Mehrfacheingaben,
              klarere Zuständigkeiten, sicherere Freigaben und nachvollziehbare
              Abläufe.
            </p>
          </div>
        </div>
      </SectionShell>

      <SectionShell tone="alt">
        <div className="grid gap-8 lg:grid-cols-3">
          <article className="space-y-3">
            <h3 className="font-display text-2xl text-[var(--color-text)]">
              Philosophie
            </h3>
            <p className="text-sm leading-7 text-[var(--color-muted)]">
              Gute Software entsteht aus einem klaren Verständnis des realen
              Arbeitsablaufs, nicht aus einer vorgefertigten Design-Schablone.
            </p>
          </article>
          <article className="space-y-3">
            <h3 className="font-display text-2xl text-[var(--color-text)]">
              Arbeitsweise
            </h3>
            <p className="text-sm leading-7 text-[var(--color-muted)]">
              Prozesse werden strukturiert aufgenommen, Rollen und Zugriffe sauber
              gedacht und Lösungen an konkreten Anwendungsfällen überprüft.
            </p>
          </article>
          <article className="space-y-3">
            <h3 className="font-display text-2xl text-[var(--color-text)]">
              Vertrauen
            </h3>
            <p className="text-sm leading-7 text-[var(--color-muted)]">
              Wer betriebliche Kernlogik digitalisiert, braucht einen Partner, der
              mit Verantwortung arbeitet und technische Entscheidungen verständlich
              übersetzt.
            </p>
          </article>
        </div>
      </SectionShell>

      <SectionShell spacing="compact">
        <div className="flex flex-col gap-5 rounded-[32px] border border-[var(--color-border)] bg-white p-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-3">
            <h2 className="font-display text-3xl text-[var(--color-text)]">
              Wenn Sie einen Ablauf nicht nur digitalisieren, sondern sinnvoll
              ordnen möchten, ist das ein guter Gesprächsanlass.
            </h2>
            <p className="text-base leading-8 text-[var(--color-muted)]">
              Ein erster Austausch reicht oft aus, um Problem, Priorität und
              passenden Lösungsweg zu sortieren.
            </p>
          </div>
          <InquiryButton
            label="Beratung anfragen"
            inquiryCategory="Beratungsanfrage"
            source="about-page"
          />
        </div>
      </SectionShell>
    </main>
  );
}
