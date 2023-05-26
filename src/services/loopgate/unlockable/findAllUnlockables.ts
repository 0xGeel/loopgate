import { unlockablesV2 } from "../../../config/config";
import { UnlockableV2, ConfigError } from "../../../config/types";

export const findAllUnlockables = (
  owner?: string,
  unlockablesArray: UnlockableV2[] = unlockablesV2
) => {
  if (unlockablesArray.length === 0) {
    throw new ConfigError("Empty config file");
  }

  if (owner) {
    return unlockablesArray.filter((unlockable) => unlockable.owner === owner);
  }

  return unlockablesArray;
};
