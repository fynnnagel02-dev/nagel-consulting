import Link from "next/link";
import { getCompanyInfo } from "@/lib/queries/public/company";
import { buildMetadata } from "@/lib/seo/metadata";
import { PageHero } from "@/components/layout/page-hero";
import { SectionShell } from "@/components/layout/section-shell";
import { SectionIntro } from "@/components/layout/section-intro";
import { Button } from "@/components/ui/button";

const products = [
  {
    title: "Anfrage- und Auftragsboard",
    description:
      "Ein standardisiertes Produkt für die strukturierte Erfassung, Bearbeitung und Nachverfolgung eingehender Anfragen und Aufträge.",
    helpsWith:
      "Reduziert Mehrfacheingaben, schafft klare Statussicht und ordnet Zuständigkeiten zwischen Büro und operativer Bearbeitung.",
    audience:
      "Für Handwerksbetriebe und Dienstleister mit wiederkehrender Anfrage- und Auftragskoordination.",
  },
  {
    title: "Freigabe- und Entscheidungsfluss",
    description:
      "Ein Produkt für interne Freigaben mit Rollenlogik, Kommentaren und nachvollziehbarer Historie statt losem Abstimmungsverkehr.",
    helpsWith:
      "Macht Entscheidungen klarer, verringert Rückfragen und sorgt für bessere Nachvollziehbarkeit im Tagesgeschäft.",
    audience:
      "Für operative Teams, die mehrere interne Freigabeschritte sauber organisieren müssen.",
  },
  {
    title: "Einsatz- und Rückmeldewerkzeug",
    description:
      "Ein standardisiertes Werkzeug für Koordination, Statusrückmeldung und geordnete Nachbearbeitung im laufenden Betrieb.",
    helpsWith:
      "Verbindet Disposition, Bearbeitungsstand und Rückmeldung in einer einheitlichen Struktur.",
    audience:
      "Für einsatzgetriebene KMU und lokale Serviceunternehmen mit operativem Abstimmungsbedarf.",
  },
];

export async function generateMetadata() {
  const company = await getCompanyInfo().catch(() => null);

  return buildMetadata({
    title: "Produkte",
    description:
      "Standardisierte Produkte für wiederkehrende operative Ablaufprobleme mit klarer Struktur, Rollenlogik und nachvollziehbaren Abläufen.",
    company,
  });
}

export default function ProduktePage() {
  return (
    <main>
      <PageHero
        eyebrow="Produkte"
        title="Standardisierte Produkte für wiederkehrende operative Abläufe."
        lead="Die Produktseite zeigt klar umrissene, standardisierte Werkzeuge für typische betriebliche Ablaufsituationen. Sie ergänzt die Lösungsseite, bleibt aber deutlich konkreter und produktnäher."
      />

      <SectionShell spacing="compact">
        <SectionIntro
          eyebrow="Einordnung"
          title="Was Produkte in diesem Kontext bedeuten"
          lead="Produkte sind keine generischen Vorlagen und keine experimentellen Demo-Flächen. Sie sind fokussierte, standardisierte Werkzeuge für wiederkehrende betriebliche Abläufe, die sich in vielen Unternehmen ähnlich zeigen."
        />
      </SectionShell>

      <SectionShell tone="alt">
        <div className="space-y-6">
          {products.map((product) => (
            <article
              key={product.title}
              className="grid gap-6 border-t border-[var(--color-border)] py-8 lg:grid-cols-[0.85fr,1.15fr]"
            >
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-primary)]">
                  Standardprodukt
                </p>
                <h2 className="font-display text-3xl text-[var(--color-text)]">
                  {product.title}
                </h2>
                <p className="text-base leading-8 text-[var(--color-text)]">
                  {product.description}
                </p>
              </div>
              <div className="space-y-4">
                <p className="text-sm leading-7 text-[var(--color-muted)]">
                  {product.helpsWith}
                </p>
                <p className="text-sm leading-7 text-[var(--color-muted)]">
                  {product.audience}
                </p>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button asChild>
                    <Link href="/kontakt">Produkt besprechen</Link>
                  </Button>
                  <Button asChild variant="secondary">
                    <Link href="/demo">Passende Demo ansehen</Link>
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </SectionShell>

      <SectionShell spacing="compact">
        <div className="grid gap-8 rounded-[32px] border border-[var(--color-border)] bg-white p-8 lg:grid-cols-[1.15fr,0.85fr] lg:items-end">
          <div className="space-y-4">
            <h2 className="font-display text-3xl text-[var(--color-text)]">
              Wenn ein Standardprodukt nicht ausreicht, ist der nächste Schritt
              nicht mehr Demo, sondern gezielte Einordnung.
            </h2>
            <p className="text-base leading-8 text-[var(--color-muted)]">
              Dann lässt sich gemeinsam klären, ob ein Produkt angepasst werden
              kann oder ob ein individueller Lösungsweg sinnvoller ist.
            </p>
          </div>
          <div className="flex flex-col gap-3 lg:items-start">
            <Button asChild>
              <Link href="/kontakt">Anfrage stellen</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/loesungen">Zu den Lösungen</Link>
            </Button>
          </div>
        </div>
      </SectionShell>
    </main>
  );
}
