import { createClient } from "@supabase/supabase-js";

// This uses the public ANON key, which is safe to expose in a browser or
// a server component — it only works because the database's Row Level
// Security policy (see supabase/schema.sql) allows public, read-only
// access to the "businesses" table and nothing else.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Business = {
  code: string;
  name: string | null;
  google_url: string | null;
  instagram_url: string | null;
  whatsapp_url: string | null;
};
