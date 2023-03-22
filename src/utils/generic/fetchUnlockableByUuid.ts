import supabase from "../supabase";

const fetchUnlockableByUuid = async (uuid: string) => {
  let { data: unlockables, error } = await supabase
    .from("unlockables")
    .select(
      `id, name, description, owner, content_type_id, content_url, criteria_unlock_amount, updated_at`
    )
    .eq("id", uuid)
    .single();

  if (error) {
    throw error;
  }

  if (unlockables) {
    console.log(unlockables);
    return unlockables;
  }
};

export default fetchUnlockableByUuid;
