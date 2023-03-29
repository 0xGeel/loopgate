import { Unlockable, UnlockableV2 } from "./types";

/*********************************************************
Replace the `unlockables` below with your own content. 
Here are two examples:

1️⃣ Unlock a Submarined file by owning one specific NFT.
{ 
  cid: "<YOUR_CID>", 
  nftId: ["<YOUR_NFT_ID"]
}

2️⃣ Unlock a Submarined file by owning multiple NFTs.
{
  cid: "<YOUR_CID",
  nftId: [
    "<YOUR_FIRST_NFT_ID", "<YOUR_SECOND_NFT_ID", 
  ]
}
*********************************************************/

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

/*********************************************************
 * Version 2: Unlockables that can be stored in a Supabase
 * database, to be edited with a GUI instead of the config
 *********************************************************/
const unlockablesV2: UnlockableV2[] = [
  // {
  //   id: "ee3fd6ff-4718-4949-b621-f35ccad89ee4",
  //   owner: "0x1337CC354AeAf15B0E98A609cd348DF171174e14",
  //   metadata: {
  //     name: "Token Gating with NFTs: Unlocking New Ways to Bring Value",
  //     description:
  //       "This exclusive article contains a primer on what Token Gating is, and provides four actionable prompts on how to implement it to bring value to members of your community.",
  //     lastUpdated: "2023-03-13 16:05:23.481327",
  //   },
  //   content: {
  //     type: "IPFS",
  //     url: "bafybeiehgpaip4f7jafzf7imgannx3nnv3ubaiwp6ph56mlyzijpqxi45m",
  //   },
  //   unlockCriteria: {
  //     unlockAmount: 1,
  //     nftId: [
  //       "0x3d483f631a391a3706446613929d253cfddcb47900a07593c5004c5e3827d9ee",
  //     ],
  //   },
  // },
  {
    id: "c9e21ebf-59cc-42dd-9dc4-fd427be153b9",
    owner: "0x1337CC354AeAf15B0E98A609cd348DF171174e14",
    metadata: {
      lastUpdated: "2023-03-13 16:05:23.481327",
    },
    content: {
      type: "IPFS",
      url: "bafybeihx5eacyxeydcpvudwxa242rnjhn67femy46gzas5d2djb24ti5mi",
    },
    unlockCriteria: {
      unlockAmount: 1,
      nftId: [
        "0x8aa9d39f44b4b8488d0bbf04ea12bec99ddbe676a1b9a38d853701327437e78c",
      ],
    },
  },
  // {
  //   id: "3eade688-8839-4fd7-b97a-f7c5f5bfc6ad",
  //   owner: "0x1337CC354AeAf15B0E98A609cd348DF171174e14",
  //   metadata: {
  //     name: "Flappy Bird: Origins",
  //     description:
  //       "An incredibly exclusive web game built in Godot 3, optimized for browsers. Dodge the obstacles, and fly for your life...",
  //     lastUpdated: "2023-03-13 16:05:23.481327",
  //   },
  //   content: {
  //     type: "IPFS",
  //     url: "bafybeihhx5v3saq3b7n55ub5q3atuw2udbqc5ictkv2ih7vd3hxptu22nu",
  //   },
  //   unlockCriteria: {
  //     unlockAmount: 2,
  //     nftId: [
  //       "0x8aa9d39f44b4b8488d0bbf04ea12bec99ddbe676a1b9a38d853701327437e78c",
  //       "0x3d483f631a391a3706446613929d253cfddcb47900a07593c5004c5e3827d9ee",
  //     ],
  //   },
  // },
];

export { unlockables, unlockablesV2 };
