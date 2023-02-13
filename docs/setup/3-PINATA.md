---
description: >-
  TL;DR: In this section, you'll learn how to upload submarined files to Piñata,
  and how to add them to your config.
---

# 3. Uploading files to Piñata

1. Go to [https://app.pinata.cloud/pinmanager](https://app.pinata.cloud/pinmanager).
2. Click on 'Upload' and select the **file** or **folder** you'd like to submarine.
3. Click the checkbox: **'Submarine Your File'**.

![Be sure to check 'Submarine your file'. If you don't do this, anyone with the link can access the file.](../../public/images/docs/pinata-submarine.png)

4. Copy the `CID`. It should start with `baf...`.
5. Open the `config/config.ts` file and paste your CID into one of the `unlockable` items.
6. Look up any of the NFTs you have minted on Loopring L2, and copy its `NFT ID`. Paste it into the `nftId: [""]` array.

![An example of the config file. You should customise this with your own CIDs (Pinata) and NFT IDs (Loopring).](../../public/images/docs/config-example.png)

![Not sure what your NFT IDs are? It might be helpful to use https://lexplorer.io to look up your NFTs and their NFT IDs!](../../public/images/docs/lexplorer-nft-id.png)
