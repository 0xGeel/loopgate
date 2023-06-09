// import { configureClientSIWE } from "connectkit-next-siwe";
import { configureClientSIWE } from "./configure";

export const SiweClient = configureClientSIWE({
  apiRoutePrefix: "/api/siwe",
  statement: "Sign In With Ethereum to prove you control this wallet.", // Optional
});
