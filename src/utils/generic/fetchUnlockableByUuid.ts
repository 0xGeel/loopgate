import supabase from "../supabase";

const fetchUnlockableByUuid = async (uuid: string) => {
  let { data: unlockables, error } = await supabase
    .from("unlockables_with_criteria")
    .select(`*`)
    .eq("id", uuid)
    .maybeSingle();

  if (error) {
    throw error;
  }

  if (unlockables) {
    return unlockables;
  }
};

export default fetchUnlockableByUuid;
