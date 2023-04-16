import { v4 as uuidv4 } from "uuid";
import type { NextApiRequest, NextApiResponse } from "next";
import { UnlockableV2 } from "@/src/config/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // This API Endpoint generates a sample UnlockableV2 object you can use for your `config.ts` file.

  const now = new Date();
  const dateObj = now.toISOString().replace("T", " ").split("Z")[0];

  const sampleUnlockable: UnlockableV2 = {
    id: uuidv4(),
    owner: "0x000000000000000000000000000000000000dEaD",
    metadata: {
      name: "The title of your Unlockable",
      description:
        "Write a short but intriguing description about your Unlockable. Ideally under 120 characters. Less is more.",
      lastUpdated: dateObj, // Format: "2023-03-13 16:05:23.481327"
    },
    content: {
      type: "IPFS",
      url: "YOUR_CID_HERE",
    },
    unlockCriteria: {
      unlockAmount: 2,
      nftId: [
        "0x8aa9d39f44b4b8488d0bbf04ea12bec99ddbe676a1b9a38d853701327437e78c",
        "0x3d483f631a391a3706446613929d253cfddcb47900a07593c5004c5e3827d9ee",
      ],
    },
  };

  res.status(200).json(sampleUnlockable);
}
