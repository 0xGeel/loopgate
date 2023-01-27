import "../styles/globals.css";
import type { AppProps } from "next/app";
import NextHead from "next/head";
import * as React from "react";

import { WagmiConfig } from "wagmi";
import { WagmiClient } from "../utils/wagmi";
import { ConnectKitProvider } from "connectkit";
import { overrides } from "../styles/ConnectKit/overrides";

function App({ Component, pageProps }: AppProps) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  return (
    <WagmiConfig client={WagmiClient}>
      <ConnectKitProvider theme="midnight" customTheme={overrides}>
        <NextHead>
          <title>Loopring x Piñata </title>
        </NextHead>

        {mounted && <Component {...pageProps} />}
      </ConnectKitProvider>
    </WagmiConfig>
  );
}

export default App;
