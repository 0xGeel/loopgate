import { useAccount } from "wagmi";

import ConnectPrompt from "../components/ConnectPrompt";
import ConnectedPage from "../components/ConnectedPage";
import Header from "../components/Header";
import Footer from "../components/Footer";
import useActiveSession from "../hooks/useActiveSession";

const Page = () => {
  const { address, isConnected } = useAccount();
  const { isStateActive } = useActiveSession();

  return (
    <div
      className="min-h-screen h-full flex flex-col bg-cover bg-center"
      style={{
        backgroundImage: "url('hero-blur.jpg')",
      }}
    >
      <Header />

      {!isConnected ? <ConnectPrompt /> : <ConnectedPage />}

      <Footer />
    </div>
  );
};

export default Page;
