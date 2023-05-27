import Supabase from "../../supabase";
import { parseSqlUnlockable } from "../../supabase/helpers";

export const fetchAllUnlockables = async (owner?: string) => {
  const { data: unlockables, error } = await Supabase.from(
    "unlockables_with_criteria"
  )
    .select(`*`)
    .eq(owner ? "owner" : "", owner)
    .neq("unlisted", true);

  if (error) {
    throw error;
  }

  if (unlockables) {
    const parsedUnlockables = unlockables.map((item) =>
      parseSqlUnlockable(item)
    );

    return parsedUnlockables;
  }
};
