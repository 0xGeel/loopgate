import { createClient } from "@supabase/supabase-js";

// Interesting: use the Supabase CLI or Github Actions to automatically generate types
// https://supabase.com/docs/guides/database/api/generating-types

export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON
);
