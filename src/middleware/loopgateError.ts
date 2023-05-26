export type Error = [code: HttpErrorCode, message: string];

type HttpErrorCode = 400 | 401 | 403 | 404 | 405 | 500;

export const LoopgateError: { [key: string]: Error } = {
  noPostRequest: [405, "Method not allowed, please use a POST request."],
  unauthorized: [
    401,
    "You are not authorized to access this resource. Sign In With Ethereum, and try again.",
  ],
  unableToUpload: [500, "Unable to upload the file(s)."],
  badRequest: [
    400,
    "Bad request. Check the parameters or body before trying again.",
  ],
  server: [500, "Internal server error"],
  noAddressProvided: [
    400,
    "Invalid Request: 0x address not provided. Please provide a valid 0x address and try again.",
  ],
  noLoopringAccount: [
    400,
    "No Loopring Account could be found for the connected 0x address. Is your L2 account activated?",
  ],
  noUnlockableFound: [
    404,
    "Unable to find the Unlockable for the specified UUID.",
  ],
  noNftsFound: [404, "Unable to find any NFTs in your wallet."],
  noPinataContentFound: [
    404,
    "Unable to find the submarined content on Pinata. It may be deleted.",
  ],
  unlockReqNotMet: [
    405,
    "Your connected wallet does not meet the unlock requirements.",
  ],
  noTheGraphData: [
    404,
    "Unable to retrieve data from TheGraph with this NFT ID. Please provide a valid Loopring NFT ID, and try again.",
  ],
  noLoopringDataFound: [
    400,
    "Unable to retrieve data from the Loopring API with this NFT ID. Please provide a valid Loopring NFT ID, and try again.",
  ],
  noHoldersFound: [404, "Unable to find holders for this NFT ID."],
};
