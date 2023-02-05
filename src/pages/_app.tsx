import "../styles/globals.css";
import type { AppProps } from "next/app";
import NextHead from "next/head";
import { useEffect, useState } from "react";

import { WagmiConfig } from "wagmi";
import { WagmiClient } from "../utils/wagmi";
import { ConnectKitProvider } from "connectkit";
import { overrides } from "../styles/ConnectKit/overrides";
import { siwe } from "../siwe";

function App({ Component, pageProps }: AppProps) {
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
          <NextHead>
            <title>LoopGate V0.1.0</title>
          </NextHead>

          {mounted && <Component {...pageProps} />}
        </ConnectKitProvider>
      </siwe.Provider>
    </WagmiConfig>
  );
}

export default App;

// const disclaimerOptions = {
//   disclaimer: (
//     <>
//       By connecting your wallet you agree to the{" "}
//       <a target="_blank" rel="noopener noreferrer" href="#!">
//         Terms of Service
//       </a>{" "}
//       and{" "}
//       <a target="_blank" rel="noopener noreferrer" href="#!">
//         Privacy Policy
//       </a>
//       .
//     </>
//   ),
// };
