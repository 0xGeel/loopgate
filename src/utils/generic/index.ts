import { Unlockable, unlockables } from "../../config/config";

// Compare two arrays containing strings. If the target contains all inside the config, return true
const checkIfContainsAll = (config: string[], target: string[]) => {
  return config.every((x) => target.includes(x));
};

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

// Get the current year
const getCurrentYear = (): number => {
  const currentTime = new Date();
  return currentTime.getFullYear();
};

export { checkIfContainsAll, findUnlockedCids, getCurrentYear };
