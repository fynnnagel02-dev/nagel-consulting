import { getCompanyInfo } from "@/lib/queries/public/company";
import { OFFICIAL_COMPANY } from "@/lib/brand/company";
import { buildMetadata } from "@/lib/seo/metadata";
import { PageHero } from "@/components/layout/page-hero";
import { SectionShell } from "@/components/layout/section-shell";
import { ContactForm } from "@/components/forms/contact-form";

export async function generateMetadata() {
  const company = await getCompanyInfo().catch(() => null);

  return buildMetadata({
    title: "Kontakt",
    description:
      "Projektanfrage für die Digitalisierung operativer Abläufe mit strukturierten, sicheren Webanwendungen.",
    company,
  });
}

export default async function ContactPage() {
  return (
    <main>
      <PageHero
        eyebrow="Kontakt"
        title="Lassen Sie uns den Prozess einordnen, nicht nur die Oberfläche."
        lead="Ein erstes Gespräch dient dazu, den konkreten Ablauf, die Beteiligten und den größten Strukturhebel zu verstehen. Genau daraus ergibt sich, welcher Lösungsweg sinnvoll ist."
      />

      <SectionShell>
        <div className="grid gap-10 lg:grid-cols-[1.05fr,0.95fr]">
          <div className="rounded-[32px] border border-[var(--color-border)] bg-white p-8">
            <div className="mb-8 space-y-3">
              <h2 className="font-display text-3xl text-[var(--color-text)]">
                Anfrage stellen
              </h2>
              <p className="text-base leading-8 text-[var(--color-muted)]">
                Beschreiben Sie kurz den Prozess, der heute unnötig viel
                Abstimmung, Mehrfachpflege oder Unklarheit erzeugt.
              </p>
            </div>
            <ContactForm
              initialInquiryCategory="Beratungsanfrage"
              source="kontaktseite"
              submitLabel="Anfrage stellen"
            />
          </div>

          <div className="space-y-6">
            <div className="rounded-[32px] border border-[var(--color-border)] bg-[var(--color-background-alt)] p-8">
              <h3 className="font-display text-2xl text-[var(--color-text)]">
                Was nach der Anfrage passiert
              </h3>
              <div className="mt-5 space-y-4 text-sm leading-7 text-[var(--color-muted)]">
                <p>1. Die Anfrage wird gesichtet und inhaltlich eingeordnet.</p>
                <p>
                  2. Im Gespräch werden Prozess, Rollen, aktuelle Reibung und
                  gewünschte Zielstruktur präzisiert.
                </p>
                <p>
                  3. Anschließend lässt sich entscheiden, ob eine fokussierte
                  Workflow-Lösung oder ein individuelles Projekt sinnvoll ist.
                </p>
              </div>
            </div>

            <div className="rounded-[32px] border border-[var(--color-border)] bg-white p-8">
              <h3 className="font-display text-2xl text-[var(--color-text)]">
                Alternativer Kontaktweg
              </h3>
              <div className="mt-5 space-y-2 text-sm leading-7 text-[var(--color-muted)]">
                <p>{OFFICIAL_COMPANY.email}</p>
                <p>{OFFICIAL_COMPANY.addressLine1}</p>
                <p>{`${OFFICIAL_COMPANY.postalCode} ${OFFICIAL_COMPANY.city}`}</p>
                <p>{OFFICIAL_COMPANY.country}</p>
              </div>
            </div>
          </div>
        </div>
      </SectionShell>
    </main>
  );
}
