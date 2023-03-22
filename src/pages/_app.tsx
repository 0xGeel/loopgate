import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { WagmiConfig } from "wagmi";
import { ConnectKitProvider } from "connectkit";

import "../styles/globals.css";
import { WagmiClient } from "../utils/wagmi";
import { siwe } from "../utils/siwe";
import { overrides } from "../styles/ConnectKit/overrides";
import NextHeadBase from "../components/SEO/NextHeadBase";
import { inter, unbounded } from "../components/Fonts";

const App = ({ Component, pageProps }: AppProps) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <WagmiConfig client={WagmiClient}>
      <siwe.Provider>
        <ConnectKitProvider
          theme="midnight"
          customTheme={overrides}
          options={{
            walletConnectName: "WalletConnect",
          }}
        >
          <main className={`${inter.variable} ${unbounded.variable} font-sans`}>
            <NextHeadBase />
            {mounted && <Component {...pageProps} />}
          </main>
        </ConnectKitProvider>
      </siwe.Provider>
    </WagmiConfig>
  );
};

export default App;
