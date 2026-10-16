-- Active RLS
alter table settings enable row level security;
alter table projects enable row level security;
alter table technologies enable row level security;
alter table services enable row level security;
alter table admin_auth enable row level security;

-- Lecture publique (anon + authenticated)
drop policy if exists "Public read settings" on settings;
create policy "Public read settings" on settings
  for select to anon, authenticated using (true);

drop policy if exists "Public read projects" on projects;
create policy "Public read projects" on projects
  for select to anon, authenticated using (true);

drop policy if exists "Public read technologies" on technologies;
create policy "Public read technologies" on technologies
  for select to anon, authenticated using (true);

drop policy if exists "Public read services" on services;
create policy "Public read services" on services
  for select to anon, authenticated using (true);

-- admin_auth : lecture restreinte
drop policy if exists "Auth read admin_auth" on admin_auth;
create policy "Auth read admin_auth" on admin_auth
  for select to authenticated using (true);

-- Grants explicites au rôle anon
grant usage on schema public to anon, authenticated;
grant select on settings, projects, technologies, services to anon, authenticated;
grant select on admin_auth to authenticated;