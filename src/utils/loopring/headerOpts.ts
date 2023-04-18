// Fetch options used whenever the Loopring API Key is required
const headerOpts = {
  headers: {
    "X-API-KEY": process.env.LOOPRING_API_KEY || "Undefined Loopring API Key",
  },
};

export default headerOpts;
