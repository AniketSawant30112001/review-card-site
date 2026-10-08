# Review Card Site

The public page every customer lands on when they scan the QR code or tap
the NFC tag on a card: `yourdomain.com/c/A001` shows that business's name
and their Google review / Instagram / WhatsApp links.

## 1. Set up the database (Supabase — free tier is enough to start)

1. Create a project at https://supabase.com
2. Open **SQL Editor** and run everything in `supabase/schema.sql`
3. Open **Project Settings → API** and copy:
   - `Project URL`
   - `anon public` key

## 2. Configure the app

Copy `.env.example` to `.env.local` and fill in the two values from step 1.

```
cp .env.example .env.local
```

## 3. Run it locally (optional, to test before deploying)

```
npm install
npm run dev
```

Add a test row in Supabase's Table Editor (table `businesses`), then visit
`http://localhost:3000/c/A001` (using whatever code you entered).

## 4. Deploy (Vercel — free tier is enough to start)

1. Push this folder to a GitHub repo
2. Go to https://vercel.com → **New Project** → import that repo
3. In the project's **Environment Variables**, add the same two values
   from `.env.local`
4. Deploy. Your public page is now live at
   `your-project.vercel.app/c/A001`

## 5. Connect your own domain

In Vercel → **Settings → Domains**, add your domain (e.g. `revu.link`) and
follow the DNS steps it gives you. After that, every card's page is at
`revu.link/c/A001`.

## 6. Managing businesses day to day

For now, add/edit rows directly in Supabase's **Table Editor** — no code
needed: set `code`, `name`, `google_url`, `instagram_url`, `whatsapp_url`
for each business you sell a card to. Changes appear on the live page
within about a minute (no redeploy needed).

Once you're managing more than a handful of businesses, it's worth asking
Claude to build you a small authenticated admin page (so you're not
hand-editing a spreadsheet-like table for 1,000 clients) — the same
Supabase project can power that too.

## 7. Printing the cards

- **QR code**: encode `https://revu.link/c/A001` (swap in your real domain
  and each card's code) — generate these as a batch before sending to
  your printer.
- **NFC tag**: write the exact same URL to the tag using any NFC-writing
  app, or have your card manufacturer do it in bulk — it's the same
  destination as the QR, not a separate setup.
