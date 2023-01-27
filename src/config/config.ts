export interface ICombination {
  nftId: string[];
  title: string;
  ipfsUrl: string;
}

const PINATA_GATEWAY_URL = "j.mypinata.cloud";

// Set up combinations of NFTs (NFT IDs) that unlock content uploaded on IPFS
const combinations: ICombination[] = [
  {
    nftId: [
      "0x3d483f631a391a3706446613929d253cfddcb47900a07593c5004c5e3827d9ee",
    ], // GM #1
    title: "Vitalik.eth's private keys",
    ipfsUrl: "bafkreieyqtgjnsgprd3a4yifqub7t7mwkqrdxxa2beviwhjndqjmbhnouy", // Doge image
  },
  {
    nftId: [
      "0x8aa9d39f44b4b8488d0bbf04ea12bec99ddbe676a1b9a38d853701327437e78c",
    ], // GM #2
    title: "Elon Musk's Twitter plans",
    ipfsUrl: "bafybeibteqtxuqdzvvkpvm5ig4hmz7hgptvs63baxrksylsom6a4ple3ee", // Coffee image
  },
  {
    nftId: [
      "0x8aa9d39f44b4b8488d0bbf04ea12bec99ddbe676a1b9a38d853701327437e78c",
      "0x3d483f631a391a3706446613929d253cfddcb47900a07593c5004c5e3827d9ee",
    ], // GM #1 & GM #2
    title: "Lorem ipsum dolor sit amet",
    ipfsUrl: "bafkreicojr4yi3jeuzrjsy7xs7noc7xakd7xwh3gbaxv5gidbme3pcxiby", // Chairman image
  },
];

export { combinations, PINATA_GATEWAY_URL };
