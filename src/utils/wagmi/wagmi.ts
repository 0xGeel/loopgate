import { configureChains, createConfig, mainnet } from "wagmi";

import { InjectedConnector } from "wagmi/connectors/injected";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { publicProvider } from "wagmi/providers/public";

const { chains, publicClient } = configureChains([mainnet], [publicProvider()]);

export const Config = createConfig({
  connectors: [
    new InjectedConnector({
      chains,
      options: {
        name: "Browser Wallet",
        shimDisconnect: true,
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        projectId: process.env.NEXT_PUBLIC_WALLECTONNECT_ID,
        showQrModal: false,
      },
    }),
    new MetaMaskConnector({
      chains,
    }),
  ],
  publicClient,
});
