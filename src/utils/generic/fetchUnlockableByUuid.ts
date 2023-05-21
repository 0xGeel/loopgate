import Supabase from "../supabase";
import { parseSqlUnlockable } from "../supabase/helpers";

// TODO: Inserting data https://supabase.com/docs/reference/javascript/insert
// TODO: Updating data https://supabase.com/docs/reference/javascript/update
// OR: Upserting data https://supabase.com/docs/reference/javascript/upsert
// TODO: Deleting data https://supabase.com/docs/reference/javascript/delete
// RLS Policies: Only auth users can mutate

const fetchUnlockableByUuid = async (uuid: string) => {
  let { data: unlockables, error } = await Supabase.from(
    "unlockables_with_criteria"
  )
    .select(`*`)
    .eq("id", uuid)
    .maybeSingle();

  if (error) {
    throw error;
  }

  if (unlockables) {
    return parseSqlUnlockable(unlockables);
  }
};

export default fetchUnlockableByUuid;
