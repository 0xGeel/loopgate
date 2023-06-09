import { DefaultToastOptions } from "react-hot-toast";

const white = {
  s10: "rgba(255,255,255,0.10)",
  s20: "rgba(255,255,255,0.20)",
  s100: "rgba(255,255,255,1.00)",
};

export const connectKitOverrides = {
  "--ck-connectbutton-color": white.s100,
  "--ck-connectbutton-hover-color": white.s100,
  "--ck-connectbutton-active-color": white.s100,
  "--ck-connectbutton-background": white.s10,
  "--ck-connectbutton-hover-background": white.s20,
  "--ck-connectbutton-active-background": white.s10,
};

export const toasterOptions: DefaultToastOptions = {
  style: {
    backgroundColor: "rgba(17,24,44,.8)",
    backdropFilter: "blur(2px)",
    color: white.s100,
    fontSize: "14px",
    border: `1px solid ${white.s20}`,
    maxWidth: "420px",
    width: "100%",
    lineHeight: 1.5,
  },
};
