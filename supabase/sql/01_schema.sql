begin;

create extension if not exists pgcrypto;

do $$
begin
  if not exists (select 1 from pg_type where typname = 'profile_role') then
    create type public.profile_role as enum ('member', 'admin');
  end if;

  if not exists (select 1 from pg_type where typname = 'lead_type') then
    create type public.lead_type as enum ('contact', 'project_request', 'demo_request');
  end if;

  if not exists (select 1 from pg_type where typname = 'lead_status') then
    create type public.lead_status as enum ('new', 'contacted', 'qualified', 'proposal_sent', 'won', 'lost');
  end if;

  if not exists (select 1 from pg_type where typname = 'legal_page_type') then
    create type public.legal_page_type as enum ('imprint', 'privacy_policy');
  end if;

  if not exists (select 1 from pg_type where typname = 'cta_type') then
    create type public.cta_type as enum ('contact', 'demo', 'internal_link', 'external_link');
  end if;
end
$$;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  full_name text,
  role public.profile_role not null default 'member',
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint profiles_email_unique unique (email)
);

create table if not exists public.company_info (
  id uuid primary key default gen_random_uuid(),
  singleton_key text not null default 'default',
  company_name text not null,
  tagline text,
  description text,
  mission text,
  vision text,
  primary_email text,
  contact_email text,
  primary_phone text,
  address_line_1 text,
  address_line_2 text,
  postal_code text,
  city text,
  country text,
  legal_form text,
  owner_name text,
  logo_url text,
  wordmark_url text,
  linkedin_url text,
  default_meta_title text,
  default_meta_description text,
  primary_cta_label text,
  primary_cta_href text,
  secondary_cta_label text,
  secondary_cta_href text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint company_info_singleton_key_unique unique (singleton_key)
);

create table if not exists public.solutions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  title text not null,
  slug text not null,
  short_description text,
  long_description text,
  category text,
  target_group text,
  problem_statement text,
  value_proposition text,
  demo_url text,
  video_url text,
  thumbnail_url text,
  seo_title text,
  seo_description text,
  is_active boolean not null default true,
  is_featured boolean not null default false,
  sort_order integer not null default 0,
  cta_label text,
  cta_type public.cta_type not null default 'contact',
  constraint solutions_slug_unique unique (slug),
  constraint solutions_sort_order_check check (sort_order >= 0)
);

create table if not exists public.solution_features (
  id uuid primary key default gen_random_uuid(),
  solution_id uuid not null references public.solutions (id) on delete cascade,
  title text not null,
  description text,
  sort_order integer not null default 0,
  constraint solution_features_sort_order_check check (sort_order >= 0)
);

create table if not exists public.solution_demos (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  solution_id uuid not null references public.solutions (id) on delete cascade,
  title text not null,
  description text,
  demo_url text not null,
  video_url text,
  thumbnail_url text,
  is_active boolean not null default true,
  sort_order integer not null default 0,
  constraint solution_demos_sort_order_check check (sort_order >= 0)
);

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  type public.lead_type not null,
  status public.lead_status not null default 'new',
  first_name text not null,
  last_name text not null,
  company_name text,
  email text not null,
  phone text,
  industry text,
  employee_count_range text,
  current_tool text,
  process_to_digitize text,
  inquiry_category text,
  message text,
  source text,
  consent_privacy boolean not null,
  related_solution_slug text,
  related_demo_id uuid references public.solution_demos (id) on delete set null,
  internal_notes text,
  constraint leads_privacy_consent_check check (consent_privacy = true)
);

create table if not exists public.resources (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  title text not null,
  slug text not null,
  excerpt text,
  content text not null,
  category text,
  tags text[] not null default '{}'::text[],
  thumbnail_url text,
  seo_title text,
  seo_description text,
  is_published boolean not null default false,
  is_featured boolean not null default false,
  published_at timestamptz,
  constraint resources_slug_unique unique (slug)
);

create table if not exists public.security_features (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  title text not null,
  description text not null,
  category text,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  constraint security_features_sort_order_check check (sort_order >= 0)
);

create table if not exists public.industries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  name text not null,
  slug text not null,
  description text,
  typical_problems text,
  typical_use_cases text,
  seo_title text,
  seo_description text,
  is_active boolean not null default true,
  constraint industries_slug_unique unique (slug)
);

create table if not exists public.faq_items (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  question text not null,
  answer text not null,
  category text,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  constraint faq_items_sort_order_check check (sort_order >= 0)
);

create table if not exists public.legal_pages (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  type public.legal_page_type not null,
  title text not null,
  content text not null,
  seo_title text,
  seo_description text,
  last_updated_at timestamptz not null default timezone('utc', now()),
  is_active boolean not null default true,
  constraint legal_pages_type_unique unique (type)
);

create table if not exists public.page_sections (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  page_slug text not null,
  section_type text not null,
  title text,
  subtitle text,
  content text,
  data_json jsonb not null default '{}'::jsonb,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  constraint page_sections_sort_order_check check (sort_order >= 0)
);

create index if not exists profiles_role_idx
  on public.profiles (role);

create index if not exists leads_status_idx
  on public.leads (status);

create index if not exists leads_type_idx
  on public.leads (type);

create index if not exists leads_created_at_desc_idx
  on public.leads (created_at desc);

create index if not exists leads_related_demo_id_idx
  on public.leads (related_demo_id);

create index if not exists leads_email_idx
  on public.leads (email);

create index if not exists solutions_active_featured_sort_idx
  on public.solutions (is_active, is_featured, sort_order, created_at desc);

create index if not exists solutions_active_sort_idx
  on public.solutions (is_active, sort_order, created_at desc);

create index if not exists solution_features_solution_sort_idx
  on public.solution_features (solution_id, sort_order);

create index if not exists solution_demos_solution_active_sort_idx
  on public.solution_demos (solution_id, is_active, sort_order, created_at desc);

create index if not exists solution_demos_active_sort_idx
  on public.solution_demos (is_active, sort_order, created_at desc);

create index if not exists resources_published_featured_idx
  on public.resources (is_published, is_featured, published_at desc);

create index if not exists resources_published_idx
  on public.resources (is_published, published_at desc);

create index if not exists resources_tags_gin_idx
  on public.resources using gin (tags);

create index if not exists security_features_active_sort_idx
  on public.security_features (is_active, sort_order, created_at desc);

create index if not exists industries_active_name_idx
  on public.industries (is_active, name);

create index if not exists faq_items_active_category_sort_idx
  on public.faq_items (is_active, category, sort_order, created_at desc);

create index if not exists legal_pages_active_idx
  on public.legal_pages (is_active, type);

create index if not exists page_sections_page_active_sort_idx
  on public.page_sections (page_slug, is_active, sort_order, created_at desc);

create or replace function public.handle_new_user_profile()
returns trigger
language plpgsql
security definer
set search_path = public, auth
as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (
    new.id,
    coalesce(new.email, ''),
    coalesce(new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'name'),
    'member'
  )
  on conflict (id) do update
    set email = excluded.email,
        full_name = coalesce(excluded.full_name, public.profiles.full_name);

  return new;
end;
$$;

create or replace function public.prevent_profile_self_update()
returns trigger
language plpgsql
as $$
begin
  if auth.uid() = old.id then
    if new.role is distinct from old.role then
      raise exception 'Profile role cannot be changed by the profile owner';
    end if;

    if new.email is distinct from old.email then
      raise exception 'Profile email cannot be changed through the profile table';
    end if;
  end if;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user_profile();

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
  before update on public.profiles
  for each row
  execute function public.set_updated_at();

drop trigger if exists company_info_set_updated_at on public.company_info;
create trigger company_info_set_updated_at
  before update on public.company_info
  for each row
  execute function public.set_updated_at();

drop trigger if exists solutions_set_updated_at on public.solutions;
create trigger solutions_set_updated_at
  before update on public.solutions
  for each row
  execute function public.set_updated_at();

drop trigger if exists solution_demos_set_updated_at on public.solution_demos;
create trigger solution_demos_set_updated_at
  before update on public.solution_demos
  for each row
  execute function public.set_updated_at();

drop trigger if exists leads_set_updated_at on public.leads;
create trigger leads_set_updated_at
  before update on public.leads
  for each row
  execute function public.set_updated_at();

drop trigger if exists resources_set_updated_at on public.resources;
create trigger resources_set_updated_at
  before update on public.resources
  for each row
  execute function public.set_updated_at();

drop trigger if exists security_features_set_updated_at on public.security_features;
create trigger security_features_set_updated_at
  before update on public.security_features
  for each row
  execute function public.set_updated_at();

drop trigger if exists industries_set_updated_at on public.industries;
create trigger industries_set_updated_at
  before update on public.industries
  for each row
  execute function public.set_updated_at();

drop trigger if exists faq_items_set_updated_at on public.faq_items;
create trigger faq_items_set_updated_at
  before update on public.faq_items
  for each row
  execute function public.set_updated_at();

drop trigger if exists legal_pages_set_updated_at on public.legal_pages;
create trigger legal_pages_set_updated_at
  before update on public.legal_pages
  for each row
  execute function public.set_updated_at();

drop trigger if exists page_sections_set_updated_at on public.page_sections;
create trigger page_sections_set_updated_at
  before update on public.page_sections
  for each row
  execute function public.set_updated_at();

drop trigger if exists profiles_prevent_self_role_change on public.profiles;
create trigger profiles_prevent_self_role_change
  before update on public.profiles
  for each row
  execute function public.prevent_profile_self_update();

commit;
