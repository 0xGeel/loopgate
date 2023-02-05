// import { configureSIWE } from "connectkit-next-siwe";
import { configureSIWE } from "./siweDebug";

// https://github.com/family/connectkit/blob/main/packages/connectkit-next-siwe/src/configureSIWE.tsx

export const siwe = configureSIWE({
  apiRoutePrefix: "/api/siwe",
  session: {
    cookieName: "LG_SIWE",
    password: `${process.env.SESSION_SECRET}`,
  },
});
