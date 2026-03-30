begin;

update public.company_info
set
  company_name = 'Nagel Solutions',
  tagline = 'Sichere Software für operative Unternehmen',
  description = 'Nagel Solutions unterstützt kleine und mittlere Unternehmen dabei, tabellengetriebene Abläufe durch sichere, wartbare Webanwendungen zu ersetzen.',
  primary_email = 'info@nagel-solutions.com',
  contact_email = 'info@nagel-solutions.com',
  primary_phone = null,
  address_line_1 = 'Bahrenfelder Steindamm 48',
  postal_code = '22761',
  city = 'Hamburg',
  country = 'Deutschland',
  legal_form = 'Einzelunternehmen',
  owner_name = 'Fynn Nagel',
  default_meta_title = 'Nagel Solutions | Individuelle Software für operative Unternehmen',
  default_meta_description = 'Nagel Solutions entwickelt sichere Webanwendungen für Handwerksbetriebe, Dienstleister und operative Teams.',
  primary_cta_label = 'Beratung anfragen',
  primary_cta_href = '/kontakt',
  secondary_cta_label = 'Lösungen ansehen',
  secondary_cta_href = '/loesungen'
where singleton_key = 'default';

update public.legal_pages
set
  title = 'Impressum',
  content = 'Angaben gemäß § 5 TMG

Fynn Nagel
Nagel Solutions
Bahrenfelder Steindamm 48
22761 Hamburg
Deutschland

Kontakt
E-Mail: info@nagel-solutions.com

Umsatzsteuer
Gemäß § 19 UStG wird keine Umsatzsteuer berechnet.

Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
Fynn Nagel
Bahrenfelder Steindamm 48
22761 Hamburg
Deutschland

Haftung für Inhalte
Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.

Haftung für Links
Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen.

Urheberrecht
Die durch den Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht.',
  seo_title = 'Impressum | Nagel Solutions',
  seo_description = 'Rechtliche Anbieterkennzeichnung von Nagel Solutions.',
  last_updated_at = timezone('utc', now())
where type = 'imprint';

update public.legal_pages
set
  title = 'Datenschutzerklärung',
  content = '1. Allgemeine Hinweise
Der Schutz Ihrer persönlichen Daten ist uns ein besonderes Anliegen. Wir verarbeiten Ihre Daten ausschließlich auf Grundlage der gesetzlichen Bestimmungen, insbesondere der DSGVO.

2. Verantwortlicher
Fynn Nagel
Nagel Solutions
Bahrenfelder Steindamm 48
22761 Hamburg
Deutschland
E-Mail: info@nagel-solutions.com

3. Hosting
Unsere Website wird auf einer modernen Hosting-Infrastruktur betrieben. Dabei können technische Zugriffsdaten verarbeitet werden, die erforderlich sind, um die Website stabil und sicher bereitzustellen.

4. Backend und Datenbank
Zur Verarbeitung und Speicherung von Daten nutzen wir eine cloudbasierte Infrastruktur. Personenbezogene Daten werden nur verarbeitet, soweit dies für den Betrieb der Website und die Bearbeitung von Anfragen erforderlich ist.

5. Datenverarbeitung bei Anfragen
- Name
- E-Mail-Adresse
- Inhalte Ihrer Anfrage

6. Zweck
- Bearbeitung von Anfragen
- Kommunikation
- Angebotserstellung

7. Rechtsgrundlage
Art. 6 Abs. 1 lit. b DSGVO (Anfragen)
Art. 6 Abs. 1 lit. f DSGVO (Betrieb der Website)

8. Speicherdauer
Daten werden nur so lange gespeichert, wie notwendig.

9. Ihre Rechte
- Auskunft
- Berichtigung
- Löschung
- Widerspruch
- Einschränkung
- Datenübertragbarkeit

10. Datensicherheit
Technische und organisatorische Maßnahmen zum Schutz der Daten.

11. Verschlüsselung
Diese Website nutzt eine sichere Verbindung (SSL/TLS).

12. Server-Logs
Technische Daten können zur Sicherstellung des Betriebs gespeichert werden.

13. Änderungen
Diese Datenschutzerklärung kann angepasst werden.',
  seo_title = 'Datenschutzerklärung | Nagel Solutions',
  seo_description = 'Datenschutzinformationen von Nagel Solutions.',
  last_updated_at = timezone('utc', now())
where type = 'privacy_policy';

update public.faq_items
set answer = 'Nein. Nagel Solutions konzentriert sich auf kleine und mittlere Unternehmen, die praxisnahe Systeme statt schwerfälliger Konzernlogik brauchen.'
where question = 'Arbeiten Sie nur mit großen Unternehmen?';

update public.solutions
set
  cta_label = case
    when cta_type = 'demo' then 'Demo ansehen'
    else 'Beratung anfragen'
  end,
  title = case
    when slug = 'operational-workflow-hub' then 'Operatives Workflow-Zentrum'
    when slug = 'customer-intake-portal' then 'Portal für Kundenanfragen'
    when slug = 'field-service-coordination-app' then 'Anwendung zur Einsatzkoordination'
    else title
  end,
  short_description = case
    when slug = 'operational-workflow-hub' then 'Eine sichere interne Anwendung, die manuelle Übergaben und tabellenbasierte Koordination ersetzt.'
    when slug = 'customer-intake-portal' then 'Ein geführtes Erfassungssystem, das Projektanfragen von Interessenten oder Kunden einheitlich aufnimmt.'
    when slug = 'field-service-coordination-app' then 'Ein strukturierter Planungsbereich für Einsatzsteuerung, Statusmeldungen und transparente Außendienstabläufe.'
    else short_description
  end,
  long_description = case
    when slug = 'operational-workflow-hub' then 'Das operative Workflow-Zentrum bündelt Anfragen, Zuständigkeiten, Statusverfolgung und Freigaben für Teams, die aus Excel-basierter Koordination herausgewachsen sind.'
    when slug = 'customer-intake-portal' then 'Das Portal für Kundenanfragen verwandelt unstrukturierte Eingänge in vollständige, prüfbare Vorgänge mit passenden Feldern, Anhängen und klarer Nachverfolgung.'
    when slug = 'field-service-coordination-app' then 'Die Anwendung zur Einsatzkoordination hilft operativen Teams, Arbeit zwischen Büro und Außendienst zu steuern, ohne auf verstreute Dokumente und manuelle Rückmeldungen angewiesen zu sein.'
    else long_description
  end,
  target_group = case
    when slug = 'operational-workflow-hub' then 'Handwerksbetriebe und Serviceteams'
    when slug = 'customer-intake-portal' then 'Lokale Dienstleistungsunternehmen'
    when slug = 'field-service-coordination-app' then 'Operative Unternehmen mit Außendienstteams'
    else target_group
  end,
  problem_statement = case
    when slug = 'operational-workflow-hub' then 'Wichtige Anfragen und operative Aktualisierungen sind oft über Tabellen, Nachrichten und Einzelwissen verteilt.'
    when slug = 'customer-intake-portal' then 'Erste Kundeninformationen treffen oft unvollständig ein und führen zu manueller Nacharbeit und Verzögerungen.'
    when slug = 'field-service-coordination-app' then 'Planung, Statusmeldungen und Übergaben sind oft fragmentiert und nur schwer verlässlich nachzuvollziehen.'
    else problem_statement
  end,
  value_proposition = case
    when slug = 'operational-workflow-hub' then 'Schafft einen strukturierten Ort, an dem operative Arbeit verlässlich gesteuert werden kann.'
    when slug = 'customer-intake-portal' then 'Schafft einen verlässlicheren ersten Schritt für Ihr Team und Ihre Kunden.'
    when slug = 'field-service-coordination-app' then 'Verbessert Transparenz und reduziert Abstimmungsaufwand über den gesamten Servicezyklus.'
    else value_proposition
  end,
  seo_description = case
    when slug = 'operational-workflow-hub' then 'Interne Workflow-Software für operative Unternehmen, die Struktur und Transparenz brauchen.'
    when slug = 'customer-intake-portal' then 'Digitalisiert Anfrageaufnahme und Qualifizierung für serviceorientierte Unternehmen.'
    when slug = 'field-service-coordination-app' then 'Koordiniert Außendienstteams mit strukturierten Abläufen und klarer operativer Sichtbarkeit.'
    else seo_description
  end
where slug in ('operational-workflow-hub', 'customer-intake-portal', 'field-service-coordination-app');

update public.solution_features
set
  title = case
    when title = 'Centralized requests' then 'Zentrale Anfragen'
    when title = 'Status visibility' then 'Klare Statussicht'
    when title = 'Structured intake forms' then 'Strukturierte Anfrageformulare'
    when title = 'Qualification workflow' then 'Qualifizierungsablauf'
    when title = 'Dispatch overview' then 'Einsatzübersicht'
    when title = 'Execution updates' then 'Rückmeldungen aus der Ausführung'
    else title
  end,
  description = case
    when description = 'Capture operational requests in one controlled workflow.' then 'Erfasst operative Anfragen in einem kontrollierten Ablauf.'
    when description = 'Track every request through a clear lifecycle.' then 'Begleitet jede Anfrage durch einen eindeutigen Ablauf.'
    when description = 'Collect the right project information from the start.' then 'Erfasst von Beginn an die richtigen Projektinformationen.'
    when description = 'Turn raw requests into reviewable opportunities.' then 'Macht aus eingehenden Anfragen sauber prüfbare Vorgänge.'
    when description = 'Coordinate work assignments for field operations.' then 'Koordiniert Arbeitsaufträge für Außendienst und operative Einsätze.'
    when description = 'Keep office and field teams aligned on live work status.' then 'Hält Büro und Außendienst beim aktuellen Arbeitsstand auf demselben Stand.'
    else description
  end;

update public.solution_demos
set
  title = case
    when title = 'Operations dashboard demo' then 'Demo zur operativen Ablaufsteuerung'
    when title = 'Customer intake demo' then 'Demo zur Kundenanfrage-Erfassung'
    else title
  end,
  description = case
    when description = 'A walkthrough of how operational requests can move from intake to completion.' then 'Eine geführte Vorschau darauf, wie operative Anfragen vom Eingang bis zum Abschluss gesteuert werden können.'
    when description = 'A showcase of a guided customer request and qualification flow.' then 'Eine Vorschau auf einen geführten Ablauf für Kundenanfragen und deren Qualifizierung.'
    else description
  end;

update public.page_sections
set
  title = case
    when page_slug = 'home' and section_type = 'hero' then 'Softwaresysteme für operative Unternehmen'
    when page_slug = 'home' and section_type = 'trust-strip' then 'Für anspruchsvolle operative Abläufe gebaut'
    when page_slug = 'solutions' and section_type = 'intro' then 'Lösungen für operative Klarheit'
    when page_slug = 'security-compliance' and section_type = 'hero' then 'Sicherheits- und Vertrauenskommunikation'
    when page_slug = 'contact' and section_type = 'cta' then 'Lassen Sie uns Ihren Ablauf gemeinsam einordnen'
    else title
  end,
  subtitle = case
    when page_slug = 'home' and section_type = 'hero' then 'Excel-Chaos durch sichere Abläufe ersetzen'
    when page_slug = 'home' and section_type = 'trust-strip' then 'Strukturierte Grundlagen von Anfang an'
    when page_slug = 'solutions' and section_type = 'intro' then 'Strukturierte Software dort, wo Tabellen an Grenzen stoßen'
    when page_slug = 'security-compliance' and section_type = 'hero' then 'Vertrauen konkret und nachvollziehbar erklären'
    when page_slug = 'contact' and section_type = 'cta' then 'Manuelle Prozesse in klare Struktur überführen'
    else subtitle
  end,
  content = case
    when page_slug = 'home' and section_type = 'hero' then 'Nagel Solutions entwickelt praxisnahe interne Plattformen und kundennahe Geschäftswerkzeuge für Teams, die Verlässlichkeit, Struktur und Vertrauen benötigen.'
    when page_slug = 'home' and section_type = 'trust-strip' then 'Die Plattformbasis unterstützt sichere Inhalte, Lead-Abläufe, Administration und eine belastbare Weiterentwicklung.'
    when page_slug = 'solutions' and section_type = 'intro' then 'Diese Lösungseinträge sind strukturierte Fachinhalte und können zusammen mit Demos, Funktionsmerkmalen und künftiger branchenspezifischer Positionierung dargestellt werden.'
    when page_slug = 'security-compliance' and section_type = 'hero' then 'Diese Seitenstruktur dient für marketingorientierte Inhaltsblöcke, während die eigentlichen Sicherheitspunkte in strukturierten Datenbanktabellen gepflegt werden.'
    when page_slug = 'contact' and section_type = 'cta' then 'Die Kontakt- und Projektanfrage-Abläufe helfen dabei, qualifizierte Anfragen sauber zu erfassen und verlässlich nachzuverfolgen.'
    else content
  end,
  data_json = case
    when page_slug = 'home' and section_type = 'hero' then '{"primaryCtaHref":"/kontakt","primaryCtaLabel":"Beratung anfragen","secondaryCtaHref":"/loesungen","secondaryCtaLabel":"Lösungen ansehen"}'::jsonb
    when page_slug = 'contact' and section_type = 'cta' then '{"primaryCtaLabel":"Gespräch starten","primaryCtaHref":"/kontakt"}'::jsonb
    else data_json
  end
where page_slug in ('home', 'solutions', 'security-compliance', 'contact');

commit;
