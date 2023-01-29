// Compare two arrays containing strings. If the target contains all inside the config, return true
const checkIfContainsAll = (config: string[], target: string[]) => {
  return config.every((x) => target.includes(x));
};

export default checkIfContainsAll;
