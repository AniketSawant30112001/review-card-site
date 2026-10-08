-- Run this once in your Supabase project's SQL editor (Project > SQL Editor).

create table if not exists businesses (
  code text primary key,                 -- the card's short code, e.g. 'A001'
  name text,
  google_url text,
  instagram_url text,
  whatsapp_url text,
  created_at timestamptz default now()
);

-- Lock the table down, then open ONLY read access to everyone (anon key),
-- so the public card page can fetch a business but nobody can write
-- through the public key. You (the owner) manage data through the
-- Supabase dashboard's Table Editor, or your own authenticated admin tool.
alter table businesses enable row level security;

create policy "Public can read businesses"
  on businesses for select
  using (true);

-- Example row:
-- insert into businesses (code, name, google_url, instagram_url, whatsapp_url)
-- values ('A001', 'Joe''s Pizza', 'https://g.page/r/xxxx/review',
--         'https://instagram.com/joespizza', 'https://wa.me/15551234567');
