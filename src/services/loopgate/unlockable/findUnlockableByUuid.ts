import { unlockablesV2 } from "../../../config/config";
import { ConfigError,UnlockableV2 } from "../../../config/types";

export const findUnlockableByUuid = (
  uuid: string,
  unlockablesArray: UnlockableV2[] = unlockablesV2
) => {
  if (unlockablesArray.length === 0) {
    throw new ConfigError("Empty config file");
  }

  return unlockablesArray.filter(item => item.id === uuid)[0];
};
