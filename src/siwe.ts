import { configureSIWE } from "connectkit-next-siwe";

export const siwe = configureSIWE({
  apiRoutePrefix: "/api/siwe",
  session: {
    cookieName: "LG_SIWE",
    password: `${process.env.SESSION_SECRET}`,
  },
});
