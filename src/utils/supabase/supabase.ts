import { createClient } from "@supabase/supabase-js";
import { Database } from "./types";

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "undefined supabase URL",
  process.env.NEXT_PUBLIC_SUPABASE_ANON || "undefined supabase Anon"
);

export default supabase;
