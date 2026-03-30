begin;

alter table public.leads
  add column if not exists inquiry_category text;

commit;
