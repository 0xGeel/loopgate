import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { WagmiConfig } from "wagmi";
import { ConnectKitProvider } from "connectkit";

import "../styles/globals.css";
import NextHeadBase from "../components/SEO/NextHeadBase";
import { inter, unbounded } from "../components/Fonts/Fonts";
import { Toaster } from "react-hot-toast";
import { connectKitOverrides, toasterOptions } from "../styles/styles";
import { SiweClient } from "../utils/siwe";
import Config from "../utils/wagmi/wagmi";

const App = ({ Component, pageProps }: AppProps) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <WagmiConfig config={Config}>
      <SiweClient.Provider>
        <ConnectKitProvider
          theme="auto"
          mode="light"
          customTheme={connectKitOverrides}
          options={{
            hideNoWalletCTA: true,
            hideQuestionMarkCTA: true,
            walletConnectCTA: "link",
            walletConnectName: "WalletConnect",
          }}
        >
          <main className={`${inter.variable} ${unbounded.variable} font-sans`}>
            <NextHeadBase />
            {mounted && <Component {...pageProps} />}
            <Toaster toastOptions={toasterOptions} />
          </main>
        </ConnectKitProvider>
      </SiweClient.Provider>
    </WagmiConfig>
  );
};

export default App;
