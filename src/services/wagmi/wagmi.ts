import { createClient, configureChains, mainnet, goerli } from "wagmi";

import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { publicProvider } from "wagmi/providers/public";

const { provider, chains } = configureChains(
  [mainnet, goerli],
  [publicProvider()]
);

export const WagmiClient = createClient({
  autoConnect: true,
  connectors: [
    new InjectedConnector({
      chains,
      options: {
        name: "Injected",
        shimDisconnect: true,
      },
    }),
    new WalletConnectConnector({
      chains: chains,
      options: {
        qrcode: true,
      },
    }),
    new MetaMaskConnector({
      chains: chains,
    }),
  ],
  provider,
});
