import type {
  CompanyInfo,
  Industry,
  Resource,
  SecurityFeature,
  Solution,
} from "@/lib/types/content";

type Link = {
  label: string;
  href: string;
};

export type HomeSolutionPreview = {
  title: string;
  summary: string;
  solves: string;
  audience: string;
  href: string;
};

export type IndustryScenario = {
  title: string;
  summary: string;
  situations: string[];
  href: string;
};

export type SecurityPillar = {
  title: string;
  body: string;
  details: string[];
};

export function mapCompanyCtas(company: CompanyInfo | null) {
  const primary: Link = {
    label: "Beratung anfragen",
    href: company?.primary_cta_href ?? "/kontakt",
  };

  const secondary: Link = {
    label: "Demo ansehen",
    href: company?.secondary_cta_href ?? "/demo",
  };

  return { primary, secondary };
}

export function mapFeaturedSolutions(solutions: Solution[] | null | undefined) {
  const fallback: HomeSolutionPreview[] = [
    {
      title: "Anfrage- und Auftragssteuerung",
      summary:
        "Eine zentrale Anwendung für Anfragen, Freigaben, Statuswechsel und Rückfragen statt verteilter Listen und E-Mails.",
      solves:
        "Verhindert doppelte Erfassung, unklare Zuständigkeiten und fehlende Statussicherheit.",
      audience: "Für Handwerksbetriebe und operative Dienstleister mit hohem Abstimmungsaufwand.",
      href: "/loesungen",
    },
    {
      title: "Interne Freigabeprozesse",
      summary:
        "Digitale Freigaben mit Rollen, Kommentaren und klarer Historie statt informeller Entscheidungen im Tagesgeschäft.",
      solves:
        "Macht Verantwortlichkeiten sichtbar und beschleunigt interne Entscheidungen.",
      audience: "Für backoffice-lastige Teams und wachsende operative Organisationen.",
      href: "/loesungen",
    },
    {
      title: "Service- und Einsatzkoordination",
      summary:
        "Ein strukturierter Ablauf für Einsätze, Rückmeldungen und Nachbearbeitung über Büro und Außendienst hinweg.",
      solves:
        "Schafft Übersicht zwischen Disposition, Ausführung und Dokumentation.",
      audience: "Für lokale Serviceunternehmen und einsatzgetriebene KMU.",
      href: "/loesungen",
    },
  ];

  if (!solutions || solutions.length === 0) {
    return fallback;
  }

  return solutions.slice(0, 3).map((solution) => ({
    title: solution.title,
    summary:
      solution.short_description ??
      solution.value_proposition ??
      "Strukturierte Anwendung für klarere Abläufe, Rollen und Zuständigkeiten.",
    solves:
      solution.problem_statement ??
      "Ersetzt unübersichtliche Excel- und Papierprozesse durch einen klaren, digitalen Ablauf.",
    audience:
      solution.target_group ??
      "Für operative Teams, die ihre Abläufe sicher und nachvollziehbar digitalisieren möchten.",
    href: `/loesungen`,
  }));
}

export function mapIndustryScenarios(industries: Industry[] | null | undefined) {
  const fallback: IndustryScenario[] = [
    {
      title: "Handwerksbetriebe",
      summary:
        "Wenn Angebote, Rückfragen, Materialthemen und Einsatzstatus parallel laufen und Informationen zwischen Büro, Baustelle und Telefon verloren gehen.",
      situations: [
        "Anfragen und Aufträge werden mehrfach erfasst",
        "Status ist nur über Rückfragen eindeutig",
        "Absprachen hängen an einzelnen Personen",
      ],
      href: "/branchen",
    },
    {
      title: "Lokale Dienstleister",
      summary:
        "Wenn Terminabstimmung, interne Bearbeitung und Kundendokumentation auf verschiedene Werkzeuge verteilt sind.",
      situations: [
        "Kein einheitlicher Blick auf offene Vorgänge",
        "Rückfragen kosten unnötig Zeit",
        "Prozessschritte sind nur schwer nachvollziehbar",
      ],
      href: "/branchen",
    },
    {
      title: "Einsatz- und operationsgetriebene KMU",
      summary:
        "Wenn operative Entscheidungen schnell fallen müssen, aber Struktur, Rechte und Historie fehlen.",
      situations: [
        "Teams arbeiten mit eigenen Listen",
        "Freigaben bleiben informell",
        "Verantwortung ist im Nachhinein schwer nachzuvollziehen",
      ],
      href: "/branchen",
    },
    {
      title: "Backoffice-lastige operative Teams",
      summary:
        "Wenn viele interne Schritte koordiniert werden müssen, aber Systemlogik und Zuständigkeiten nicht sauber abgebildet sind.",
      situations: [
        "Daten liegen verteilt in Excel, E-Mail und Papier",
        "Wiederkehrende Aufgaben sind fehleranfällig",
        "Auswertbarkeit leidet unter uneinheitlicher Pflege",
      ],
      href: "/branchen",
    },
  ];

  if (!industries || industries.length === 0) {
    return fallback;
  }

  return industries.slice(0, 4).map((industry) => ({
    title: industry.name,
    summary:
      industry.description ??
      "Strukturierte Anwendungen für wiederkehrende operative Abläufe mit klaren Rollen und Zuständigkeiten.",
    situations: [
      industry.typical_problems ?? "Wiederkehrende Abstimmungsprobleme und unklare Statuslagen.",
      industry.typical_use_cases ?? "Digitale Unterstützung für zentrale operative Kernprozesse.",
    ],
    href: "/branchen",
  }));
}

export function mapSecurityPillars(
  features: SecurityFeature[] | null | undefined,
): SecurityPillar[] {
  const featureMap = new Map(
    (features ?? []).map((feature) => [feature.title.toLowerCase(), feature]),
  );

  const fallback = (text: string) => text;
  const getFeatureText = (pattern: string, defaultText: string) => {
    const match = [...featureMap.keys()].find((key) => key.includes(pattern));
    return match ? featureMap.get(match)?.description ?? defaultText : defaultText;
  };

  return [
    {
      title: "Kontrollierter Zugriff",
      body:
        "Informationen und Funktionen werden so strukturiert, dass Mitarbeitende nur sehen und bearbeiten, was für ihre Rolle relevant ist.",
      details: [
        getFeatureText(
          "rolle",
          fallback("Rollen und Rechte machen sichtbar, wer worauf zugreifen darf."),
        ),
        getFeatureText(
          "benutzer",
          fallback("Benutzerzugänge können gezielt verwaltet und angepasst werden."),
        ),
        getFeatureText(
          "ip",
          fallback(
            "Auf Wunsch kann der Zugriff auf interne Netzwerke oder definierte Umgebungen begrenzt werden.",
          ),
        ),
      ],
    },
    {
      title: "Sichere Anmeldung",
      body:
        "Der Zugang zu sensiblen Prozessen wird sauber abgesichert, damit operative Daten nicht von improvisierten Logins oder geteilten Konten abhängen.",
      details: [
        getFeatureText(
          "2fa",
          fallback("Für sensible Bereiche kann eine zusätzliche Anmeldebestätigung vorgesehen werden."),
        ),
        getFeatureText(
          "session",
          fallback("Sitzungen werden kontrolliert verwaltet, damit Zugriffe nachvollziehbar und begrenzt bleiben."),
        ),
        fallback("Zugänge sind auf individuelle Benutzer statt auf informelle Sammellogins ausgelegt."),
      ],
    },
    {
      title: "Verlässliche technische Grundlage",
      body:
        "Die Anwendungen basieren auf einer modernen, wartbaren Architektur und einer sicheren Übertragung statt auf gewachsenen Excel- oder Dateiketten.",
      details: [
        getFeatureText(
          "https",
          fallback("Daten werden über sichere Verbindungen übertragen."),
        ),
        getFeatureText(
          "transport",
          fallback("Die technische Grundlage ist auf kontrollierte Verarbeitung und klare Verantwortlichkeit ausgelegt."),
        ),
        fallback("Die Lösung bleibt strukturiert erweiterbar, wenn Prozesse und Teams wachsen."),
      ],
    },
    {
      title: "Nachvollziehbarkeit und Verantwortung",
      body:
        "Wichtige Prozessschritte bleiben verständlich dokumentiert, damit Rückfragen, Freigaben und Änderungen später sauber einordenbar sind.",
      details: [
        getFeatureText(
          "histor",
          fallback("Prozessverläufe und Statusänderungen können sichtbar gemacht werden."),
        ),
        getFeatureText(
          "audit",
          fallback("Änderungen und Verantwortlichkeiten lassen sich nachvollziehbarer abbilden."),
        ),
        fallback("Das schafft Klarheit im Tagesgeschäft und reduziert Abhängigkeit von Einzelwissen."),
      ],
    },
  ];
}

export function mapFeaturedResource(resource: Resource | null | undefined) {
  if (!resource) {
    return {
      title: "Struktur vor Werkzeugauswahl",
      excerpt:
        "Warum operative Digitalisierung nicht mit einem neuen Formular beginnt, sondern mit klaren Zuständigkeiten, Datenwegen und Entscheidungspunkten.",
      href: "/wissen",
      category: "Prozesse & Digitalisierung",
    };
  }

  return {
    title: resource.title,
    excerpt:
      resource.excerpt ??
      "Ein kompakter Beitrag zu operativer Digitalisierung, Sicherheit und klaren Prozessstrukturen.",
    href: "/wissen",
    category: resource.category ?? "Wissen",
  };
}
