import { SupabaseUnlockable } from "../typeExtensions";

const isUnlockableValid = (unlockable: SupabaseUnlockable): boolean => {
  for (const key in unlockable) {
    if (
      key !== "name" &&
      key !== "description" &&
      unlockable[key as keyof SupabaseUnlockable] === null
    ) {
      return false;
    }
  }
  return true;
};

export default isUnlockableValid;
