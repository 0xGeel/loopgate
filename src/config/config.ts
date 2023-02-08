const PINATA_GATEWAY_URL = "j.mypinata.cloud";

import { Unlockable } from "./types";

// Specify unlockable files on IPFS by specifying their Content Identifier (CID), and unlock criteria.
const unlockables: Unlockable[] = [
  {
    cid: "bafybeiehgpaip4f7jafzf7imgannx3nnv3ubaiwp6ph56mlyzijpqxi45m", // HTML blog example
    nftId: [
      "0x3d483f631a391a3706446613929d253cfddcb47900a07593c5004c5e3827d9ee",
    ], // You need to own 'GM #1' to unlock this.
  },
  {
    cid: "bafybeihx5eacyxeydcpvudwxa242rnjhn67femy46gzas5d2djb24ti5mi", // MP4 video example
    nftId: [
      "0x8aa9d39f44b4b8488d0bbf04ea12bec99ddbe676a1b9a38d853701327437e78c",
    ], // You need to own 'GM #2' to unlock this.
  },
  {
    cid: "bafybeihhx5v3saq3b7n55ub5q3atuw2udbqc5ictkv2ih7vd3hxptu22nu", // Web game example
    nftId: [
      "0x8aa9d39f44b4b8488d0bbf04ea12bec99ddbe676a1b9a38d853701327437e78c",
      "0x3d483f631a391a3706446613929d253cfddcb47900a07593c5004c5e3827d9ee",
    ], // You need to own 'GM #1' & 'GM #2' to unlock this.
  },
];

export { unlockables, PINATA_GATEWAY_URL };
