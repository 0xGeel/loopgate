import Supabase from "../supabase";
import { parseSqlUnlockable } from "../supabase/helpers";

const fetchAllUnlockables = async (owner?: string) => {
  let { data: unlockables, error } = await Supabase.from(
    "unlockables_with_criteria"
  )
    .select(`*`)
    .eq("owner", owner ? owner : "*");

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

export default fetchAllUnlockables;
