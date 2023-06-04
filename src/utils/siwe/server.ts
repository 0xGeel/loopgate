import { configureServerSideSIWE } from "connectkit-next-siwe";

export const SiweServer = configureServerSideSIWE({
  session: {
    cookieName: "LG_SIWE",
    password: `${process.env.SESSION_SECRET}`,
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
  },
});
