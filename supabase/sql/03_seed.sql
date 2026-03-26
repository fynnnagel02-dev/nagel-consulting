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
  'Nagel Consulting',
  'Secure software for operational businesses',
  'Nagel Consulting helps small and medium-sized businesses replace spreadsheet-driven workflows with secure, maintainable web applications.',
  'Build practical digital systems that reduce operational friction and create trust.',
  'Become the trusted software partner for operational businesses that need clarity, structure, and security.',
  'hello@nagel-consulting.de',
  'contact@nagel-consulting.de',
  '+49 000 000000',
  'Example Street 1',
  '10115',
  'Berlin',
  'Germany',
  'Sole Proprietorship',
  'Fynn Nagel',
  'Nagel Consulting | Custom Software For Operational Businesses',
  'Nagel Consulting builds secure web applications for crafts businesses, service companies, and operational teams.',
  'Request a Consultation',
  '/contact',
  'Explore Solutions',
  '/solutions'
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
    'Imprint',
    'Replace this placeholder imprint with the legally required company information before go-live.',
    'Imprint | Nagel Consulting',
    'Legal company identification for Nagel Consulting.',
    timezone('utc', now()),
    true
  ),
  (
    'privacy_policy',
    'Privacy Policy',
    'Replace this placeholder privacy policy with your final data protection notice before go-live.',
    'Privacy Policy | Nagel Consulting',
    'Privacy and data protection information for Nagel Consulting.',
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
  'Role-based access control',
  'Auditable business data',
  'Encrypted data transport'
);

insert into public.security_features (title, description, category, sort_order, is_active)
values
  (
    'Role-based access control',
    'Internal operations can be restricted to authorized users so sensitive workflow and business data stay protected.',
    'access',
    0,
    true
  ),
  (
    'Auditable business data',
    'Critical records can be structured, timestamped, and managed consistently instead of being scattered across spreadsheets.',
    'governance',
    1,
    true
  ),
  (
    'Encrypted data transport',
    'All platform communication is designed to operate over modern HTTPS-based delivery and secure service integrations.',
    'transport',
    2,
    true
  );

delete from public.faq_items
where question in (
  'Do you only work with large companies?',
  'Can you replace existing spreadsheet workflows?',
  'Do you offer a demo before a full project starts?'
);

insert into public.faq_items (question, answer, category, sort_order, is_active)
values
  (
    'Do you only work with large companies?',
    'No. Nagel Consulting is focused on small and medium-sized businesses that need practical systems instead of enterprise overhead.',
    'general',
    0,
    true
  ),
  (
    'Can you replace existing spreadsheet workflows?',
    'Yes. A common engagement starts by translating spreadsheet-based steps into structured workflows, forms, permissions, and reporting.',
    'solutions',
    1,
    true
  ),
  (
    'Do you offer a demo before a full project starts?',
    'Yes. Demo and showcase applications can be used to build trust and clarify how a tailored system would work for your business.',
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
    'Operational Workflow Hub',
    'operational-workflow-hub',
    'A secure internal platform for replacing manual task handoffs and spreadsheet coordination.',
    'Operational Workflow Hub centralizes operational requests, assignments, status tracking, and approvals for teams that have outgrown Excel-based coordination.',
    'operations',
    'Craft businesses and service teams',
    'Important requests and operational updates are often spread across spreadsheets, messages, and personal knowledge.',
    'Give the business one structured place to manage operational work reliably.',
    'Operational Workflow Hub | Nagel Consulting',
    'Internal workflow software for operational businesses that need structure and transparency.',
    true,
    true,
    0,
    'Request a Consultation',
    'contact'
  ),
  (
    'Customer Intake Portal',
    'customer-intake-portal',
    'A guided intake system for capturing consistent project requests from prospects or customers.',
    'Customer Intake Portal turns unstructured inbound requests into complete, reviewable records with the right fields, attachments, and follow-up flow.',
    'sales',
    'Local service companies',
    'Initial customer information often arrives incomplete, forcing manual follow-up and delays.',
    'Create a more reliable first step for both your team and your customers.',
    'Customer Intake Portal | Nagel Consulting',
    'Digitize customer intake and qualification for service-oriented businesses.',
    true,
    true,
    1,
    'View Demo',
    'demo'
  ),
  (
    'Field Service Coordination App',
    'field-service-coordination-app',
    'A structured planning workspace for dispatching, status updates, and field execution visibility.',
    'Field Service Coordination App helps operational teams coordinate work across office and field staff without relying on scattered documents and manual updates.',
    'field-service',
    'Operational companies with field teams',
    'Scheduling, status reporting, and handoffs are often fragmented and hard to trust.',
    'Improve transparency and reduce coordination overhead across the full service cycle.',
    'Field Service Coordination App | Nagel Consulting',
    'Coordinate field teams with structured workflows and real-time operational visibility.',
    true,
    false,
    2,
    'Request a Consultation',
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
select id, 'Centralized requests', 'Capture operational requests in one controlled workflow.', 0
from seeded_solutions
where slug = 'operational-workflow-hub'
union all
select id, 'Status visibility', 'Track every request through a clear lifecycle.', 1
from seeded_solutions
where slug = 'operational-workflow-hub'
union all
select id, 'Structured intake forms', 'Collect the right project information from the start.', 0
from seeded_solutions
where slug = 'customer-intake-portal'
union all
select id, 'Qualification workflow', 'Turn raw requests into reviewable opportunities.', 1
from seeded_solutions
where slug = 'customer-intake-portal'
union all
select id, 'Dispatch overview', 'Coordinate work assignments for field operations.', 0
from seeded_solutions
where slug = 'field-service-coordination-app'
union all
select id, 'Execution updates', 'Keep office and field teams aligned on live work status.', 1
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
  'Operations dashboard demo',
  'A walkthrough of how operational requests can move from intake to completion.',
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
  'Customer intake demo',
  'A showcase of a guided customer request and qualification flow.',
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
    'Software systems for operational businesses',
    'Replace spreadsheet chaos with secure workflows',
    'Nagel Consulting builds practical internal platforms and client-facing business tools for teams that need reliability, structure, and trust.',
    '{"primaryCtaHref":"/contact","primaryCtaLabel":"Request a Consultation","secondaryCtaHref":"/solutions","secondaryCtaLabel":"Explore Solutions"}'::jsonb,
    0,
    true
  ),
  (
    'home',
    'trust-strip',
    'Built for serious operations',
    'Structured foundations from the start',
    'The platform foundation supports secure content, inbound lead workflows, admin management, and scalable future expansion.',
    '{}'::jsonb,
    1,
    true
  ),
  (
    'solutions',
    'intro',
    'Solutions for operational clarity',
    'Structured software where spreadsheets fall short',
    'These solution entries are structured domain records and can be showcased alongside demos, features, and future industry-specific positioning.',
    '{}'::jsonb,
    0,
    true
  ),
  (
    'security-compliance',
    'hero',
    'Security and compliance communication',
    'Explain trust in concrete terms',
    'Use this page composition layer for marketing-oriented layout blocks while keeping the actual security items in structured database tables.',
    '{}'::jsonb,
    0,
    true
  ),
  (
    'contact',
    'cta',
    'Let’s review your workflow',
    'Bring structure to manual processes',
    'Use the contact and project-request lead flows to capture qualified inquiries and follow up consistently.',
    '{"primaryCtaLabel":"Start the Conversation","primaryCtaHref":"/contact"}'::jsonb,
    0,
    true
  );

commit;
