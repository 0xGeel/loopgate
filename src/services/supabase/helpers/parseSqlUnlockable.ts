import { UnlockableV2 } from "@/src/config/types";
import { parseNftIdString } from "@/src/utils/generic";

export const parseSqlUnlockable = (supabaseUnlockable: any): UnlockableV2 => {
  const nftIds = parseNftIdString(supabaseUnlockable.nft_ids);

  const unlockable = {
    id: supabaseUnlockable.id,
    owner: supabaseUnlockable.owner,
    metadata: {
      name: supabaseUnlockable?.name,
      description: supabaseUnlockable?.description,
      lastUpdated: supabaseUnlockable.updated_at,
    },
    content: {
      type: "IPFS" as "IPFS",
      url: supabaseUnlockable.content_url,
    },
    unlockCriteria: {
      unlockAmount: supabaseUnlockable.criteria_unlock_amount,
      nftId: nftIds,
    },
  };

  return unlockable;
};
