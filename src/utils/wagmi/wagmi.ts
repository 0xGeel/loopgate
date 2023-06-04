import { publicProvider } from "wagmi/providers/public";
import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { configureChains, createConfig, mainnet } from "wagmi";

const { chains, publicClient } = configureChains([mainnet], [publicProvider()]);

const Config = createConfig({
  connectors: [
    new InjectedConnector({ chains }),
    new WalletConnectConnector({
      chains,
      options: {
        projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID,
        showQrModal: false,
      },
    }),
  ],
  publicClient,
});

export default Config;
