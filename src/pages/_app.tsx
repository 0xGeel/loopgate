import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { WagmiConfig } from "wagmi";
import { ConnectKitProvider } from "connectkit";

import "../styles/globals.css";
import { WagmiClient } from "../utils/wagmi";
import { siwe } from "../siwe";
import { overrides } from "../styles/ConnectKit/overrides";
import NextHeadBase from "../components/SEO/NextHeadBase";

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
          <NextHeadBase />

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
