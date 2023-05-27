import { UnlockableV2 } from "@/src/config/types";
import { parseNftIdString } from "@/src/utils/generic";
import { SupabaseUnlockable } from "../typeExtenstions";

// Mapping function for Supabase Unlockable -> LoopGate Unlockable Type
export const mapUnlockable = (
  supabaseData: SupabaseUnlockable
): UnlockableV2 => {
  const unlockable = {
    id: supabaseData.id as string,
    owner: supabaseData.owner as string,
    metadata: {
      name: supabaseData?.name as string | undefined,
      description: supabaseData?.description as string | undefined,
      lastUpdated: supabaseData.updated_at as string,
      createdAt: supabaseData.created_at as string,
    },
    unlisted: supabaseData.unlisted as boolean,
    content: {
      type: "IPFS" as const,
      url: supabaseData.content_url as string,
    },
    unlockCriteria: {
      unlockAmount: supabaseData.criteria_unlock_amount as number,
      nftId: parseNftIdString(supabaseData.nft_ids),
    },
  };

  return unlockable;
};
