import { buildMetadata } from "@/lib/seo/metadata";
import { PageHero } from "@/components/layout/page-hero";
import { SectionShell } from "@/components/layout/section-shell";

type PrivacySection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
  closing?: string;
};

const privacySections: PrivacySection[] = [
  {
    title: "1. Allgemeine Hinweise",
    paragraphs: [
      "Der Schutz Ihrer persönlichen Daten ist uns ein wichtiges Anliegen. Nachfolgend informieren wir Sie über die Verarbeitung personenbezogener Daten im Rahmen der Nutzung unserer Website.",
    ],
  },
  {
    title: "2. Verantwortlicher",
    paragraphs: [
      "Verantwortlich für die Datenverarbeitung auf dieser Website ist:",
      "Nagel Solutions\nBahrenfelder Steindamm 48\n22761 Hamburg\nE-Mail: info@nagel-solutions.com",
    ],
  },
  {
    title: "3. Zugriffsdaten / Server-Logs",
    paragraphs: [
      "Beim Aufruf dieser Website werden automatisch Informationen durch den Hosting-Anbieter erfasst. Diese Daten dienen der technischen Bereitstellung, Stabilität und Sicherheit der Website.",
      "Erfasst werden können insbesondere:",
    ],
    bullets: [
      "IP-Adresse",
      "Datum und Uhrzeit der Anfrage",
      "Browsertyp und -version",
      "Betriebssystem",
      "Referrer URL",
    ],
  },
  {
    title: "4. Hosting",
    paragraphs: [
      "Diese Website wird über Vercel (Vercel Inc., USA) gehostet.",
      "Dabei können personenbezogene Daten wie IP-Adressen verarbeitet werden. Eine Verarbeitung kann auch auf Servern außerhalb der Europäischen Union erfolgen.",
      "Vercel stellt geeignete Garantien im Sinne der DSGVO zur Verfügung.",
    ],
  },
  {
    title: "5. Datenverarbeitung durch Formulare",
    paragraphs: [
      "Wenn Sie uns über ein Kontakt- oder Anfrageformular kontaktieren, werden die von Ihnen angegebenen Daten zur Bearbeitung Ihrer Anfrage verarbeitet.",
      "Dies umfasst insbesondere:",
    ],
    bullets: ["Name", "E-Mail-Adresse", "Inhalt der Anfrage"],
    closing:
      "Die Verarbeitung erfolgt ausschließlich zur Bearbeitung Ihrer Anfrage.",
  },
  {
    title: "6. Datenbank (Supabase)",
    paragraphs: [
      "Zur Verarbeitung und Speicherung von Anfragen nutzen wir Supabase (Supabase Inc.).",
      "Die eingegebenen Daten werden dort gespeichert und zur Bearbeitung Ihrer Anfrage verwendet.",
    ],
  },
  {
    title: "7. Cookies",
    paragraphs: [
      "Unsere Website verwendet Cookies. Cookies sind kleine Textdateien, die auf Ihrem Endgerät gespeichert werden.",
      "Man unterscheidet:",
      "Technisch notwendige Cookies:\nDiese sind erforderlich, um grundlegende Funktionen der Website sicherzustellen.",
      "Analysebezogene Technologien:\nDiese dienen dazu, das Nutzerverhalten zu verstehen und die Website zu verbessern.",
      "Analysefunktionen werden nur nach ausdrücklicher Einwilligung aktiviert.",
    ],
  },
  {
    title: "8. Vercel Analytics",
    paragraphs: [
      "Diese Website nutzt Vercel Analytics zur Auswertung des Nutzerverhaltens.",
      "Vercel Analytics verarbeitet ausschließlich anonymisierte Daten und verwendet keine klassischen Tracking-Cookies. Dennoch erfolgt die Nutzung nur nach Einwilligung.",
      "Erfasste Daten können enthalten:",
    ],
    bullets: [
      "aufgerufene Seiten",
      "ungefähre geografische Informationen",
      "Gerätetyp und Browser",
    ],
  },
  {
    title: "9. Rechtsgrundlagen",
    paragraphs: [
      "Die Verarbeitung Ihrer Daten erfolgt auf Grundlage von:",
    ],
    bullets: [
      "Art. 6 Abs. 1 lit. a DSGVO (Einwilligung)",
      "Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an Betrieb und Sicherheit der Website)",
    ],
  },
  {
    title: "10. Ihre Rechte",
    paragraphs: [
      "Sie haben jederzeit das Recht auf:",
    ],
    bullets: [
      "Auskunft über Ihre gespeicherten Daten",
      "Berichtigung",
      "Löschung",
      "Einschränkung der Verarbeitung",
      "Datenübertragbarkeit",
    ],
    closing:
      "Zudem haben Sie das Recht, sich bei einer Datenschutzaufsichtsbehörde zu beschweren.",
  },
  {
    title: "11. Widerruf",
    paragraphs: [
      "Sie können eine erteilte Einwilligung jederzeit widerrufen.",
    ],
  },
  {
    title: "12. Aktualität",
    paragraphs: [
      "Diese Datenschutzerklärung wird regelmäßig aktualisiert.",
    ],
  },
];

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
        <div className="max-w-3xl space-y-10">
          {privacySections.map((section) => (
            <section key={section.title} className="space-y-4">
              <h2 className="font-display text-3xl text-[var(--color-text)]">
                {section.title}
              </h2>
              {section.paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="whitespace-pre-line text-base leading-8 text-[var(--color-muted)]"
                >
                  {paragraph}
                </p>
              ))}
              {section.bullets ? (
                <ul className="space-y-3">
                  {section.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="border-t border-[var(--color-border)] pt-3 text-base leading-8 text-[var(--color-text)]"
                    >
                      {bullet}
                    </li>
                  ))}
                </ul>
              ) : null}
              {section.closing ? (
                <p className="text-base leading-8 text-[var(--color-muted)]">
                  {section.closing}
                </p>
              ) : null}
            </section>
          ))}
        </div>
      </SectionShell>
    </main>
  );
}
