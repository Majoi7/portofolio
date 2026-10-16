-- Portfolio Database Schema
-- Run this in your Supabase SQL editor to set up the required tables

-- Settings table
create table if not exists settings (
  id uuid primary key default uuid_generate_v4(),
  wordmark text not null default 'Jeho',
  name text not null,
  title text not null,
  hero_tagline text not null,
  copyright_year integer not null,
  accent_color text not null default '#d4f22b',
  location text not null,
  email text not null,
  whatsapp_number text not null,
  github_url text not null,
  play_intro_animation boolean not null default true,
  portrait_active boolean not null default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Projects table
create table if not exists projects (
  id text primary key,
  slug text not null,
  title text not null,
  tagline text not null,
  category text not null,
  category_label text not null,
  status text not null,
  status_label text not null,
  featured boolean not null default false,
  published boolean not null default false,
  "order" integer not null,
  description text not null,
  cover_image text,
  live_url text,
  case_study jsonb,
  technologies text[],
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Technologies table
create table if not exists technologies (
  id text primary key,
  name text not null,
  category text not null,
  category_label text not null,
  color text not null,
  icon_name text not null,
  visible boolean not null default true,
  "order" integer not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Services table
create table if not exists services (
  id text primary key,
  title text not null,
  tagline text not null,
  description text not null,
  deliverables text[] not null,
  target_audience text not null,
  icon text not null,
  active boolean not null default true,
  "order" integer not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Inquiries table
create table if not exists inquiries (
  id text primary key,
  name text not null,
  email text not null,
  company text,
  project_type text not null,
  budget text,
  message text not null,
  status text not null default 'new',
  created_at timestamp with time zone not null,
  notes text,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Admin auth table
create table if not exists admin_auth (
  id uuid primary key default uuid_generate_v4(),
  is_authenticated boolean not null default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Insert default settings if not exists
insert into settings (
  wordmark, name, title, hero_tagline, copyright_year, accent_color,
  location, email, whatsapp_number, github_url, play_intro_animation, portrait_active
) values (
  'Jeho',
  'Jehovaly Majoi DJIMADJO',
  'Développeur Full-Stack, SaaS & IA',
  'Développeur Full-Stack au Bénin, je conçois des produits numériques — SaaS, applications web, IA — qui donnent vie aux idées.',
  2026,
  '#d4f22b',
  'Bénin, Afrique de l''Ouest',
  'contact@jehovaly.dev',
  '+229 97 00 00 00',
  'https://github.com',
  true,
  true
) on conflict do nothing;

-- Insert default admin auth record (not authenticated)
insert into admin_auth (is_authenticated) values (false) on conflict do nothing;