import Link from "next/link";
import { SectionShell } from "@/components/layout/section-shell";
import { SectionIntro } from "@/components/layout/section-intro";
import {
  DemoScenarioSwitcher,
  type DemoScenario,
} from "@/components/content/demo-scenario-switcher";
import { Button } from "@/components/ui/button";

const scenarios: DemoScenario[] = [
  {
    key: "anfrage",
    label: "Anfrage & Termin",
    title: "Von der ersten Anfrage zur klaren Bearbeitung",
    summary:
      "Eine Anfrage wird aufgenommen, der Status bleibt sichtbar und die nächsten Schritte sind für Büro und operative Bearbeitung eindeutig nachvollziehbar.",
    detail:
      "Statt Telefonnotizen, E-Mails und Listen an mehreren Stellen entsteht ein klarer Ablauf mit Zuständigkeiten, Terminen und Rückfragen an einem Ort.",
    caption: "Szenario 1",
  },
  {
    key: "freigaben",
    label: "Interne Freigaben",
    title: "Freigaben werden kontrolliert statt informell erledigt",
    summary:
      "Entscheidungen laufen über definierte Rollen und bleiben später verständlich einsehbar, ohne dass jeder Schritt in Chatverläufen gesucht werden muss.",
    detail:
      "Das ist besonders relevant, wenn sensible Vorgänge, Verantwortlichkeiten und interne Kontrollpunkte sauber dokumentiert sein sollen.",
    caption: "Szenario 2",
  },
  {
    key: "einsatz",
    label: "Einsatzstatus",
    title: "Außendienst, Büro und Rückmeldung greifen geordnet ineinander",
    summary:
      "Bearbeitungsstände, Rückmeldungen und Folgeaufgaben werden sichtbar zusammengeführt, damit operative Teams weniger koordinieren und mehr umsetzen können.",
    detail:
      "Die Demo zeigt keine künstliche Produktpräsentation, sondern wie ein realer Ablauf klarer, schneller und belastbarer werden kann.",
    caption: "Szenario 3",
  },
];

export function HomeDemoShowcaseSection() {
  return (
    <SectionShell spacing="compact">
      <div className="space-y-10">
        <SectionIntro
          eyebrow="Demo"
          title="Ein kurzer Demo-Moment statt einer langen Produktpräsentation."
          lead="Die Demo auf der Startseite bleibt bewusst knapp. Sie zeigt, wie ein konkreter Ablauf klarer wird, und verweist dann in die dedizierte Demo-Seite für mehr Einordnung."
        />

        <DemoScenarioSwitcher scenarios={scenarios} />

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild>
            <Link href="/demo">Demos ansehen</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/kontakt">Demo im Gespräch einordnen</Link>
          </Button>
        </div>
      </div>
    </SectionShell>
  );
}
