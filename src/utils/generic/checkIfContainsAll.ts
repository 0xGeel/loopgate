import { ConfigError } from "../../config/types";

/**
 * Compares two arrays, returns true if the target array contains all values of the config array.
 * @param config
 * @param target
 * @returns whether the target array contains all values of the config array
 */
const checkIfContainsAll = (config: string[], target: string[]) => {
  if (config.length === 0) {
    throw new ConfigError("Empty config file");
  }
  return config.every((x) => target.includes(x));
};

export default checkIfContainsAll;
