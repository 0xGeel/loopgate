import ConnectPrompt from "../components/ConnectPrompt";
import ConnectedPage from "../components/ConnectedPage";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useSIWE } from "connectkit";

const Page = () => {
  const { signedIn } = useSIWE();

  return (
    <div
      className="min-h-screen h-full flex flex-col bg-cover bg-center"
      style={{
        backgroundImage: "url('images/hero-blur.jpg')",
      }}
    >
      <Header />

      {!signedIn ? <ConnectPrompt /> : <ConnectedPage />}

      <Footer />
    </div>
  );
};

export default Page;
