import { SectionShell } from "@/components/layout/section-shell";
import { SectionIntro } from "@/components/layout/section-intro";
import { ProcessStep } from "@/components/content/process-step";

const steps = [
  {
    index: "01",
    title: "Aktuelle Abläufe verstehen",
    body:
      "Zu Beginn wird nicht nur über Anforderungen gesprochen, sondern der reale Prozess betrachtet: Beteiligte, Übergaben, Statuswechsel, Engpässe und Abhängigkeiten.",
  },
  {
    index: "02",
    title: "Struktur und Zugriffsmodell definieren",
    body:
      "Danach wird festgelegt, wie der Ablauf digital abgebildet werden soll, welche Rollen beteiligt sind und welche Informationen wo sichtbar oder bearbeitbar sein müssen.",
  },
  {
    index: "03",
    title: "Mit realen Anwendungsfällen umsetzen und testen",
    body:
      "Die Lösung wird anhand echter Situationen überprüft, damit nicht nur die Oberfläche stimmt, sondern auch die praktische Nutzbarkeit im Tagesgeschäft.",
  },
  {
    index: "04",
    title: "Einführen und weiterentwickeln",
    body:
      "Nach dem Start bleibt die Anwendung kein starres Projekt, sondern eine belastbare Arbeitsgrundlage, die mit den Anforderungen wachsen kann.",
  },
];

export function HomeProcessSection() {
  return (
    <SectionShell>
      <div className="space-y-12">
        <SectionIntro
          eyebrow="Vorgehen"
          title="Klare Umsetzung statt langer Konzeptschleifen."
          lead="Digitalisierung ist dann hilfreich, wenn sie Abläufe zuverlässig verbessert. Deshalb folgt die Zusammenarbeit einer klaren, nachvollziehbaren Linie."
        />
        <div className="grid gap-8 lg:grid-cols-4">
          {steps.map((step) => (
            <ProcessStep key={step.index} {...step} />
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
