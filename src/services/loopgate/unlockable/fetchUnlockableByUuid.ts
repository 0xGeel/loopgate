import Supabase from "../../supabase";
import { parseSqlUnlockable } from "../../supabase/helpers";

export const fetchUnlockableByUuid = async (uuid: string) => {
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
