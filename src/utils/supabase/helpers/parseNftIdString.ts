/**
 * Parses NFT IDs text array from SQL DB
 * Input: "0x00...00, 1x11...11"
 * Output: ["0x00...00", 1x11.11]
 */

const parseNftIdString = (nftIdString: string): string[] => {
  const spacesRemoved = nftIdString.replaceAll(" ", "");
  return spacesRemoved.split(",");
};

export default parseNftIdString;
