/**
 * Parses NFT IDs text array from SQL DB
 * Input: "0x00...00, 1x11...11"
 * Output: ["0x00...00", 1x11.11]
 */

export const parseNftIdString = (nftIdString: string | null): string[] => {
  if (!nftIdString) {
    return [""];
  }

  return nftIdString.replaceAll(" ", "").split(",");
};
