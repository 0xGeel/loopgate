import { configureSIWE } from "./configureSIWE";
// import { configureSIWE } from "connectkit-next-siwe";

// Replaced with an edited version on 06-02-2023 to circumvent a 'connectkit-next-siwe' WalletConnect through a Smart Wallet issue (Loopring Wallet).
// 1. connectkit-next-siwe is using a deprecated library function (while not providing the logs to end-users 😭)
// 2. connectkit-next-siwe is not supplying an ETH JSON RPC provider to the `siweMessage.verify()` call. We do now.

export const siwe = configureSIWE({
  apiRoutePrefix: "/api/siwe",
  session: {
    cookieName: "LG_SIWE",
    password: process.env.SESSION_SECRET || "Undefined Session Secret",
  },
});
