import { createClient } from "@supabase/supabase-js";

// Note: Github Actions need to be configured for these to work.
// URL: https://github.com/0xGeel/loopgate/settings/secrets/actions

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON
);

export default supabase;
