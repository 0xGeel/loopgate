import { Database } from "./types";

export type SupabaseUnlockable =
  Database["public"]["Views"]["unlockables_with_criteria"]["Row"];
