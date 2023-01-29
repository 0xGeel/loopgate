import { unlockables } from "../../config/config";
import { checkIfContainsAll } from "./index";

// Compare NFTs owned by an individual to the configurated combinations to find unlockable content
const findUnlockedCids = (nfts: any) => {
  // For each row in the config, check if the user holds all NFTs necessary to unlock them.
  const unlocks = unlockables.filter((item) =>
    checkIfContainsAll(item.nftId, nfts)
  );

  // We're only interested in the CIDs
  const cids = unlocks.map((item) => item.cid);

  return cids;
};

export default findUnlockedCids;
