import { unlockables } from "../../config/config";
import { checkIfContainsAll } from "./index";
import { Unlockable, ConfigError } from "../../config/types";

// Compare NFTs owned by an individual to the configurated combinations to find unlockable content
/**
 * Find if the user should have access to CIDs based on their NFTs held
 * @param nfts
 * @param unlockablesArray
 * @returns CIDs of files unlocked by the user
 */
const findUnlockedCids = (
  nfts: string[],
  unlockablesArray: Unlockable[] = unlockables
) => {
  if (unlockablesArray.length === 0) {
    throw new ConfigError("Empty config file");
  }

  // For each row in the config, check if the user holds all NFTs necessary to unlock them.
  const unlocks = unlockablesArray.filter((item) =>
    checkIfContainsAll(item.nftId, nfts)
  );

  // We're only interested in the CIDs
  const cids = unlocks.map((item) => item.cid);

  return cids;
};

export default findUnlockedCids;
