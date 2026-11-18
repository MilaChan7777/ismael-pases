-- Ejecuta en Supabase > SQL Editor.
create table if not exists public.invitations (
  id uuid primary key default gen_random_uuid(),
  token text not null unique,
  guest_name text not null,
  greeting_type text not null check (greeting_type in ('individual','familia')),
  seats integer not null check (seats between 1 and 30),
  active boolean not null default true,
  created_at timestamptz not null default now()
);
create index if not exists invitations_created_at_idx on public.invitations(created_at desc);
-- Nadie consulta esta tabla directamente desde el navegador.
alter table public.invitations enable row level security;
-- SIN políticas: anon/authenticated no pueden leer/escribir.
-- Las funciones API del servidor usan service_role exclusivamente.
