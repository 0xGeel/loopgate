// import { configureServerSideSIWE } from "connectkit-next-siwe";
import { configureServerSideSIWE } from "./configure";

export const SiweServer = configureServerSideSIWE({
  session: {
    cookieName: "LG_SIWE",
    password: `${process.env.SESSION_SECRET}`,
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
  },
});
