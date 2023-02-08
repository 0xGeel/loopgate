export interface Unlockable {
  cid: `baf${string}`; // Submarined Pinata files always start with 'baf'
  name?: string; // Names are optional. If unspecified, the 'name' set inside Pinata will be used.
  nftId: `0x${string}`[];
}

export class ConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ConfigError";
  }
}
