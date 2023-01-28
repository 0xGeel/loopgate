const PINATA_GATEWAY_URL = "j.mypinata.cloud";

export interface Unlockable {
  cid: `baf${string}`; // Submarined Pinata files always start with 'baf'
  name?: string; // Names are optional. If unspecified, the 'name' set inside Pinata will be used.
  nftId: `0x${string}`[];
}

// Specify unlockable files on IPFS by specifying their Content Identifier (CID), and unlock criteria.
const unlockables: Unlockable[] = [
  {
    cid: "bafkreicojr4yi3jeuzrjsy7xs7noc7xakd7xwh3gbaxv5gidbme3pcxiby", // JPG image example
    nftId: [
      "0x3d483f631a391a3706446613929d253cfddcb47900a07593c5004c5e3827d9ee",
    ], // GM #1
  },
  {
    cid: "bafybeihx5eacyxeydcpvudwxa242rnjhn67femy46gzas5d2djb24ti5mi", // MP4 video example
    nftId: [
      "0x8aa9d39f44b4b8488d0bbf04ea12bec99ddbe676a1b9a38d853701327437e78c",
    ], // GM #2
  },
  {
    cid: "bafybeihhx5v3saq3b7n55ub5q3atuw2udbqc5ictkv2ih7vd3hxptu22nu", // HTML website example
    nftId: [
      "0x8aa9d39f44b4b8488d0bbf04ea12bec99ddbe676a1b9a38d853701327437e78c",
      "0x3d483f631a391a3706446613929d253cfddcb47900a07593c5004c5e3827d9ee",
    ], // GM #1 & GM #2
  },
];

export { unlockables, PINATA_GATEWAY_URL };
