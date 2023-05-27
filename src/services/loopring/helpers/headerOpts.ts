// Fetch options used whenever the Loopring API Key is required
export const headerOpts = {
  headers: {
    "X-API-KEY": process.env.LOOPRING_API_KEY || "Undefined Loopring API Key",
  },
};
