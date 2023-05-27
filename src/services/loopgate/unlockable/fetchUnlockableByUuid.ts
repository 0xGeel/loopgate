import Supabase from "../../supabase";
import { mapUnlockable } from "../../supabase/helpers";

export const fetchUnlockableByUuid = async (uuid: string) => {
  const { data: unlockables, error } = await Supabase.from(
    "unlockables_with_criteria"
  )
    .select(`*`)
    .eq("id", uuid)
    .maybeSingle();

  if (error) {
    throw error;
  }

  if (unlockables) {
    return mapUnlockable(unlockables);
  }
};
