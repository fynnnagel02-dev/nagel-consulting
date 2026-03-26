begin;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and role = 'admin'
  );
$$;

alter table public.profiles enable row level security;
alter table public.company_info enable row level security;
alter table public.solutions enable row level security;
alter table public.solution_features enable row level security;
alter table public.solution_demos enable row level security;
alter table public.leads enable row level security;
alter table public.resources enable row level security;
alter table public.security_features enable row level security;
alter table public.industries enable row level security;
alter table public.faq_items enable row level security;
alter table public.legal_pages enable row level security;
alter table public.page_sections enable row level security;

drop policy if exists "profiles_admin_all" on public.profiles;
create policy "profiles_admin_all"
  on public.profiles
  for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "profiles_self_select" on public.profiles;
create policy "profiles_self_select"
  on public.profiles
  for select
  to authenticated
  using (auth.uid() = id);

drop policy if exists "profiles_self_update" on public.profiles;
create policy "profiles_self_update"
  on public.profiles
  for update
  to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);

drop policy if exists "company_info_public_read" on public.company_info;
create policy "company_info_public_read"
  on public.company_info
  for select
  to anon, authenticated
  using (true);

drop policy if exists "company_info_admin_all" on public.company_info;
create policy "company_info_admin_all"
  on public.company_info
  for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "solutions_public_read" on public.solutions;
create policy "solutions_public_read"
  on public.solutions
  for select
  to anon, authenticated
  using (is_active = true);

drop policy if exists "solutions_admin_all" on public.solutions;
create policy "solutions_admin_all"
  on public.solutions
  for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "solution_features_public_read" on public.solution_features;
create policy "solution_features_public_read"
  on public.solution_features
  for select
  to anon, authenticated
  using (
    exists (
      select 1
      from public.solutions
      where solutions.id = solution_features.solution_id
        and solutions.is_active = true
    )
  );

drop policy if exists "solution_features_admin_all" on public.solution_features;
create policy "solution_features_admin_all"
  on public.solution_features
  for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "solution_demos_public_read" on public.solution_demos;
create policy "solution_demos_public_read"
  on public.solution_demos
  for select
  to anon, authenticated
  using (
    is_active = true
    and exists (
      select 1
      from public.solutions
      where solutions.id = solution_demos.solution_id
        and solutions.is_active = true
    )
  );

drop policy if exists "solution_demos_admin_all" on public.solution_demos;
create policy "solution_demos_admin_all"
  on public.solution_demos
  for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "leads_public_insert" on public.leads;
create policy "leads_public_insert"
  on public.leads
  for insert
  to anon, authenticated
  with check (
    consent_privacy = true
    and status = 'new'
    and internal_notes is null
  );

drop policy if exists "leads_admin_all" on public.leads;
create policy "leads_admin_all"
  on public.leads
  for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "resources_public_read" on public.resources;
create policy "resources_public_read"
  on public.resources
  for select
  to anon, authenticated
  using (is_published = true and published_at is not null);

drop policy if exists "resources_admin_all" on public.resources;
create policy "resources_admin_all"
  on public.resources
  for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "security_features_public_read" on public.security_features;
create policy "security_features_public_read"
  on public.security_features
  for select
  to anon, authenticated
  using (is_active = true);

drop policy if exists "security_features_admin_all" on public.security_features;
create policy "security_features_admin_all"
  on public.security_features
  for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "industries_public_read" on public.industries;
create policy "industries_public_read"
  on public.industries
  for select
  to anon, authenticated
  using (is_active = true);

drop policy if exists "industries_admin_all" on public.industries;
create policy "industries_admin_all"
  on public.industries
  for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "faq_items_public_read" on public.faq_items;
create policy "faq_items_public_read"
  on public.faq_items
  for select
  to anon, authenticated
  using (is_active = true);

drop policy if exists "faq_items_admin_all" on public.faq_items;
create policy "faq_items_admin_all"
  on public.faq_items
  for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "legal_pages_public_read" on public.legal_pages;
create policy "legal_pages_public_read"
  on public.legal_pages
  for select
  to anon, authenticated
  using (is_active = true);

drop policy if exists "legal_pages_admin_all" on public.legal_pages;
create policy "legal_pages_admin_all"
  on public.legal_pages
  for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "page_sections_public_read" on public.page_sections;
create policy "page_sections_public_read"
  on public.page_sections
  for select
  to anon, authenticated
  using (is_active = true);

drop policy if exists "page_sections_admin_all" on public.page_sections;
create policy "page_sections_admin_all"
  on public.page_sections
  for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

commit;
