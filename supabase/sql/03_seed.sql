begin;

insert into public.company_info (
  singleton_key,
  company_name,
  tagline,
  description,
  mission,
  vision,
  primary_email,
  contact_email,
  primary_phone,
  address_line_1,
  postal_code,
  city,
  country,
  legal_form,
  owner_name,
  default_meta_title,
  default_meta_description,
  primary_cta_label,
  primary_cta_href,
  secondary_cta_label,
  secondary_cta_href
)
values (
  'default',
  'Nagel Solutions',
  'Sichere Software für operative Unternehmen',
  'Nagel Solutions unterstützt kleine und mittlere Unternehmen dabei, tabellengetriebene Abläufe durch sichere, wartbare Webanwendungen zu ersetzen.',
  'Praxisnahe digitale Systeme entwickeln, die operative Reibung reduzieren und Vertrauen schaffen.',
  'Der verlässliche Softwarepartner für operative Unternehmen werden, die Klarheit, Struktur und Sicherheit benötigen.',
  'info@nagel-solutions.com',
  'info@nagel-solutions.com',
  null,
  'Bahrenfelder Steindamm 48',
  '22761',
  'Hamburg',
  'Deutschland',
  'Einzelunternehmen',
  'Fynn Nagel',
  'Nagel Solutions | Individuelle Software für operative Unternehmen',
  'Nagel Solutions entwickelt sichere Webanwendungen für Handwerksbetriebe, Dienstleister und operative Teams.',
  'Beratung anfragen',
  '/kontakt',
  'Lösungen ansehen',
  '/loesungen'
)
on conflict (singleton_key) do update
set
  company_name = excluded.company_name,
  tagline = excluded.tagline,
  description = excluded.description,
  mission = excluded.mission,
  vision = excluded.vision,
  primary_email = excluded.primary_email,
  contact_email = excluded.contact_email,
  primary_phone = excluded.primary_phone,
  address_line_1 = excluded.address_line_1,
  postal_code = excluded.postal_code,
  city = excluded.city,
  country = excluded.country,
  legal_form = excluded.legal_form,
  owner_name = excluded.owner_name,
  default_meta_title = excluded.default_meta_title,
  default_meta_description = excluded.default_meta_description,
  primary_cta_label = excluded.primary_cta_label,
  primary_cta_href = excluded.primary_cta_href,
  secondary_cta_label = excluded.secondary_cta_label,
  secondary_cta_href = excluded.secondary_cta_href;

insert into public.legal_pages (
  type,
  title,
  content,
  seo_title,
  seo_description,
  last_updated_at,
  is_active
)
values
  (
    'imprint',
    'Impressum',
    'Angaben gemäß § 5 TMG

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
    'Impressum | Nagel Solutions',
    'Rechtliche Anbieterkennzeichnung von Nagel Solutions.',
    timezone('utc', now()),
    true
  ),
  (
    'privacy_policy',
    'Datenschutzerklärung',
    '1. Allgemeine Hinweise
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
    'Datenschutzerklärung | Nagel Solutions',
    'Datenschutzinformationen von Nagel Solutions.',
    timezone('utc', now()),
    true
  )
on conflict (type) do update
set
  title = excluded.title,
  content = excluded.content,
  seo_title = excluded.seo_title,
  seo_description = excluded.seo_description,
  last_updated_at = excluded.last_updated_at,
  is_active = excluded.is_active;

delete from public.security_features
where title in (
  'Rollenbasierter Zugriff',
  'Nachvollziehbare Geschäftsdaten',
  'Verschlüsselte Datenübertragung'
);

insert into public.security_features (title, description, category, sort_order, is_active)
values
  (
    'Rollenbasierter Zugriff',
    'Interne Abläufe können auf berechtigte Nutzer begrenzt werden, damit sensible Prozess- und Unternehmensdaten geschützt bleiben.',
    'access',
    0,
    true
  ),
  (
    'Nachvollziehbare Geschäftsdaten',
    'Wichtige Datensätze können strukturiert, mit Zeitbezug erfasst und einheitlich geführt werden, statt über Tabellen verteilt zu bleiben.',
    'governance',
    1,
    true
  ),
  (
    'Verschlüsselte Datenübertragung',
    'Die gesamte Plattformkommunikation ist auf moderne HTTPS-Übertragung und sichere Service-Integrationen ausgelegt.',
    'transport',
    2,
    true
  );

delete from public.faq_items
where question in (
  'Arbeiten Sie nur mit großen Unternehmen?',
  'Können Sie bestehende tabellenbasierte Abläufe ersetzen?',
  'Gibt es vor einem vollständigen Projekt auch eine Demo?'
);

insert into public.faq_items (question, answer, category, sort_order, is_active)
values
  (
    'Arbeiten Sie nur mit großen Unternehmen?',
    'Nein. Nagel Solutions konzentriert sich auf kleine und mittlere Unternehmen, die praxisnahe Systeme statt schwerfälliger Konzernlogik brauchen.',
    'general',
    0,
    true
  ),
  (
    'Können Sie bestehende tabellenbasierte Abläufe ersetzen?',
    'Ja. Ein typisches Projekt beginnt damit, tabellenbasierte Schritte in strukturierte Abläufe, Formulare, Rechte und Auswertungen zu überführen.',
    'solutions',
    1,
    true
  ),
  (
    'Gibt es vor einem vollständigen Projekt auch eine Demo?',
    'Ja. Demos und Beispielanwendungen helfen dabei, Vertrauen aufzubauen und greifbar zu machen, wie eine passende Lösung für Ihr Unternehmen funktionieren kann.',
    'demo',
    2,
    true
  );

insert into public.solutions (
  title,
  slug,
  short_description,
  long_description,
  category,
  target_group,
  problem_statement,
  value_proposition,
  seo_title,
  seo_description,
  is_active,
  is_featured,
  sort_order,
  cta_label,
  cta_type
)
values
  (
    'Operatives Workflow-Zentrum',
    'operational-workflow-hub',
    'Eine sichere interne Anwendung, die manuelle Übergaben und tabellenbasierte Koordination ersetzt.',
    'Das operative Workflow-Zentrum bündelt Anfragen, Zuständigkeiten, Statusverfolgung und Freigaben für Teams, die aus Excel-basierter Koordination herausgewachsen sind.',
    'operations',
    'Handwerksbetriebe und Serviceteams',
    'Wichtige Anfragen und operative Aktualisierungen sind oft über Tabellen, Nachrichten und Einzelwissen verteilt.',
    'Schafft einen strukturierten Ort, an dem operative Arbeit verlässlich gesteuert werden kann.',
    'Operatives Workflow-Zentrum | Nagel Solutions',
    'Interne Workflow-Software für operative Unternehmen, die Struktur und Transparenz brauchen.',
    true,
    true,
    0,
    'Beratung anfragen',
    'contact'
  ),
  (
    'Portal für Kundenanfragen',
    'customer-intake-portal',
    'Ein geführtes Erfassungssystem, das Projektanfragen von Interessenten oder Kunden einheitlich aufnimmt.',
    'Das Portal für Kundenanfragen verwandelt unstrukturierte Eingänge in vollständige, prüfbare Vorgänge mit passenden Feldern, Anhängen und klarer Nachverfolgung.',
    'sales',
    'Lokale Dienstleistungsunternehmen',
    'Erste Kundeninformationen treffen oft unvollständig ein und führen zu manueller Nacharbeit und Verzögerungen.',
    'Schafft einen verlässlicheren ersten Schritt für Ihr Team und Ihre Kunden.',
    'Portal für Kundenanfragen | Nagel Solutions',
    'Digitalisiert Anfrageaufnahme und Qualifizierung für serviceorientierte Unternehmen.',
    true,
    true,
    1,
    'Demo ansehen',
    'demo'
  ),
  (
    'Anwendung zur Einsatzkoordination',
    'field-service-coordination-app',
    'Ein strukturierter Planungsbereich für Einsatzsteuerung, Statusmeldungen und transparente Außendienstabläufe.',
    'Die Anwendung zur Einsatzkoordination hilft operativen Teams, Arbeit zwischen Büro und Außendienst zu steuern, ohne auf verstreute Dokumente und manuelle Rückmeldungen angewiesen zu sein.',
    'field-service',
    'Operative Unternehmen mit Außendienstteams',
    'Planung, Statusmeldungen und Übergaben sind oft fragmentiert und nur schwer verlässlich nachzuvollziehen.',
    'Verbessert Transparenz und reduziert Abstimmungsaufwand über den gesamten Servicezyklus.',
    'Anwendung zur Einsatzkoordination | Nagel Solutions',
    'Koordiniert Außendienstteams mit strukturierten Abläufen und klarer operativer Sichtbarkeit.',
    true,
    false,
    2,
    'Beratung anfragen',
    'contact'
  )
on conflict (slug) do update
set
  title = excluded.title,
  short_description = excluded.short_description,
  long_description = excluded.long_description,
  category = excluded.category,
  target_group = excluded.target_group,
  problem_statement = excluded.problem_statement,
  value_proposition = excluded.value_proposition,
  seo_title = excluded.seo_title,
  seo_description = excluded.seo_description,
  is_active = excluded.is_active,
  is_featured = excluded.is_featured,
  sort_order = excluded.sort_order,
  cta_label = excluded.cta_label,
  cta_type = excluded.cta_type;

with seeded_solutions as (
  select id, slug
  from public.solutions
  where slug in (
    'operational-workflow-hub',
    'customer-intake-portal',
    'field-service-coordination-app'
  )
)
delete from public.solution_features
where solution_id in (select id from seeded_solutions);

with seeded_solutions as (
  select id, slug
  from public.solutions
  where slug in (
    'operational-workflow-hub',
    'customer-intake-portal',
    'field-service-coordination-app'
  )
)
insert into public.solution_features (solution_id, title, description, sort_order)
select id, 'Zentrale Anfragen', 'Erfasst operative Anfragen in einem kontrollierten Ablauf.', 0
from seeded_solutions
where slug = 'operational-workflow-hub'
union all
select id, 'Klare Statussicht', 'Begleitet jede Anfrage durch einen eindeutigen Ablauf.', 1
from seeded_solutions
where slug = 'operational-workflow-hub'
union all
select id, 'Strukturierte Anfrageformulare', 'Erfasst von Beginn an die richtigen Projektinformationen.', 0
from seeded_solutions
where slug = 'customer-intake-portal'
union all
select id, 'Qualifizierungsablauf', 'Macht aus eingehenden Anfragen sauber prüfbare Vorgänge.', 1
from seeded_solutions
where slug = 'customer-intake-portal'
union all
select id, 'Einsatzübersicht', 'Koordiniert Arbeitsaufträge für Außendienst und operative Einsätze.', 0
from seeded_solutions
where slug = 'field-service-coordination-app'
union all
select id, 'Rückmeldungen aus der Ausführung', 'Hält Büro und Außendienst beim aktuellen Arbeitsstand auf demselben Stand.', 1
from seeded_solutions
where slug = 'field-service-coordination-app';

with seeded_solutions as (
  select id, slug
  from public.solutions
  where slug in (
    'operational-workflow-hub',
    'customer-intake-portal',
    'field-service-coordination-app'
  )
)
delete from public.solution_demos
where solution_id in (select id from seeded_solutions);

with seeded_solutions as (
  select id, slug
  from public.solutions
  where slug in (
    'operational-workflow-hub',
    'customer-intake-portal',
    'field-service-coordination-app'
  )
)
insert into public.solution_demos (
  solution_id,
  title,
  description,
  demo_url,
  video_url,
  thumbnail_url,
  is_active,
  sort_order
)
select
  id,
  'Demo zur operativen Ablaufsteuerung',
  'Eine geführte Vorschau darauf, wie operative Anfragen vom Eingang bis zum Abschluss gesteuert werden können.',
  'https://example.com/demo/operations-dashboard',
  null,
  'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80',
  true,
  0
from seeded_solutions
where slug = 'operational-workflow-hub'
union all
select
  id,
  'Demo zur Kundenanfrage-Erfassung',
  'Eine Vorschau auf einen geführten Ablauf für Kundenanfragen und deren Qualifizierung.',
  'https://example.com/demo/customer-intake',
  null,
  'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
  true,
  0
from seeded_solutions
where slug = 'customer-intake-portal';

delete from public.page_sections
where page_slug in ('home', 'solutions', 'security-compliance', 'contact');

insert into public.page_sections (
  page_slug,
  section_type,
  title,
  subtitle,
  content,
  data_json,
  sort_order,
  is_active
)
values
  (
    'home',
    'hero',
    'Softwaresysteme für operative Unternehmen',
    'Excel-Chaos durch sichere Abläufe ersetzen',
    'Nagel Solutions entwickelt praxisnahe interne Plattformen und kundennahe Geschäftswerkzeuge für Teams, die Verlässlichkeit, Struktur und Vertrauen benötigen.',
    '{"primaryCtaHref":"/kontakt","primaryCtaLabel":"Beratung anfragen","secondaryCtaHref":"/loesungen","secondaryCtaLabel":"Lösungen ansehen"}'::jsonb,
    0,
    true
  ),
  (
    'home',
    'trust-strip',
    'Für anspruchsvolle operative Abläufe gebaut',
    'Strukturierte Grundlagen von Anfang an',
    'Die Plattformbasis unterstützt sichere Inhalte, Lead-Abläufe, Administration und eine belastbare Weiterentwicklung.',
    '{}'::jsonb,
    1,
    true
  ),
  (
    'solutions',
    'intro',
    'Lösungen für operative Klarheit',
    'Strukturierte Software dort, wo Tabellen an Grenzen stoßen',
    'Diese Lösungseinträge sind strukturierte Fachinhalte und können zusammen mit Demos, Funktionsmerkmalen und künftiger branchenspezifischer Positionierung dargestellt werden.',
    '{}'::jsonb,
    0,
    true
  ),
  (
    'security-compliance',
    'hero',
    'Sicherheits- und Vertrauenskommunikation',
    'Vertrauen konkret und nachvollziehbar erklären',
    'Diese Seitenstruktur dient für marketingorientierte Inhaltsblöcke, während die eigentlichen Sicherheitspunkte in strukturierten Datenbanktabellen gepflegt werden.',
    '{}'::jsonb,
    0,
    true
  ),
  (
    'contact',
    'cta',
    'Lassen Sie uns Ihren Ablauf gemeinsam einordnen',
    'Manuelle Prozesse in klare Struktur überführen',
    'Die Kontakt- und Projektanfrage-Abläufe helfen dabei, qualifizierte Anfragen sauber zu erfassen und verlässlich nachzuverfolgen.',
    '{"primaryCtaLabel":"Gespräch starten","primaryCtaHref":"/kontakt"}'::jsonb,
    0,
    true
  );

commit;
