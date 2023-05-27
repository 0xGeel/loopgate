import "../styles/globals.css";

import { TooltipProvider } from "@radix-ui/react-tooltip";
import { ConnectKitProvider } from "connectkit";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { WagmiConfig } from "wagmi";

import { inter, unbounded } from "../components/Fonts";
import NextHeadBase from "../components/SEO/NextHeadBase";
import { siwe } from "../middleware/siwe";
import { WagmiClient } from "../services/wagmi";
import { overrides } from "../styles/ConnectKit/overrides";

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
          <TooltipProvider delayDuration={0}>
            <main
              className={`${inter.variable} ${unbounded.variable} font-sans`}
            >
              <NextHeadBase />
              {mounted && <Component {...pageProps} />}
              <Toaster
                toastOptions={{
                  style: {
                    backgroundColor: "rgba(17,24,44,.8)",
                    backdropFilter: "blur(2px)",
                    color: "#FFFFFF",
                    fontSize: "14px",
                    border: "1px solid rgba(255,255,255,.2)",
                    maxWidth: "420px",
                    lineHeight: 1.5,
                  },
                }}
              />
            </main>
          </TooltipProvider>
        </ConnectKitProvider>
      </siwe.Provider>
    </WagmiConfig>
  );
};

export default App;
