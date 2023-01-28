import { Unlockable, unlockables } from "../../config/config";

// Compare two arrays containing strings. If the target contains all inside the config, return true
const checkIfContainsAll = (config: string[], target: string[]) => {
  return config.every((x) => target.includes(x));
};

// Compare NFTs owned by an individual to the configurated combinations to find unlockable content
const findUnlocks = (nfts: any) => {
  let unlocks: Unlockable[] = [];

  // For each row in the config, check if the user holds all NFTs necessary to unlock them.
  unlockables.forEach((item) => {
    // Compare nftIds for the item with the NFTs owned by the user. If true, add to the unlocks
    checkIfContainsAll(item.nftId, nfts) && unlocks.push(item);
  });

  return unlocks;
};

// Get the current year
const getCurrentYear = (): number => {
  const currentTime = new Date();
  return currentTime.getFullYear();
};

export { checkIfContainsAll, findUnlocks, getCurrentYear };
