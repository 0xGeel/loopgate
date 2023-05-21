import { createClient } from "@supabase/supabase-js";
import { Database } from "./types";

const Supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "Undefined supabase URL",
  process.env.NEXT_PUBLIC_SUPABASE_ANON || "Undefined supabase Anon"
);

export default Supabase;
