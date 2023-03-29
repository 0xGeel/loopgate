import supabase from "../supabase";
import { parseSqlUnlockable } from "../supabase/helpers";

const fetchALlUnlockables = async () => {
  let { data: unlockables, error } = await supabase
    .from("unlockables_with_criteria")
    .select(`*`);

  if (error) {
    throw error;
  }

  console.log(unlockables);

  if (unlockables) {
    const parsedUnlockables = unlockables.map((item) => {
      return parseSqlUnlockable(item);
    });

    return parsedUnlockables;
  }
};

export default fetchALlUnlockables;
