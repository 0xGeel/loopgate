import { useAccount } from "wagmi";
import { useEffect } from "react";
import Router from "next/router";
import ConnectedPage from "@/src/components/ConnectedPage";
import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";
import { GetServerSideProps } from "next";
import { siwe } from "@/src/siwe";
// import useSiweStatus from "@/src/hooks/useSiweStatus";
import { useSIWE } from "connectkit";

const UnlocksPage = () => {
  const { isConnected } = useAccount();
  const { signedIn, address } = useSIWE();
  // const { isVerified } = useSiweStatus();

  useEffect(() => {
    if (!isConnected) {
      Router.push("/");
    }
  }, [isConnected]);

  console.log(signedIn, address);

  return (
    <div
      className="min-h-screen h-full flex flex-col bg-cover bg-center"
      style={{
        backgroundImage: "url('hero-blur.jpg')",
      }}
    >
      <Header />

      <ConnectedPage />

      <Footer />
    </div>
  );
};

export default UnlocksPage;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const { address } = await siwe.getSession(req, res);

  if (!address) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }

  return {
    props: {},
  };
};
